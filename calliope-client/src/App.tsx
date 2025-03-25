import AuthentificationLayout from "./layouts/AuthentificationLayout";
import Page from "./Page";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthentificationLayout>
        <Page />
      </AuthentificationLayout>

      <Toaster containerStyle={{ zIndex: 9999 }} />
      {/* <div className="toaster"> */}
      {/* </div> */}
    </>
  );
}

export default App;
