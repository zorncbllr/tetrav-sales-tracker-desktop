import { useLayoutEffect } from "react";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    navigate("/auth");
  }, []);

  return children;
}

export default ProtectedRoute;
