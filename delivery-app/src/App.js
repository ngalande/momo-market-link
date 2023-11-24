import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import FinishDelivery from "./Pages/FinishDelivery";
import Result from "./Pages/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/finish/:id" element={<FinishDelivery/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
