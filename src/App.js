import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Layouts/Navbar";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCrJTk0-eePPJxOogYYjguHikambSKspIw",
  authDomain: "landing-nodefleet.firebaseapp.com",
  projectId: "landing-nodefleet",
  storageBucket: "landing-nodefleet.appspot.com",
  messagingSenderId: "73192320150",
  appId: "1:73192320150:web:b396bd8457ebb9d863e6b7",
  measurementId: "G-EK7E6FH5DX"
};

export let analytics;

if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

function App() {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, "page_view");
    }
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
