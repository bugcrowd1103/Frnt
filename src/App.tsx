import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MyTrips from "@/pages/MyTrips";
import ItineraryDetails from "@/pages/ItineraryDetails";
import Explore from "@/pages/Explore";
import Hotels from "@/pages/Hotels";
import Events from "@/pages/Events";
import Feed from "@/pages/Feed";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Flights from "@/pages/Flights";
import About from "@/pages/About";
import ARVR from "@/pages/ARVR";
import Pricing from "@/pages/Pricing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveChatbot from "@/components/LiveChatbot";
import ChatBot from "@/components/ChatBot";
import FloatingChatbot from "@/components/FloatingChatbot"; // <-- Add this import
import { Router as WouterRouter } from "wouter"; // ✅ THIS is the missing piece

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/my-trips" component={MyTrips} />
      <Route path="/chatbot" />
      <Route path="/itinerary/:id" component={ItineraryDetails} />
      <Route path="/explore" component={Explore} />
      <Route path="/hotels" component={Hotels} />
      <Route path="/events" component={Events} />
      <Route path="/feed" component={Feed} />
      <Route path="/flights" component={Flights} />
      <Route path="/about" component={About} />
      <Route path="/ar-vr" component={ARVR} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col font-inter text-dark">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <LiveChatbot />
          <FloatingChatbot /> {/* <-- Add this line */}
        </div>
        <Toaster />
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;