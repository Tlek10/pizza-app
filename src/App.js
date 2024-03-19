import './scss/app.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Cart from "./pages/Cart";
import EmptyCart from './pages/EmptyCart';
import FullPizza from "./pages/fullPizza/FullPizza";
import MainLayout from "./layouts/MainLayout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainLayout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="pizza/:id" element={<FullPizza/>}/>
                    <Route path="*" element={<EmptyCart/>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
