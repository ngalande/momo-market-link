import {Routes, Route, BrowserRouter} from "react-router-dom"
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Wallet from "./Pages/Wallet";
import Delivery from "./Pages/Delivery";
import Transactions from "./Pages/Transactions";
import Dispute from "./Pages/Dispute";
import ActiveDisputes from "./Pages/ActiveDisputes";
import PastDispute from "./Pages/PastDispute"
import ResolveDispute from "./Pages/ResolveDispute";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/wallet" element={<Wallet/>}/>
          <Route path="/transactions" element={<Transactions/>}/>
          <Route path="/delivery" element={<Delivery/>}/>
          <Route path="/dispute" element={<Dispute/>}/>
          <Route path="/activedisputes" element={<ActiveDisputes/>}/>
          <Route path="/resolveddisputes" element={<PastDispute/>} />
          <Route path="/resolvedispute/id" element={<ResolveDispute/>} />

        </Routes>
      </BrowserRouter>
     
  );
}

export default App;
