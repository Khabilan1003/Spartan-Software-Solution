import LoadPage from "./components/load";
import ViewPage from "./components/view";
import Login from "./components/login";
import Register from "./components/register";

import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect} from "react";
import { fetchUser } from "./store/features/userSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (!user.loading) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/viewData" />} />
          <Route path="/loadData" element={<LoadPage />} />
          <Route path="/viewData" element={<ViewPage />} />
          <Route
            path="/login"
            element={user.isLoggedIn ? <Navigate to="/viewData" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              user.isLoggedIn ? <Navigate to="/viewData" /> : <Register />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
