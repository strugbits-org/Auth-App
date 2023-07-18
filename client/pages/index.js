import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useEffect } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UnAuthWrapper } from "../helpers/UnAuthWrapper";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const router = useRouter();
  const { status } = useSession();
  const handleSubmit = async (values) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    if (res.status === 200) {
      router.push("/dashboard");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Authentication app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
          Login
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
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            autoComplete="off"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="off"
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
            Sign in
          </Button>
        </form>
        <Link
          href="/signup"
          style={{
            marginTop: 20,
          }}
        >
          Don't have an account? Sign up
        </Link>
      </Container>
    </>
  );
};

export default UnAuthWrapper(Home);
