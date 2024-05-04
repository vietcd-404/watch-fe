import React from "react";
import { Route, Routes } from "react-router-dom";
import Product from "../page/Admin/Product/Product";
import NavMenu from "../components/Admin/NavMenu/NavMenu";
import Invoice from "../page/Admin/Invoice/Invoice";
import Dashboard from "../page/Admin/Dashboard/Dashboard";

const RouteAdmin = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <NavMenu>
              <Dashboard />
            </NavMenu>
          }
        />
        <Route
          path="/product"
          element={
            <NavMenu>
              <Product />
            </NavMenu>
          }
        />
      </Routes>
    </div>
  );
};

export default RouteAdmin;
