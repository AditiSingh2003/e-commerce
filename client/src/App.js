import { useEffect } from "react";
import{
  BrowserRouter ,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./scenes/home/Home.jsx";
import ItemDetails from "./scenes/itemDetails/ItemDetails.jsx";
import Confirmation from "./scenes/checkout/Confirmation.jsx";
import Navbar from "./scenes/global/Navbar.jsx";
import CartMenu from "./scenes/global/CartMenu.jsx";
import Footer from "./scenes/global/Footer.jsx";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
   <div className="app">
      <BrowserRouter>
      <Navbar/>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path= "item/itemId" element={<ItemDetails />} />
          <Route path="checkout/success" element={<Confirmation />} />
          </Routes>
          <CartMenu/>
          <Footer/>
        </BrowserRouter>
   </div>
  );
}

export default App;
