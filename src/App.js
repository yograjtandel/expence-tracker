import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/AuthContext";

function App(props) {
  const ctx = useContext(AuthContext);
  const isToken = !!ctx.idToken;

  return (
    <Layout>
      <Routes>
        { !isToken && <Route path="/" element={<AuthPage />} /> }
        { isToken && <Route path="/" element={<HomePage />} /> }
        { !isToken && <Route path="/auth" element={<AuthPage />} /> }
        { isToken && <Route path="/profile" element={<UserProfile />} /> }
        <Route path="*" element={<div><h1>page not found</h1></div>}/>
      </Routes>
    </Layout>
  );
}

export default App;
