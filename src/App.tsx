import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./features/auth/login/login-page";

function App() {
  return (
    <div className="dark bg-background text-foreground">
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
