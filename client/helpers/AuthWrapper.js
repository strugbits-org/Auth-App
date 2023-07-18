import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export function AuthWrapper(WrappedComponent) {
  return (props) => {
    const router = useRouter();
    const { status } = useSession();
    const checkAuthentication = async () => {
      if (status != "authenticated") {
        router.push("/");
      }
    };
    // Perform authentication check here
    useEffect(() => {
      checkAuthentication();
    }, []);

    if (status !== "authenticated") {
      return null; // Return null while authentication is in progress or user is not authenticated
    }

    return <WrappedComponent {...props} />;
  };
}
