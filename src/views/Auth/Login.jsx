import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { API } from "../../../config";
import { authActions } from "../../store/auth";
import Loading from "../../components/Loading.jsx/Loading";

const Login = () => {

  const styles = {
    logoStyles: {
      height: "80px",
    },
    pageH: {
      height: "100vh !important",
      overflow: "hidden",
    },
  };

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Please enter your password"),
  });

  const onSubmit = async (formData, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError(""); // Reset error state before attempting login
    console.log(formData);
    try {
      const response = await fetch(`${API}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "User successfully signed in",
          timer: 4000,
          confirmButtonColor: "#007a41",
        });
        navigate("/dashboard");
        dispatch(
          authActions.setLogin({
            user: data.user,
            token: data.token,
            isAuth: true,
            role: data.user.role,
          })
        );
      } else {
        throw new Error(data.message || "Sign in failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container h-p100">
      <div
        className="row align-items-center justify-content-md-center h-p100"
        style={{
          marginTop: "12rem",
        }}
      >
        <div className="col-12">
          <div className="row justify-content-center g-0">
            <div className="col-lg-5 col-md-5 col-12">
              <div className="bg-white border shadow-lg rounded10">
                <div className="content-top-agile p-20 pb-0">
                  <div className="logo-lg">
                    <span className="light-logo">
                      <img
                        src="assets/images/providence.png"
                        alt="logo"
                        style={styles.logoStyles}
                      />
                    </span>
                  </div>
                  <p
                    className="mb-0"
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    SIGNIN TO SYSTEM
                  </p>
                </div>
                {error && (
                  <span
                    className="text-danger"
                    style={{
                      marginLeft: "3rem",
                    }}
                  >
                    <strong>{error}</strong>
                  </span>
                )}

                <div className="p-40">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                  >
                    {({
                      values,
                      isSubmitting,
                      handleSubmit,
                      touched,
                      errors,
                      setFieldValue,
                    }) => (
                      <Form>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-floating">
                              <Field
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                              />
                              <label
                                htmlFor="email"
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                USER EMAIL
                              </label>
                              <ErrorMessage
                                style={{
                                  fontWeight: "bold",
                                }}
                                name="email"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-floating">
                              <Field
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                              />
                              <label
                                htmlFor="password"
                                style={{
                                  fontWeight: "bold",
                                }}
                              >
                                PASSWORD
                              </label>
                              <ErrorMessage
                                style={{
                                  fontWeight: "bold",
                                }}
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space"></div>
                        <div className="row">
                          <div className="col-6">
                            <div className="checkbox">
                              <input type="checkbox" id="basic_checkbox_1" />
                              <label htmlFor="basic_checkbox_1">
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="fog-pwd text-end">
                              <Link to={"/"} className="hover-warning">
                                <i className="ti-lock"></i> Forgot password?
                              </Link>
                              <br />
                            </div>
                          </div>
                          <div className="col-12 text-center">
                            {loading ? (
                              <Loading />
                            ) : (
                              <button
                                type="submit"
                                className="btn btn-primary mt-10"
                                style={{
                                  color: "white",
                                }}
                              >
                                SIGN IN
                              </button>
                            )}
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
