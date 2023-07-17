import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../context/Context";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login"); // Redirect to login page if not logged in
    }
  }, [isLoggedIn, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
