"use client";
import Navbar from "@/Components/Nabvar/Navbar";
import Image from "next/image";
import React, { useState, useContext, useEffect } from "react";
import banner from "../../../public/assets/images/banner.svg";
import AuthInput from "@/Components/Inputs/AuthInput/AuthInput";
import AuthBtn from "@/Components/Buttons/AuthBtn/AuthBtn";
import Link from "next/link";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { AccountSignup } from "@/APIs/auth";
import toast, { Toaster } from "react-hot-toast";
import { handleApiRes } from "@/utils/handleApiRes";
import { useRouter } from "next/navigation";
import { StoreContext, StoreContextType } from "@/GlobalState/store";

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const context = useContext<StoreContextType>(StoreContext);
  const { userData } = context.state;
  const { setUserData } = context.actions;
  const { toBeVendor } = context?.state;
  const { toggleToBeVendor } = context?.actions;

  // useEffect(() => {
  //   console.log(toBeVendor);
  // }, []);

  const manualSignup = async () => {
    if (!username || !email || !password) {
      return toast.error("Please provide all credentials.");
    }

    const loadingToast = toast.loading("Signing up. Please wait...");
    try {
      const signupRes = await AccountSignup({
        google: false,
        username,
        email,
        password,
      });
      toast.dismiss(loadingToast);
      const userFetchedData = handleApiRes(signupRes, toast);
      if (userFetchedData) {
        toast.success("Welcome on board!");
        setUserData({ ...userFetchedData, ...userData });
        localStorage.setItem(
          "accessToken",
          JSON.stringify(userFetchedData.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(userFetchedData.refreshToken)
        );
        //Check if user clicked "Start selling" before reaching this page
        if (toBeVendor) {
          //If toBeVendor variable is true, proceed to Onboarding page after signup
          router.push("/Onboarding");
          //Set toBeVendor to false
          toggleToBeVendor();
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      toast.error("An error occured. Please retry.");
      console.log(error);
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
        const loadinToast = toast.loading("Signing up. Please wait...");
        const signupRes = await AccountSignup({
          google: true,
          username: data.data.name,
          email: data.data.email,
        });
        toast.dismiss(loadinToast);
        const userFetchedData = handleApiRes(signupRes, toast);
        if (userFetchedData) {
          toast.success("Welcome on board!");
          setUserData({ ...userFetchedData, ...userData });
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userFetchedData.accessToken)
          );
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(userFetchedData.refreshToken)
          );

          //Check if user clicked "Start selling" before reaching this page
          if (toBeVendor) {
            //If toBeVendor variable is true, proceed to Onboarding page after signup
            router.push("/Onboarding");
            //Set toBeVendor to false
            toggleToBeVendor();
          } else {
            router.push("/");
          }
        }
      } catch (error) {
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
            Start Selling Today!
          </h1>
          <AuthInput
            value={username}
            setValue={setUsername}
            label={"Username"}
          />
          <AuthInput value={email} setValue={setEmail} label={"Email"} />
          <AuthInput
            value={password}
            setValue={setPassword}
            label={"Password"}
            type="Password"
          />
          <AuthBtn role="signup" action={manualSignup} />
          <span className="mt-[20px] font-bold">OR</span>
          <AuthBtn role="google" action={googleAuth} />
          <Link href={"/Signin"} className="mt-[20px] underline">
            <span>Already a member</span>
          </Link>
        </form>
      </section>
    </main>
  );
};

export default Signup;
