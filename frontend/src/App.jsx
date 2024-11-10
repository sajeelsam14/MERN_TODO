import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Invalid from "./screens/Invalid";
import Home from "./screens/Home";
import Update from "./screens/Update";
import New from "./screens/New";
import Login from "./screens/Login";
import Singup from "./screens/Singup";
const App = () => {
  let loginPath = localStorage.getItem("userData")? <Home />: <Login />;
  return (
    <>
      <main className="app-main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={loginPath} />
            <Route path="/signup" element={<Singup />} />
            <Route path="/new" element={<New />} />
            <Route path="/data/:id" element={<Update />} />
            <Route path="*" element={<Invalid />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
};

export default App;
