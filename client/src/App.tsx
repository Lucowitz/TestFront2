import { Route, Switch } from "wouter"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Services from "@/pages/Services"
import TokenExplorer from "@/pages/TokenExplorer"
import Wallet from "@/pages/Wallet"
import Compliance from "@/pages/Compliance"
import Demo from "@/pages/Demo"
import AuthPage from "@/pages/AuthPage"
import TOTPSetup from "@/pages/TOTPSetup"
import NotFound from "@/pages/not-found"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { DemoProvider } from "@/context/DemoContext"
import { LanguageProvider } from "@/context/LanguageContext"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="prime-genesis-theme">
      <LanguageProvider>
        <DemoProvider>
          <div className="flex flex-col min-h-screen bg-[#121212] text-white">
            <Header />
            <main className="flex-1">
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/services" component={Services} />
                <Route path="/token-explorer" component={TokenExplorer} />
                <Route path="/wallet" component={Wallet} />
                <Route path="/compliance" component={Compliance} />
                <Route path="/demo" component={Demo} />
                <Route path="/auth" component={AuthPage} />
                {/* Also add the auth-page route as an alias */}
                <Route path="/auth-page" component={AuthPage} />
                <Route path="/totp-setup" component={TOTPSetup} />
                {/* Add any other potential route aliases */}
                <Route path="/login" component={AuthPage} />
                <Route path="/register" component={AuthPage} />
                <Route path="/totp" component={TOTPSetup} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
          <Toaster />
        </DemoProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
