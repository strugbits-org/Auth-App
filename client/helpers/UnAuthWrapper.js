import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export function UnAuthWrapper(WrappedComponent) {
  return (props) => {
    const router = useRouter();
    const { status } = useSession();
    const checkAuthentication = async () => {
      if (status == "authenticated") {
        console.log("authenticated");
      }
    };
    // Perform authentication check here
    useEffect(() => {
      checkAuthentication();
    }, []);

    if (status == "authenticated") {
      router.push("/dashboard");
    }

    return <WrappedComponent {...props} />;
  };
}
