
import './App.css';
import Layout from './Components/global/Layout';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import BlockchainProvider from "./context";
// import { Route, BrowserRouter } from 'react-router-dom';
import "./Assets/css/app.css"
import "./Assets/css/custom.css"
import "./Assets/css/mycss.css"
function App() {
  return (
    <>
      <BlockchainProvider>
        <Layout />
      </BlockchainProvider>
      <NotificationContainer />
    </>
  );
}

export default App;
