import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "./services/socketService";

function App() {

  useEffect(() => {
      connectSocket();
      return () =>  disconnectSocket();
  },[])
  return (
    <div className="layout">
      {/*posible NavBar*/}
      <AppRoutes />
    </div>
  );
}

export default App;
