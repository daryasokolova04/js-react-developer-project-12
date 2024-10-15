import React from "react";
import { useFormik } from "formik";

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
