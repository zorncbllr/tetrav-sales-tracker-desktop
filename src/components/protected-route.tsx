import { useAuth } from "@/features/auth/hook";
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

  console.log(isVerified);

  useEffect(() => {
    const checkAuth = async () => {
      const { valid } = await verifyToken();
      if (!valid) navigate("/auth");
      else setIsVerified(true);
    };

    checkAuth();
  }, [navigate, verifyToken]);

  return isVerified ? children : null;
}
