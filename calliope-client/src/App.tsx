import Page from "./Page";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Page />

      <Toaster containerStyle={{ zIndex: 9999 }} />
      {/* <div className="toaster"> */}
      {/* </div> */}
    </>
  );
}

export default App;
