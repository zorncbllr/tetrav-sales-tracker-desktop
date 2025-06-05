import { Route, Routes } from "react-router";
import SignIn from "./features/auth/pages/SignIn";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  return (
    <div className="w-full h-screen dark bg-primary-foreground text-secondary-foreground">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
