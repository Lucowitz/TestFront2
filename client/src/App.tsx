
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import Demo from "@/pages/Demo";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TokenExplorer from "@/pages/TokenExplorer";
import Wallet from "@/pages/Wallet";
import Compliance from "@/pages/Compliance";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeWrapper } from "@/components/ui/theme-wrapper";
import { LanguageProvider } from "./context/LanguageContext";
import { DemoProvider, useDemo } from "./context/DemoContext";
import AuthPage from "./pages/AuthPage";

// This component will handle scrolling to top on navigation
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function AppRoutes() {
  const { isDemoMode, demoUserType } = useDemo();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/token-explorer" component={TokenExplorer} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/compliance" component={Compliance} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/demo" component={Demo} />
      <Route path="/auth-page" component={AuthPage} />
      {isDemoMode ? (
        demoUserType === 'company' ? (
          <Route component={Wallet} />
        ) : (
          <Route component={TokenExplorer} />
        )
      ) : (
        <Route component={NotFound} />
      )}
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <DemoProvider>
          <ThemeWrapper>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow pt-16 md:pt-20">
                <ScrollToTop />
                <AppRoutes />
              </main>
              <Footer />
            </div>
            <Toaster />
          </ThemeWrapper>
        </DemoProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
