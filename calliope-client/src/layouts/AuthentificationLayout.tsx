import LoginPage from "@/pages/LoginPage";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuhentificationLayout = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsConnected(true);
      navigate("/library");
    }
  }, [navigate]);

  return (
    <div className="authentification-layout">
      {isConnected ? (
        <>{children}</>
      ) : (
        <div>
          <LoginPage />
        </div>
      )}
    </div>
  );
};

export default AuhentificationLayout;
