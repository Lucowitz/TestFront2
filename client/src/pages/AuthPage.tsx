import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const AuthPage = () => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white px-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
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
          <LoginForm isBusiness={isBusiness} />
        ) : (
          <RegisterForm isBusiness={isBusiness} />
        )}
      </Card>
    </div>
  );
};

const LoginForm = ({ isBusiness }) => (
  <form className="space-y-4">
    {isBusiness ? (
      <>  
      <Input label="P.IVA"  type="text" placeholder= "P.IVA" required />
      <Input label="Password" type="password" placeholder= "Password" required />
      <Input label="Codice TOTP" type="text" placeholder="Inserisci codice a 6 cifre" required />
      </>
    ) : (
      <>  
      <Input label="Codice fiscale"  type="text" placeholder= "Codice fiscale" required />
      <Input label="Password" type="password" placeholder= "Password" required />
      <Input label="Codice TOTP" type="text" placeholder="Inserisci codice a 6 cifre" required />
      </>
    )}
    <Button className="w-full">Accedi</Button>
  </form>
);

const RegisterForm = ({ isBusiness }) => (
  <form className="space-y-4">
    {isBusiness ? (
      <>
        <Input label="Nome Azienda" type="text" placeholder="Nome Azienda" required />
        <Input label="P.IVA" type="text" placeholder="Partita Iva" required />
        <Input label="Email Commerciale" type="email" placeholder="Email Commerciale" required />
      </>
    ) : (
      <>
        <Input label="Nome" type="text" placeholder="Nome" required />
        <Input label="Cognome" type="text" placeholder="Cognome" required />
        <Input label="Indirizzo" type="text" placeholder="Indirizzo" required />
        <Input label="Codice Fiscale" type="text" placeholder="Codice Fiscale" required />
        <Input label="Numero di Telefono" type="text" placeholder="Nome di Telefono" required />
      </>
    )}
    <Input label="Password" type="password" placeholder="Password" required />
    <Button className="w-full">Registrati</Button>
  </form>
);

export default AuthPage;
