import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "../screens/Login";
import Protected from "../protected";
import DashboardLayout from "../screens/Dashboard";
import Dashboard from "../screens/Dashboard/Summary";
import Drivers from "../screens/Dashboard/Drivers";
import Trucks from "../screens/Dashboard/Trucks";
import Trips from "../screens/Dashboard/Trips";
import Analytics from "../screens/Dashboard/Analytics";
import Settings from "../screens/Dashboard/Settings";
import NotFound from "../screens/NotFound";
import AddTrip from "../screens/Dashboard/Trips/Add";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />} />
        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="/dashboard/drivers" element={<Drivers />} />
          <Route path="/dashboard/trucks" element={<Trucks />} />
          <Route path="/dashboard/trips" element={<Trips />} />
          <Route path="/dashboard/trips/add" element={<AddTrip />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
