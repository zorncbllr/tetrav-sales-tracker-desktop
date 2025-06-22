import { Route, Routes } from "react-router";
import LoginPage from "./features/auth/login/login-page";
import Dashboard from "./features/dashboard/dashboard";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <div className="dark bg-background text-foreground">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
