"use client";
import Navbar from "@/Components/Nabvar/Navbar";
import Image from "next/image";
import React, { useContext, useState } from "react";
import banner from "../../../public/assets/images/banner.svg";
import AuthInput from "@/Components/Inputs/AuthInput/AuthInput";
import AuthBtn from "@/Components/Buttons/AuthBtn/AuthBtn";
import Link from "next/link";
import { useGoogleLogin } from "@react-oauth/google";
import { AccountSignin } from "@/APIs/auth";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { handleApiRes } from "@/utils/handleApiRes";
import { StoreContext, StoreContextType } from "@/GlobalState/store";
import { useRouter } from "next/navigation";

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const context = useContext<StoreContextType>(StoreContext);
  const { userData } = context.state;
  const { setUserData } = context.actions;
  const router = useRouter();

  const manualSignin = async () => {
    if (!email || !password) {
      return toast.error("Please provide all credentials.");
    }

    try {
      const loadinToast = toast.loading("Signing in. Please wait...");
      const signinRes: any = await AccountSignin({
        google: false,
        email,
        password,
      });
      toast.dismiss(loadinToast);
      const userFetchedData = handleApiRes(signinRes, toast);
      if (userFetchedData) {
        toast.success("Welcome back!");
        setUserData({ ...userFetchedData, ...userData });
        localStorage.setItem(
          "accessToken",
          JSON.stringify(userFetchedData.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(userFetchedData.refreshToken)
        );
        router.push("/");
      }
    } catch (error: any) {
      toast.error("An error occured. Please retry.");
    }
  };

  //This function shows the google consent modal for authentication
  const googleAuth = useGoogleLogin({
    //Retrieve user credentials from google, after the consent screen provides an access_token
    onSuccess: async (response) => {
      try {
        const data = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        //Create or login user on app server using retrieved credentials
        const loadinToast = toast.loading("Signing in. Please wait...");
        const signinRes: any = await AccountSignin({
          google: true,
          email: data.data.email,
        });
        toast.dismiss(loadinToast);
        const userFetchedData = handleApiRes(signinRes, toast);
        if (userFetchedData) {
          toast.success("Welcome back!");
          setUserData({ ...userFetchedData, ...userData });
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userFetchedData.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(userFetchedData.refreshToken)
          );
          router.push("/");
        }
      } catch (error: any) {
        toast.error("An error occured. Please retry.");
      }
    },
  });

  return (
    <main className="h-[100vh] max-smallDesktop:pt-[60px] w-full flex flex-col justify-start items-center bg-[#fff]">
      <Toaster />
      <section className="h-full w-full flex flex-col smallDesktop:flex-row justify-start smallDesktop:justify-center items-center">
        <figure className="w-[300px] h-[100px] relative max-smallDesktop:mt-[20px] max-smallDesktop:mb-[40px] smallDesktop:mr-[60px]">
          <Image src={banner} alt={"Vendornia Logo"} fill />
        </figure>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-[350px] max-mobile:w-[85%] flex flex-col justify-start items-center"
        >
          <h1 className="font-bold text-[22px] mb-[16px]">
            We&apos;ve missed you!
          </h1>
          <AuthInput value={email} setValue={setEmail} label={"Email"} />
          <AuthInput
            value={password}
            setValue={setPassword}
            label={"Password"}
            type="Password"
          />
          <AuthBtn role="signin" action={manualSignin} />
          <span className="mt-[20px] font-bold">OR</span>
          <AuthBtn role="google" action={googleAuth} />
          <Link href={"/Signup"} className="mt-[20px] underline">
            <span>I don&apos;t have an account</span>
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Signin;
