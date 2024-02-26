import React from "react";
import ReactDOM from "react-dom";
import style from "./style.module.css";
import { AiOutlineClose } from "react-icons/ai";

const Backdrop = () => {
  return <div className={style.backdrop}></div>;
};

const ModalOverlay = (props) => {
  const login = () => {
    window.location.href = "/login";
  };

  const register = () => {
    window.location.href = "/register";
  };

  return (
    <div className={style.container}>
      <div className={style.modal}>
        <header className={style.header}>
          <h2>{props.title}</h2>
          <AiOutlineClose className={style.close} onClick={props.onClose} />
        </header>
        <div className={style.content}>
          <p>{props.message}</p>
        </div>
        {props.isUser ? (
          ""
        ) : (
          <footer className={style.actions}>
            <button onClick={register}>Register</button>
            <button onClick={login}>Login</button>
          </footer>
        )}
      </div>
    </div>
  );
};

const ErrorModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onClose={props.onClose}
          isUser={props.isUser}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default ErrorModal;
