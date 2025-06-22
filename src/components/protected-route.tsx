import { useAuth } from "@/features/auth/hooks/auth-hook";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { verifyToken } = useAuth();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { valid } = await verifyToken();
      if (!valid) navigate("/auth/login");
      else setIsVerified(true);
    };
    checkAuth();
  }, [navigate, verifyToken]);

  return isVerified ? children : null;
}
