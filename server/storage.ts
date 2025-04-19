import fs from 'fs';
import path from 'path';
import { nanoid } from 'nanoid';
import { log } from './vite';

// Define data directory
const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths
const USERS_FILE = path.join(DATA_DIR, 'users.csv');
const COMPANIES_FILE = path.join(DATA_DIR, 'companies.csv');
const WALLETS_FILE = path.join(DATA_DIR, 'wallets.csv');
const TRANSACTIONS_FILE = path.join(DATA_DIR, 'transactions.csv');
const TOKENS_FILE = path.join(DATA_DIR, 'tokens.csv');

// Initialize files if they don't exist
const initializeFiles = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, 'id,name,surname,address,fiscalCode,phone,email,password,totpSecret,createdAt\n');
  }
  
  if (!fs.existsSync(COMPANIES_FILE)) {
    fs.writeFileSync(COMPANIES_FILE, 'id,name,vatNumber,email,password,totpSecret,createdAt\n');
  }
  
  if (!fs.existsSync(WALLETS_FILE)) {
    fs.writeFileSync(WALLETS_FILE, 'id,ownerId,ownerType,balance,createdAt\n');
  }
  
  if (!fs.existsSync(TRANSACTIONS_FILE)) {
    fs.writeFileSync(TRANSACTIONS_FILE, 'id,fromWalletId,toWalletId,amount,tokenId,timestamp,status\n');
  }
  
  if (!fs.existsSync(TOKENS_FILE)) {
    fs.writeFileSync(TOKENS_FILE, 'id,name,symbol,totalSupply,creatorId,createdAt\n');
  }
};

// Initialize files on startup
initializeFiles();

// Helper functions to read and write CSV
const readCSV = (filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const entry: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        entry[header] = values[index] || '';
      });
      
      return entry;
    });
  } catch (error) {
    log(`Error reading CSV file: ${error}`, 'storage');
    return [];
  }
};

const writeCSV = (filePath: string, data: Record<string, any>[]) => {
  try {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const headerLine = headers.join(',');
    const dataLines = data.map(entry => 
      headers.map(header => entry[header] || '').join(',')
    );
    
    fs.writeFileSync(filePath, [headerLine, ...dataLines].join('\n'));
  } catch (error) {
    log(`Error writing CSV file: ${error}`, 'storage');
  }
};

// User operations
export const createUser = (userData: {
  name: string;
  surname: string;
  address: string;
  fiscalCode: string;
  phone: string;
  email: string;
  password: string;
  totpSecret: string;
}) => {
  const users = readCSV(USERS_FILE);
  
  // Check if user already exists
  if (users.some(user => user.fiscalCode === userData.fiscalCode || user.email === userData.email)) {
    return { success: false, message: 'User already exists' };
  }
  
  const newUser = {
    id: nanoid(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  writeCSV(USERS_FILE, users);
  
  // Create wallet for the user
  createWallet(newUser.id, 'user');
  
  return { success: true, user: newUser };
};

export const getUserByEmail = (email: string) => {
  const users = readCSV(USERS_FILE);
  return users.find(user => user.email === email);
};

export const getUserByFiscalCode = (fiscalCode: string) => {
  const users = readCSV(USERS_FILE);
  return users.find(user => user.fiscalCode === fiscalCode);
};

export const getUserById = (id: string) => {
  const users = readCSV(USERS_FILE);
  return users.find(user => user.id === id);
};

// Company operations
export const createCompany = (companyData: {
  name: string;
  vatNumber: string;
  email: string;
  password: string;
  totpSecret: string;
}) => {
  const companies = readCSV(COMPANIES_FILE);
  
  // Check if company already exists
  if (companies.some(company => company.vatNumber === companyData.vatNumber || company.email === companyData.email)) {
    return { success: false, message: 'Company already exists' };
  }
  
  const newCompany = {
    id: nanoid(),
    ...companyData,
    createdAt: new Date().toISOString()
  };
  
  companies.push(newCompany);
  writeCSV(COMPANIES_FILE, companies);
  
  // Create wallet for the company
  createWallet(newCompany.id, 'company');
  
  return { success: true, company: newCompany };
};

export const getCompanyByEmail = (email: string) => {
  const companies = readCSV(COMPANIES_FILE);
  return companies.find(company => company.email === email);
};

export const getCompanyByVatNumber = (vatNumber: string) => {
  const companies = readCSV(COMPANIES_FILE);
  return companies.find(company => company.vatNumber === vatNumber);
};

export const getCompanyById = (id: string) => {
  const companies = readCSV(COMPANIES_FILE);
  return companies.find(company => company.id === id);
};

// Wallet operations
export const createWallet = (ownerId: string, ownerType: 'user' | 'company') => {
  const wallets = readCSV(WALLETS_FILE);
  
  const newWallet = {
    id: nanoid(),
    ownerId,
    ownerType,
    balance: '0',
    createdAt: new Date().toISOString()
  };
  
  wallets.push(newWallet);
  writeCSV(WALLETS_FILE, wallets);
  
  return newWallet;
};

export const getWalletByOwnerId = (ownerId: string) => {
  const wallets = readCSV(WALLETS_FILE);
  return wallets.find(wallet => wallet.ownerId === ownerId);
};

export const updateWalletBalance = (walletId: string, newBalance: string) => {
  const wallets = readCSV(WALLETS_FILE);
  const walletIndex = wallets.findIndex(wallet => wallet.id === walletId);
  
  if (walletIndex === -1) return false;
  
  wallets[walletIndex].balance = newBalance;
  writeCSV(WALLETS_FILE, wallets);
  
  return true;
};

// Transaction operations
export const createTransaction = (transactionData: {
  fromWalletId: string;
  toWalletId: string;
  amount: string;
  tokenId?: string;
}) => {
  const transactions = readCSV(TRANSACTIONS_FILE);
  
  const newTransaction = {
    id: nanoid(),
    ...transactionData,
    tokenId: transactionData.tokenId || 'SOL',
    timestamp: new Date().toISOString(),
    status: 'completed'
  };
  
  transactions.push(newTransaction);
  writeCSV(TRANSACTIONS_FILE, transactions);
  
  return newTransaction;
};

export const getTransactionsByWalletId = (walletId: string) => {
  const transactions = readCSV(TRANSACTIONS_FILE);
  return transactions.filter(tx => tx.fromWalletId === walletId || tx.toWalletId === walletId);
};

// Token operations
export const createToken = (tokenData: {
  name: string;
  symbol: string;
  totalSupply: string;
  creatorId: string;
}) => {
  const tokens = readCSV(TOKENS_FILE);
  
  const newToken = {
    id: nanoid(),
    ...tokenData,
    createdAt: new Date().toISOString()
  };
  
  tokens.push(newToken);
  writeCSV(TOKENS_FILE, tokens);
  
  return newToken;
};

export const getTokensByCreatorId = (creatorId: string) => {
  const tokens = readCSV(TOKENS_FILE);
  return tokens.filter(token => token.creatorId === creatorId);
};

export const getAllTokens = () => {
  return readCSV(TOKENS_FILE);
};
