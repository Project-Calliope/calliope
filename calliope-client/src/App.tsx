import NavBar from "./components/navbar";
import FileUploadDialog from "./components/upload-file";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <NavBar />
      <Toaster containerStyle={{ zIndex: 9999 }} />
      {/* <div className="toaster"> */}
      {/* </div> */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-xl font-bold">Hello world!</h1>
        <p className="mt-3 text-lg">This is a Calliope app.</p>
        <FileUploadDialog />
      </div>
    </>
  );
}

export default App;
