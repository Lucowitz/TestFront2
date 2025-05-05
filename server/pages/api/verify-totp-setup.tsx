import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import QRCode from 'react-qr-code';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'; // Corrected import


const AuthPage = () => {
    const [isBusiness, setIsBusiness] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [registrationDetails, setRegistrationDetails] = useState({  // Corrected Syntax
        username: '',
        nome: '',
        cognome: '',
        indirizzo: '',
        codiceFiscale: '',
        telefono: '',
        password: '',
        email: '',
    });
    const [loginCredentials, setLoginCredentials] = useState({ // Corrected Syntax
        loginUsername: '',
        loginPassword: '',
        totpCode: '',
    });
    const [showTotpSetup, setShowTotpSetup] = useState(false);
    const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
    const [totpSecret, setTotpSecret] = useState<string | null>(null);
    const [temporaryId, setTemporaryId] = useState<string | null>(null);
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Added router


    // Clear verification message after 5 seconds
    useEffect(() => {
        if (verificationMessage) {
            const timer = setTimeout(() => setVerificationMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [verificationMessage]);


    const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegistrationDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: registrationDetails.username,
                    nome: registrationDetails.nome,
                    cognome: registrationDetails.cognome,
                    indirizzo: registrationDetails.indirizzo,
                    codiceFiscale: registrationDetails.codiceFiscale,
                    telefono: registrationDetails.telefono,
                    email: registrationDetails.email,
                    password: registrationDetails.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setTemporaryId(data.temporaryId);
                setTotpSecret(data.secret);
                setQrCodeValue(data.qrCode);
                setShowTotpSetup(true);
                setVerificationMessage(data.message);
                console.log('Registration successful, TOTP setup initiated.');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message || 'Something went wrong');
                setVerificationMessage("Registration Failed: " + (errorData.message || "Unknown error")); // Provide more specific error
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setVerificationMessage("Network Error during registration");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyTotpSetup = async () => {
        setLoading(true);
        if (!temporaryId || !verificationCode) {
            setVerificationMessage("Please enter the verification code.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('/api/verify-totp-setup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ temporaryId, totpCode: verificationCode }),
            });

            if (response.ok) {
                const data = await response.json();
                setVerificationMessage(data.message);
                setShowTotpSetup(false);
                setIsLogin(true);
                console.log('TOTP setup verified.');
            } else {
                const errorData = await response.json();
                setVerificationMessage(errorData.message || 'Verification failed');
                console.error('TOTP verification failed:', errorData.message);
            }
        } catch (error) {
            console.error('Error during TOTP verification:', error);
            setVerificationMessage("Network error during verification");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginCredentials),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful.');
                router.push(data.redirectUrl); // Use router.push
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.message || 'Invalid credentials');
                setVerificationMessage("Login Failed: " + errorData.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setVerificationMessage("Network error during Login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white px-4">
            <Card className="w-full max-w-md p-6 space-y-4">
                <div className="flex justify-between border-b pb-2">
                    <button
                        className={cn(
                            "text-lg font-semibold",
                            !isLogin ? "text-gray-400" : "text-white"
                        )}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={cn(
                            "text-lg font-semibold",
                            isLogin ? "text-gray-400" : "text-white"
                        )}
                        onClick={() => setIsLogin(false)}
                    >
                        Registrati
                    </button>
                </div>
                <div className="flex justify-center gap-4">
                    <Button
                        variant={isBusiness ? "outline" : "default"}
                        onClick={() => setIsBusiness(false)}
                    >
                        Utente
                    </Button>
                    <Button
                        variant={isBusiness ? "default" : "outline"}
                        onClick={() => setIsBusiness(true)}
                    >
                        Business
                    </Button>
                </div>
                {isLogin ? (
                    <LoginForm
                        isBusiness={isBusiness}
                        loginCredentials={loginCredentials}
                        handleLoginChange={handleLoginChange}
                        handleLogin={handleLogin}
                        loading={loading}
                    />
                ) : (
                    <RegisterForm
                        isBusiness={isBusiness}
                        registrationDetails={registrationDetails}
                        handleRegistrationChange={handleRegistrationChange}
                        handleRegister={handleRegister}
                        loading={loading}
                    />
                )}
                {verificationMessage && <p className="text-center text-red-500">{verificationMessage}</p>}

                {showTotpSetup && (
                    <div className="mt-4">
                        <h2>Setup Two-Factor Authentication</h2>
                        <p>
                            A TOTP key has been generated for your account.
                            For security reasons, this key is NOT stored by us.
                            You MUST save it in your authenticator app (e.g., Google Authenticator, Authy) to log in.
                            This step
                            is required and cannot be skipped.
                        </p>
                        {qrCodeValue && <div className="flex justify-center mb-4"><QRCode value={qrCodeValue} size={256} level="H" /></div>}
                        {totpSecret && <p className="text-center">Alternatively, enter this secret key manually: <span className="font-mono">{totpSecret}</span></p>}

                        <Input
                            type="text"
                            placeholder="Enter verification code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                        <Button className="w-full" onClick={handleVerifyTotpSetup} disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify TOTP Setup'}
                        </Button>
                    </div>
                )}

            </Card>
        </div>
    );
};

const LoginForm = ({ isBusiness, loginCredentials, handleLoginChange, handleLogin, loading }) => (
    <form className="space-y-4">
        {isBusiness ? (
            <>
                <Input
                    label="P.IVA"
                    type="text"
                    placeholder="P.IVA"
                    name="loginUsername"
                    value={loginCredentials.loginUsername}
                    onChange={handleLoginChange}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="loginPassword"
                    value={loginCredentials.loginPassword}
                    onChange={handleLoginChange}
                    required
                />
                <Input
                    label="Codice TOTP"
                    type="text"
                    placeholder="Inserisci codice a 6 cifre"
                    name="totpCode"
                    value={loginCredentials.totpCode}
                    onChange={handleLoginChange}
                    required
                />
            </>
        ) : (
            <>
                <Input
                    label="Codice fiscale"
                    type="text"
                    placeholder="Codice fiscale"
                    name="loginUsername"
                    value={loginCredentials.loginUsername}
                    onChange={handleLoginChange}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="loginPassword"
                    value={loginCredentials.loginPassword}
                    onChange={handleLoginChange}
                    required
                />
                <Input
                    label="Codice TOTP"
                    type="text"
                    placeholder="Inserisci codice a 6 cifre"
                    name="totpCode"
                    value={loginCredentials.totpCode}
                    onChange={handleLoginChange}
                    required
                />
            </>
        )}
        <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? 'Accessing...' : 'Accedi'}
        </Button>
    </form>
);

const RegisterForm = ({ isBusiness, registrationDetails, handleRegistrationChange, handleRegister, loading }) => (
    <form className="space-y-4">
        {isBusiness ? (
            <>
                <Input
                    label="Nome Azienda"
                    type="text"
                    placeholder="Nome Azienda"
                    name="username"
                    value={registrationDetails.username}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="P.IVA"
                    type="text"
                    placeholder="Partita Iva"
                    name="email"  // Changed from email to partitaIVA
                    value={registrationDetails.email}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="Email Commerciale"
                    type="email"
                    placeholder="Email Commerciale"
                    name="email"
                    value={registrationDetails.email}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={registrationDetails.password}
                    onChange={handleRegistrationChange}
                    required
                />
            </>
        ) : (
            <>
                <Input
                    label="Nome"
                    type="text"
                    placeholder="Nome"
                    name="nome"
                    value={registrationDetails.nome}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="Cognome"
                    type="text"
                    placeholder="Cognome"
                    name="cognome"
                    value={registrationDetails.cognome}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="Indirizzo"
                    type="text"
                    placeholder="Indirizzo"
                    name="indirizzo"
                    value={registrationDetails.indirizzo}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="Codice Fiscale"
                    type="text"
                    placeholder="Codice Fiscale"
                    name="codiceFiscale"
                    value={registrationDetails.codiceFiscale}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="Numero di Telefono"
                    type="text"
                    placeholder="Numero di Telefono"
                    name="telefono"
                    value={registrationDetails.telefono}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={registrationDetails.password}
                    onChange={handleRegistrationChange}
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={registrationDetails.email}
                    onChange={handleRegistrationChange}
                    required
                />
            </>
        )}
        <Button className="w-full" onClick={handleRegister} disabled={loading}>
            {loading ? 'Registering...' : 'Registrati'}
        </Button>
    </form>
);

export default AuthPage;