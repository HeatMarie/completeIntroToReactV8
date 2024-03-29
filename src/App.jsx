import React from "react";
import { createRoot } from "react-dom/client";
import Pet from "./Pet"
import SearchParams from "./SearchParams";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Details from "./Details";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return ( 
    
    <BrowserRouter>
    <AdoptedPetContext.Provider value={adoptedPet}>
    <QueryClientProvider client={queryClient}>
    <header>
      <Link to="/">
      <h1>Adopt Me!</h1>
      </Link>
    </header>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
        <Route path="/" element={<SearchParams />} />
      </Routes>

    </QueryClientProvider>

    </AdoptedPetContext.Provider>
    </BrowserRouter>
  )
}
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
