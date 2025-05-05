// storage.ts (Example - IN-MEMORY - NOT FOR PRODUCTION)

interface User {
    id: string;
    username: string;
    email: string;
    hashedPassword: string;
    totpSecret: string | null;
    totpSetupVerified: boolean;
}

const users: Record<string, User> = {};

export const findUserByUsername = async (username: string): Promise<User | null> => {
    return users[username] || null;
};

export const saveNewUser = async (user: Omit<User, 'id'>): Promise<void> => {
    const id = String(Object.keys(users).length + 1); // Very basic ID generation
    const newUser: User = { id, ...user };
    users[user.username] = newUser;
};

export const updateUserTotpSecret = async (
    username: string,
    totpSecret: string | null,
    totpSetupVerified: boolean
): Promise<void> => {
    const user = users[username];
    if (user) {
        users[username] = { ...user, totpSecret, totpSetupVerified };
    } else {
        throw new Error('User not found'); //  Important:  Handle this in routes.ts
    }
};

//  Example of finding user by totp secret.  Needed for the abandoned verify-totp-setup
export const findUserByTotpSecret = async (totpSecret: string): Promise<User | null> => {
  for (const username in users) {
    if (users[username].totpSecret === totpSecret) {
      return users[username];
    }
  }
  return null;
};
