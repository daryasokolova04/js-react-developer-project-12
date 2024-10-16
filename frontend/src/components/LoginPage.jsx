import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import routes from "../routes";
import axios from "axios";
import { AuthContext } from "../App";

const LoginPage = () => {
  const { logIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setError(null);
      try {
        const res = await axios.post(routes.loginPath(), values);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        logIn();
        const path = location.state.from.pathname;
        navigate(path === "/login" ? "/" : path);
      } catch (e) {
        setError("Ошибка авторизации");
        console.log(e);
      }
    },
  });

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Войти</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Ваш ник"
              onChange={formik.handleChange}
              value={formik.values.username}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Пароль"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
          </div>
          {error && <div className="error text-danger">{error}</div>}
          <div>
            <button type="submit" className="btn btn-outline-primary">
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
