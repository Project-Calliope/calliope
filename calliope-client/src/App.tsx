import LibraryPage from "@/pages/LibraryPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*   <Route path="/register" element={<RegisterPage />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
