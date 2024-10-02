import { useEffect, useState } from "react";
import Astro from "../assets/astro.png";
import { Fade } from "react-awesome-reveal";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import validator from "validator";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase";

// import { createClient } from "@supabase/supabase-js";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const form_ref = useRef();
  const [loading, setLoading] = useState(false);

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const formData = new FormData(form_ref.current);
  const formObj = Object.fromEntries(formData.entries());
  const { email, password } = formObj;

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    handleToggle();
    // console.log(e);
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const loginUser = await signInWithEmailAndPassword(
        auth,
        email?.toLowerCase(),
        password
      );

      if (loginUser.user.emailVerified === false) {
        await sendEmailVerification(loginUser.user);
        toast.error("Please verify your email first, Check your mail inbox!");
        let interval = setInterval(async () => {
          if (auth.currentUser.emailVerified) {
            clearInterval(interval);
            // console.log(auth);
            window.location.href = "/competitions";
          }
          await auth.currentUser.reload();
        }, 2000);
      } else {
        window.location.href = "/competitions";
      }
      // console.log(loginUser);
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          email: loginUser.user.email,
          uid: loginUser.user.uid,
        })
      );
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container  mx-auto  p-20 overflow-hidden">
        <div className="flex items-start w-full relative justify-center lg:justify-end ">
          <Fade triggerOnce>
            <figure className="w-1/2 absolute -top-6 left-24 scale-125 z-0 hidden lg:block">
              <img src={Astro} alt=" Astronaut" />
            </figure>
          </Fade>

          <div className="  lg:w-1/2 py-12 z-10  ">
            <div className=" min-h-fit w-72 md:w-[355px] lg:w-[550px] bg-primary  flex items-center flex-col gap-8 py-8 font-Default contact-form-shadow ">
              <h1 className="text-center text-5xl font-bold lowercase">
                Login
              </h1>
              <form
                action="#"
                className="flex flex-col gap-1 font-Default text-lg lowercase "
                ref={form_ref}
                onSubmit={LoginUser}
              >
                <label htmlFor="email">Email</label>
                <input
                  className=" h-10 w-60 md:w-80 border border-black  bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                  type="email"
                  placeholder="enter email"
                  required
                  title="Enter Email"
                  name="email"
                  autoComplete="email"
                  id="email"
                />

                <label htmlFor="password">Password</label>
                <div className="relative">
                  <input
                    className="h-10 w-60 md:w-80 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow "
                    type={type}
                    placeholder="password"
                    required
                    title="Enter Password"
                    name="password"
                    autoComplete="off"
                    id="password"
                  />
                  <span
                    className=" absolute  top-1 right-5 md:right-4 lg:right-3"
                    onClick={handleToggle}
                  >
                    <Icon className="" icon={icon} size={20} />
                  </span>
                </div>

                <button
                  className={`
                  text-white bg-[#9360FA] border border-white nav_Box_shadow h-10 font-Default w-1/3 text-center mx-auto my-4 
                      `}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "loading..." : "login"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
