import { useEffect, useRef, useState } from "react";
import Astro from "../assets/astro.png";
import { Fade } from "react-awesome-reveal";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendEmailVerification } from "firebase/auth";
import { app, db } from "../firebase";
import axios from "axios";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const isPasswordValid = (password) => {
    if (!password) {
      return false;
    } else {
      const regexPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
      return validator.matches(password, regexPattern);
    }
  };

  const CreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const formObj = Object.fromEntries(formData.entries());
    const {
      name,
      email,
      phone_Number,
      college,
      address,
      password,
      gender,
      year,
    } = formObj;

    try {
      if (!isPasswordValid(password)) {
        return toast.error(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        );
      }
      if (gender === "none") {
        throw Error("Please select your gender");
      }
      if (year === "none") {
        throw Error("Please select your year");
      }
      const createUser = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        password
      );

      await sendEmailVerification(createUser?.user);
      toast.success("Please check your email for verification!");
      let interval = setInterval(async () => {
        if (auth.currentUser.emailVerified) {
          clearInterval(interval);
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              email: createUser?.user.email,
              uid: createUser?.user.uid,
            })
          );
          const userRef = doc(db, "registered_users", createUser.user.uid);

          await setDoc(userRef, {
            userId: createUser.user.uid,
            email: email.toLowerCase(),
            name: name.trim(),
            phone_Number: phone_Number.trim(),
            college: college,
            address: address,
            gender: gender,
            year: year,
            dateCreated: new Date(),
          });
          console.log(auth);
          window.location.href = "/";
        }
        await auth.currentUser.reload();
      }, 2000);
    } catch (error) {
      if (
        error.message.includes("Firebase: Error (auth/email-already-in-use).")
      ) {
        toast.error("Email already in use");
      }
      // toast.error(error.message);
      // console.log(error.message);
      // toast.error();
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       navigate("/");
  //     }
  //   });
  //   console.log(formData);
  //   // donot set in local storage, will be handled by auth
  //   //localStorage.setItem("formData", JSON.stringify(formData));
  // }, [formData]);

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
                Register
              </h1>
              <form
                action="#"
                ref={formRef}
                className="flex flex-col gap-1 font-Default text-lg lowercase "
                onSubmit={CreateUser}
              >
                <label htmlFor="name">Name</label>
                <input
                  className="w-60 md:w-80 h-10 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                  type="text"
                  placeholder="name"
                  name="name"
                  minLength={3}
                  maxLength={100}
                  required
                  title="Enter Your name"
                  autoComplete="off"
                  id="name"
                />
                <label htmlFor="email">Email</label>
                <input
                  className=" h-10 w-60 md:w-80 border border-black  bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                  type="email"
                  placeholder="enter email"
                  required
                  title="Enter Email"
                  name="email"
                  autoComplete="off"
                  id="email"
                />
                <label htmlFor="phone_Number">Phone Number</label>
                <input
                  className=" h-10 w-60 md:w-80 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                  type="tel"
                  placeholder="enter phone number without +91"
                  required
                  title="Enter Phone Number"
                  name="phone_Number"
                  autoComplete="off"
                  id="phone_Number"
                  maxLength={10}
                  minLength={10}
                />
                <label htmlFor="gender">gender</label>
                <select
                  name="gender"
                  className=" h-10 w-60 md:w-80 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                  required
                >
                  <option value="none">select gender</option>
                  <option value="male">male</option>

                  <option value="female">female</option>

                  <option value="others">others/not specified</option>
                </select>
                <label htmlFor="year">year</label>
                <select
                  name="year"
                  className=" h-10 w-60 md:w-80 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                  required
                >
                  <option value="none">select year</option>
                  <option value="first">1st</option>

                  <option value="second">2nd</option>

                  <option value="third">3rd</option>

                  <option value="fourth">4th</option>
                </select>
                <label htmlFor="college">college</label>
                <input
                  className=" h-10 w-60 md:w-80 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                  type="text"
                  placeholder="enter college name"
                  required
                  title="Enter College Name"
                  name="college"
                  autoComplete="off"
                  id="college"
                />
                <label htmlFor="address">Address</label>
                <input
                  className=" h-10 w-60 md:w-80 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                  type="text"
                  placeholder="enter address"
                  required
                  title="Enter Address"
                  name="address"
                  autoComplete="off"
                  id="address"
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
                  text-white bg-[#9360FA] border border-white nav_Box_shadow h-10 font-Default w-1/3 text-center mx-auto 
                  ${!isPasswordValid() ? "mt-14" : "my-5"}
                      `}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "loading..." : "register"}
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

export default Register;
