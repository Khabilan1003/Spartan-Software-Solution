import style from "./style.module.css";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginLocalHandler = async () => {
    const result = await axios.post(
      "http://localhost:5000/auth/login/local",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    console.log(result);
    if (result.data.isSuccess) {
      window.location.href = "http://localhost:3000/viewData";
    } else alert("The User Credentials is not correct");
  };

  return (
    <div className={style.container}>
      <form className={style.formContainer}>
        <h3 className={style.title}>Sign In</h3>
        <input
          type="text"
          placeholder="Username"
          className={style.inputField}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={style.inputField}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={`${style.button}`}
          onClick={(event) => {
            event.preventDefault();
            loginLocalHandler();
          }}
        >
          SIGN IN
        </button>
        <Link to="/register" className={style.link}>
          Register
        </Link>
        <hr className={style.horizontalLine} />
        <button className={`${style.button} ${style.google}`}>
          <AiOutlineGoogle className={style.icons} />
          <span>SIGN IN WITH GOOGLE</span>
        </button>
        <a
          className={`${style.button} ${style.facebook}`}
          href="http://localhost:5000/auth/facebook"
        >
          <FaFacebookF className={style.icons} />
          <span>SIGN IN WITH FACEBOOK</span>
        </a>
      </form>
    </div>
  );
};

export default Login;
