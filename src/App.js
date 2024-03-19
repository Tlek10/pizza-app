import './scss/app.scss';
import Header from './Components/Header';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


import Home from './pages/Home';
import Cart from "./pages/Cart";
import EmptyCart from './pages/EmptyCart';


function App() {


    return (
        <Router>
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="*" element={<EmptyCart/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
