import React from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import Root from "./pages/Root";
import MainPage from "./pages/MainPage";
import AdminPanel from "./pages/AdminPanel";
import TrackCheckout from "./pages/TrackCheckout";
import Cart from "./pages/Cart";
import Lists from "./components/Lists";
import ProductDetailPage from "./pages/ProductDetailPage";
import LogIn from "./pages/LogIn";
import PageNotFound from "./pages/PageNotFound";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<MainPage />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
      <Route path="/admin-panel" element={<AdminPanel />}>
        <Route path="/admin-panel/:menu" element={<Lists />} />
      </Route>
      <Route path="/shop-all" element={<Lists />} />
      <Route path="/shop-men" element={<Lists />} />
      <Route path="/shop-women" element={<Lists />} />
      <Route path="/sales" element={<Lists />} />
      <Route path="/shop/:object" element={<ProductDetailPage />} />
      <Route path="/tracker" element={<TrackCheckout />} />
      <Route path="/tracker/:phone" element={<TrackCheckout />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
