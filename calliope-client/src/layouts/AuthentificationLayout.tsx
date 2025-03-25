import LoginPage from "@/Login";
import { ReactNode, useEffect, useState } from "react";

const AuhentificationLayout = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsConnected(true);
    }
  }, []);

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
