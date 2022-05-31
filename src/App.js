import { Route, Routes} from "react-router-dom";
import "./App.css";
import Edit from "./Pages/Edit";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
    </div>
  );
}

export default App;
