import AuthentificationLayout from "@/layouts/AuthentificationLayout";
import Page from "@/pages/sub_pages/Page";
import { Toaster } from "react-hot-toast";

const LibraryPage = () => {
  return (
    <>
      <AuthentificationLayout>
        <Page />
      </AuthentificationLayout>
      <Toaster position="bottom-right" />
    </>
  );
};

export default LibraryPage;
