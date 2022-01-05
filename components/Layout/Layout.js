import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import PaymentWarning from "../PaymentWarning/PaymentWarning";
import global from './Layout.style.js' 

const Layout = ({ children }) => {
  
  const router = useRouter();

  return (
    <div className="layout">
      <Navbar />

      {router.pathname == "/" && (
        <PaymentWarning />
      )}

      <div className="container">
        {children}
      </div>
    
      <style jsx global>
        {global}
      </style>
    </div>
  )
};

export default Layout;