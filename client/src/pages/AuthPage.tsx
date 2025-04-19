import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';

const AuthPage = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [, navigate] = useLocation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white px-4">
      <Helmet>
        <title>{isLogin ? "Login" : "Register"} - Prime Genesis</title>
      </Helmet>
      
      <Card className="w-full max-w-md p-6 space-y-4 bg-[#1E1E1E] border border-white border-opacity-5">
        <div className="flex justify-between border-b border-white border-opacity-10 pb-2">
          <button
            className={`text-lg font-semibold ${!isLogin ? "text-gray-400" : "text-white"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`text-lg font-semibold ${isLogin ? "text-gray-400" : "text-white"}`}
            onClick={() => setIsLogin(false)}
          >
            Registrati
          </button>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            variant={isBusiness ? "outline" : "default"}
            onClick={() => setIsBusiness(false)}
            className={!isBusiness ? "bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]" : ""}
          >
            Utente
          </Button>
          <Button
            variant={isBusiness ? "default" : "outline"}
            onClick={() => setIsBusiness(true)}
            className={isBusiness ? "bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]" : ""}
          >
            Business
          </Button>
        </div>
        {isLogin ? (
          <LoginForm isBusiness={isBusiness} />
        ) : (
          <RegisterForm isBusiness={isBusiness} navigate={navigate} />
        )}
      </Card>
    </div>
  );
};

const LoginForm = ({ isBusiness }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [, navigate] = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const formData = new FormData(e.target);
      const identifier = isBusiness ? formData.get("vatNumber") : formData.get("fiscalCode");
      const password = formData.get("password");
      const totpToken = formData.get("totp");
      
      // In a real app, you would make an API call here
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isBusiness,
          identifier,
          password,
          totpToken
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.message);
        return;
      }
      
      // Store user data in localStorage or context
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      // Redirect to wallet page
      navigate('/wallet');
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isBusiness ? (
        <>  
          <div className="space-y-2">
            <label htmlFor="vatNumber" className="text-sm font-medium">P.IVA</label>
            <Input id="vatNumber" name="vatNumber" type="text" placeholder="P.IVA" required />
          </div>
        </>
      ) : (
        <>  
          <div className="space-y-2">
            <label htmlFor="fiscalCode" className="text-sm font-medium">Codice fiscale</label>
            <Input id="fiscalCode" name="fiscalCode" type="text" placeholder="Codice fiscale" required />
          </div>
        </>
      )}
      
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <Input id="password" name="password" type="password" placeholder="Password" required />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="totp" className="text-sm font-medium">Codice TOTP</label>
        <Input id="totp" name="totp" type="text" placeholder="Inserisci codice a 6 cifre" required />
      </div>
      
      <Button className="w-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Accesso in corso...
          </>
        ) : (
          "Accedi"
        )}
      </Button>
    </form>
  );
};

const RegisterForm = ({ isBusiness, navigate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const formData = new FormData(e.target);
      const formDataObj = Object.fromEntries(formData.entries());
      
      // In a real app, you would make an API call here
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formDataObj,
          isBusiness
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        setError(data.message);
        return;
      }
      
      // Store TOTP setup data in localStorage
      localStorage.setItem('totpSetup', JSON.stringify(data.totpSetup));
      
      // Redirect to TOTP setup page
      navigate('/totp-setup');
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {isBusiness ? (
        <>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Nome Azienda</label>
            <Input id="name" name="name" type="text" placeholder="Nome Azienda" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="vatNumber" className="text-sm font-medium">P.IVA</label>
            <Input id="vatNumber" name="vatNumber" type="text" placeholder="Partita Iva" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email Commerciale</label>
            <Input id="email" name="email" type="email" placeholder="Email Commerciale" required />
          </div>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Nome</label>
            <Input id="name" name="name" type="text" placeholder="Nome" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="surname" className="text-sm font-medium">Cognome</label>
            <Input id="surname" name="surname" type="text" placeholder="Cognome" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">Indirizzo</label>
            <Input id="address" name="address" type="text" placeholder="Indirizzo" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="fiscalCode" className="text-sm font-medium">Codice Fiscale</label>
            <Input id="fiscalCode" name="fiscalCode" type="text" placeholder="Codice Fiscale" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">Numero di Telefono</label>
            <Input id="phone" name="phone" type="text" placeholder="Numero di Telefono" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" name="email" type="email" placeholder="Email" required />
          </div>
        </>
      )}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">Password</label>
        <Input id="password" name="password" type="password" placeholder="Password" required />
      </div>
      
      <Button className="w-full bg-gradient-to-r from-[#0047AB] to-[#8A2BE2]" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registrazione in corso...
          </>
        ) : (
          "Registrati"
        )}
      </Button>
    </form>
  );
};

export default AuthPage;
