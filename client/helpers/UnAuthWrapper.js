import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export function UnAuthWrapper(WrappedComponent) {
  return (props) => {
    const router = useRouter();
    const { status } = useSession();
    const checkAuthentication = async () => {
      if (status !== "unauthenticated") {
        router.push("/dashboard");
      }
    };
    // Perform authentication check here
    useEffect(() => {
      checkAuthentication();
    }, [status]);

    if (status !== "unauthenticated") {
      return null; // Return null while authentication is in progress or user is not authenticated
    }

    return <WrappedComponent {...props} />;
  };
}
