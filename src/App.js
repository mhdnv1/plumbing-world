import Header from "./layout/Header/Header";
import Home from "./pages/Home/Home";
import {Routes , Route} from 'react-router-dom'
import Singlepage from "./pages/Home/Singlepage";
import CreatePost from "./pages/CreatePost/CreatePost";
import Clearance from "./pages/Сlearance/Сlearance";
import React, { useEffect, useState, createContext } from 'react';



export const ContextProductsId = createContext({
  cardsIdContext: [],
  setCardsIdContext: () => {}
});

export const ContextProducts = createContext({
  cardsContext: [],
  setCardsContext: () => {}
});

export const ContextSumma = createContext({
  summa: [],
  setSumma: () => {}
});



function App() {

  const [cardsContext, setCardsContext] = useState([]);
  const value1 = { cardsContext, setCardsContext };

  const [cardsIdContext, setCardsIdContext] = useState([]);
  const value2 = { cardsIdContext, setCardsIdContext };


  const [summa, setSumma] = useState([]);
  const value3 = { summa, setSumma };

  return (
    <div className="App">
      <ContextProducts.Provider value={value1}>
      <ContextProductsId.Provider value={value2}>
      <ContextSumma.Provider value={value3}>
      <Header/>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/:id" element={<Singlepage/>}/>
         <Route path="/clearance" element={<Clearance/>} />
      </Routes>  
      </ContextSumma.Provider> 
      </ContextProductsId.Provider> 
      </ContextProducts.Provider>
    </div>
  );
}

export default App;
