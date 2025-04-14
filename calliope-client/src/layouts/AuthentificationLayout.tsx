import UserService from "@/services/UserService";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuhentificationLayout = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkConnection() {
      try {
        const result = await UserService.whoami();
        if (result) {
          setIsLoaded(true);
          setIsConnected(true);
        } else {
          setIsLoaded(true);
          setIsConnected(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoaded(true);
        setIsConnected(false);
      }
    }

    console.log("isLoaded", isLoaded);

    if (!isLoaded) {
      checkConnection();
    } else {
      if (!isConnected) {
        navigate("/login");
      }
    }
  }, [isLoaded, isConnected, navigate]);

  return (
    <div className="authentification-layout">
      {isConnected ? <>{children}</> : <></>}
    </div>
  );
};

export default AuhentificationLayout;
