import { SocketContextProvider } from "./context/SocketContext";
import HomePage from "./pages/Homepage";

const BandNames = () => {
  return (
    <SocketContextProvider>
      <HomePage />
    </SocketContextProvider>
  );
};

export default BandNames;
