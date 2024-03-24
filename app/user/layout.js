import { Suspense } from "react";
import Sidebar from "../../components/sidebar";
import Loading from "../loading";

const layout = ({ children }) => {
  return (
    <div>
      {
        <>
          <Sidebar />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </>
      }
    </div>
  );
};

export default layout;
