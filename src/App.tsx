import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import UploadModel from "./components/UploadModel";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import Root from "./pages/Root";
import MainPage from "./pages/MainPage";
import AdminPanel from "./pages/AdminPanel";
import TrackCheckout from "./pages/TrackCheckout";
import Cart from "./pages/Cart";
import Lists from "./components/Lists";
import ProductDetailPage from "./pages/ProductDetailPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<MainPage />} />
      <Route path="/admin-panel" element={<AdminPanel />}>
        <Route path="/admin-panel/:menu" element={<Lists />} />
      </Route>
      <Route path="/:object" element={<ProductDetailPage />} />
      <Route path="/tracker" element={<TrackCheckout />} />
      <Route path="/cart" element={<Cart />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
