import React, { useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/actions/authActions.js";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status } = useSession();
  const auth = useSelector((state) => state.auth);
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number.")
      .matches(/(?=.*[A-Z])/, "Password must contain an uppercase letter.")
      .matches(/(?=.*[a-z])/, "Password must contain a lowercase letter."),
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    const res = await dispatch(signup(values));
    if (res) {
      router.push("/dashboard");
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);
  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        style={{
          marginBottom: 20,
        }}
      >
        Sign up
      </Typography>
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{
            marginTop: 20,
            width: 200,
          }}
          type="submit"
        >
          Sign up
        </Button>
      </form>
      <Link
        href="/"
        style={{
          marginTop: 20,
        }}
      >
        Already have an account? Login
      </Link>
    </Container>
  );
};

export default Signup;
