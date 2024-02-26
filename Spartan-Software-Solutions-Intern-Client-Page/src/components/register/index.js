import style from "./style.module.css";
import { AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Form Input Field States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const registerLocalHandler = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        "http://localhost:5000/auth/register/local",
        {
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        },
        { withCredentials: true }
      );
      if (result.data.isError) {
        alert("There is some issue in the server. Please try again later");
      } else if (!result.data.isPasswordMatches) {
        alert(
          "The password and confirm password doesn't match. Please enter correctly"
        );
      } else if (!result.data.isUsernameUnique) {
        alert("The given username already exists. Go with some other username");
      } else {
        alert("Account Successfully created");
        navigate("/login");
      }
      console.log(result.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className={style.loader_aligner}>
          <div className={style.loader}></div>
        </div>
      ) : (
        <div className={style.container}>
          <form className={style.formContainer}>
            <h3 className={style.title}>Register</h3>
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
            <input
              type="password"
              placeholder="Confirm Password"
              className={style.inputField}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className={`${style.button}`}
              onClick={() => registerLocalHandler()}
            >
              REGISTER
            </button>
            <Link className={style.link} to="/login">
              Sign In
            </Link>
            <hr className={style.horizontalLine} />
            <button className={`${style.button} ${style.google}`}>
              <AiOutlineGoogle className={style.icons} />
              <span>REGISTER WITH GOOGLE</span>
            </button>
            <a
              className={`${style.button} ${style.facebook}`}
              href="http://localhost:5000/auth/facebook"
            >
              <FaFacebookF className={style.icons} />
              <span>REGISTER WITH FACEBOOK</span>
            </a>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;