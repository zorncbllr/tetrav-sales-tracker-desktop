import { Route, Routes } from "react-router";
import LoginPage from "./features/auth/login/login-page";
import Dashboard from "./features/dashboard/page";
import ProtectedRoute from "./components/protected-route";
import AccountsPage from "./features/accounts/page";

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

        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <AccountsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
