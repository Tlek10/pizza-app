import './scss/app.scss';
import React, {Suspense} from "react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import MainLayout from "./layouts/MainLayout";


const Cart = React.lazy(()=>import('./pages/Cart'))
const FullPizza = React.lazy(()=>import('./pages/fullPizza/FullPizza'))
const EmptyCart = React.lazy(()=>import('./pages/EmptyCart'))

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route path="cart" element={
                        <Suspense fallback={<div>LOADING</div>}>
                            <Cart/>
                        </Suspense>
                      }/>
                    <Route path="pizza/:id" element={
                        <Suspense fallback={<div>LOADING</div>}>
                        <FullPizza/>
                    </Suspense>}/>
                    <Route path="*" element={
                        <Suspense fallback={<div>LOADING</div>}>
                        <EmptyCart/>
                    </Suspense>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
