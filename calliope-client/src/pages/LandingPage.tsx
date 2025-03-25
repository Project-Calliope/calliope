import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/library");
  }, [navigate]);

  return (
    <div>
      <h1>Landing Page</h1>
      <p>Welcome to Calliope!</p>
    </div>
  );
};

export default LandingPage;
