import './scss/app.scss';
import Header from './Components/Header';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {createContext, useContext, useState} from "react";



import Home from './pages/Home';
import Cart from "./pages/Cart";
import EmptyCart from './pages/EmptyCart';

export const SearchContext= createContext();

function App() {

    const[searchValue, setSearchValue] =useState('');

    return (

        <Router>
            <div className="wrapper">
               <SearchContext.Provider  value={{searchValue, setSearchValue}}>
                   <Header/>
                   <div className="content">
                       <Routes>
                           <Route path="/" element={<Home/>} />
                           <Route path="/cart" element={<Cart/>} />
                           <Route path="*" element={<EmptyCart />} />
                       </Routes>
                   </div>
               </SearchContext.Provider>
            </div>
        </Router>
    );
}

export default App;
