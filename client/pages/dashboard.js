import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";

const dashboard = () => {
  // using data and status from useSession hook
  const { data, status } = useSession();

  const router = useRouter();

  // if status is unauthenticated, redirect to login page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [data, status]);
  return (
    <div
      style={{
        marginTop: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "500px",
        justifyContent: "space-around",
      }}
    >
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6">Welcome {data?.user?.user?.name}</Typography>
      <Typography variant="h6">ID: {data?.user?.user?.id}</Typography>
      <Typography variant="h6">Email: {data?.user?.user?.email}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          // signOut method from next-auth/react
          signOut({
            callbackUrl: "http://localhost:3000/",
          })
        }
      >
        Logout
      </Button>
    </div>
  );
};

export default dashboard;
