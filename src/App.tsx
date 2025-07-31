import { Route, Routes } from "react-router";
import { getRoutes } from "./routes/routes.conf";
import ProtectedRoute from "./components/protected-route";

function App() {
  const routes = getRoutes();

  return (
    <div className="w-full h-screen dark bg-background text-foreground">
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.protected ? (
                <ProtectedRoute>
                  <route.page />
                </ProtectedRoute>
              ) : (
                <route.page />
              )
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
