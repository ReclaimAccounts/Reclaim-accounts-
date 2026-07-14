import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Layout } from "@/components/layout";
import { BonusBanner, ClaimIcon } from "@/components/bonus-banner";

import Home from "@/pages/home";
import Download from "@/pages/download";
import Features from "@/pages/features";
import News from "@/pages/news";
import NewsItem from "@/pages/news-item";
import Faq from "@/pages/faq";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import NotFound from "@/pages/not-found";
import Beta from "@/pages/beta";
import PreRegister from "@/pages/preregister";
import Support from "@/pages/support";
import Videos from "@/pages/videos";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/download" component={Download} />
      <Route path="/features" component={Features} />
      <Route path="/news" component={News} />
      <Route path="/news/:id" component={NewsItem} />
      <Route path="/beta" component={Beta} />
      <Route path="/preregister" component={PreRegister} />
      <Route path="/faq" component={Faq} />
      <Route path="/contact" component={Contact} />
      <Route path="/support" component={Support} />
      <Route path="/videos" component={Videos} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <BonusBanner />
            <Layout>
              <Router />
            </Layout>
            <ClaimIcon />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
