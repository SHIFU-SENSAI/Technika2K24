import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { uuid } from "uuid-base62";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

const FormTeam = (props) => {
  const auth = getAuth();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [eventData, setEventData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState([]);
  const ev_id = searchParams.get("id");
  const r_id = uuid.v4(10);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [teamDataFromFirebase, setTeamDataFromFirebase] = useState({});

  useEffect(() => {
    fetchEventData();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  // fetching event data from firebase
  const fetchEventData = async () => {
    const docRef = doc(db, "events", ev_id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setEventData(docSnap.data());
    }
  };

  // fetching user data when he loggined through firebase
  const fetchUserData = async () => {
    const uidFromLocal = JSON.parse(localStorage.getItem("authUser")).uid;
    const uid = auth?.currentUser?.uid;
    const userDataQuery = doc(db, "registered_users", uidFromLocal || uid);
    const userSnap = await getDoc(userDataQuery);
    if (userSnap.exists()) {
      setUserData(userSnap?.data());
    }
  };

  // destructring user data to send in input value fields.
  const { address, college, email, name, gender, phone_Number, year } =
    userData;

  useEffect(() => {
    fetchUserData();
  }, [auth?.currentUser]);

  const [customInputs, setCustomInputs] = useState([
    {
      name_name: "participants_name",
      name_email: "participants_email",
    },
  ]);
  // console.log(customInputs);

  // adding dynamic inputs
  const handleAddDynamic = (e, index) => {
    e.preventDefault();

    setCustomInputs([
      ...customInputs,
      {
        name_name: `participants_name${index + 1}`,
        name_email: `participants_email${index + 1}`,
      },
    ]);
  };

  // deleting dynamic inputs
  const handleDeleteDynamic = (e, index) => {
    e.preventDefault();
    if (customInputs.length > 1) {
      const updatedArray = customInputs.filter((item, i) => index !== i);
      setCustomInputs(updatedArray);
    }
  };

  // fetching team data from firebase
  const fetchTeamData = async () => {
    if (eventData?.event_title) {
      const q = query(
        collection(db, "team_form"),
        where("event_name", "==", eventData?.event_title),
        where("email", "==", auth?.currentUser?.email)
      );

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setTeamDataFromFirebase(doc.data());
        });
      });
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, [eventData]);

  useEffect(() => {
    if (Object.keys(teamDataFromFirebase).length > 0) {
      setCustomInputs(teamDataFromFirebase?.participants_info);
    }
  }, [teamDataFromFirebase]);

  // console.log(teamDataFromFirebase);

  // function to submit form data to firebase
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    const formObj = Object.fromEntries(formData.entries());

    // console.log("formObj", formObj);

    const { phone_Number, team_name, a, e, m } = formObj;

    const { name, email, college, address, gender, year } = userData;

    const participants = customInputs.map((items) => {
      return {
        name: formData.get(items?.name_name),
        email: formData.get(items?.name_email),
      };
    });

    try {
      const id =
        Object.keys(teamDataFromFirebase).length > 0
          ? teamDataFromFirebase?.regId
          : r_id;
      const teamFormDetails = doc(db, "team_form", id);
      await setDoc(teamFormDetails, {
        full_name: name,
        team_name: team_name,
        email: email,
        phone_Number: phone_Number,
        college: college,
        address: address,
        gender: gender,
        year: year,
        edm: e === "on" ? "checked" : "null",
        merch: m === "on" ? "checked" : "null",
        accommodation: a === "on" ? "checked" : "null",
        participants_info: participants,
        dateCreated: new Date(),
        regId: id,
        event_name: eventData?.event_title,
      });

      toast.success("Form submitted successfully!");
    } catch (e) {
      console.log(e);
    }
  };

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   phone_Number: "",
  //   college: "",
  //   address: "",
  //   gender: "",
  //   year: "",
  //   team_name: "",
  // });
  // const [gender, setGender] = useState();
  // const [year, setYear] = useState();

  // const isFormValid = () => {
  //   // Check if any of the required fields are empty
  //   return Object.values(formData).every((value) => value !== "");
  // };

  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   // console.log(e.target);
  //   const { name, value } = e.target;

  //   if (name === "gender") {
  //     setGender(value);
  //   } else if (name === "year") {
  //     setYear(value);
  //   }
  //   setFormData({ ...formData, [name]: value });
  // };

  // useEffect(() => {}, [formData]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  return (
    <div className="flex relative z-10 pb-10">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-white text-center py-5 my-5">
          Registration
        </h1>
        <div className="w-full max-w-[850px] mx-auto bg-primary  border-4 border-black contact-form-shadow">
          <div className="border rounded p-4">
            <div className="font-Default">
              <div className="flex flex-col gap-2 font-Default text-lg my-2 mb-5">
                <div>
                  <label
                    htmlFor="event_title"
                    name="event_title"
                    className="text-lg font-bold text-gray-800"
                    id="event_title_label"
                  >
                    Confirm submission for {eventData.event_title}
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="event_venue"
                    name="event_venue"
                    id="event_venue_label"
                    className="text-md font-semibold text-gray-700"
                  >
                    Venue: {eventData.event_venue}
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="event_time"
                    name="event_time"
                    id="event_time_label"
                    className="text-md font-semibold text-gray-700"
                  >
                    Time: {eventData.event_date}
                  </label>
                </div>
              </div>
              <div>
                <label
                  htmlFor="team_and_personal_info"
                  id="team_and_personal_info_label"
                  name="team_and_personal_info"
                  className="text-2xl font-semibold text-black font-Default"
                >
                  Team and Personal Information
                </label>
                <form
                  onSubmit={handleSubmit}
                  ref={formRef}
                  action="#"
                  className="flex flex-col gap-1 font-Default text-lg lowercase "
                >
                  <label
                    htmlFor="full_name_input"
                    name="full_name"
                    id="name_label"
                    className="text-lg text-gray-800"
                  >
                    Full Name
                  </label>

                  <input
                    className="w-100 md:w-160 h-10 border border-black bg-primary focus:outline-none focus:text-black px-2 py-2 nav_Box_shadow disabled:text-gray-500"
                    type="text"
                    placeholder="enter your full name"
                    name="full_name"
                    minLength={3}
                    maxLength={100}
                    required
                    title="Please enter your full name"
                    id="full_name_input"
                    value={name}
                    disabled
                    readOnly
                  />
                  <label
                    htmlFor="team_name"
                    id="team_name"
                    name="team_name"
                    className="text-lg text-gray-800"
                  >
                    Team Name
                  </label>
                  <input
                    className="w-100 md:w-160 h-10 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                    type="text"
                    placeholder="Team Name"
                    name="team_name"
                    minLength={3}
                    maxLength={100}
                    required
                    title="Enter Your Team Name"
                    id="team_name"
                    defaultValue={teamDataFromFirebase?.team_name || ""}
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    className=" h-10 w-100 md:w-160 border border-black  bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow disabled:text-gray-500"
                    type="email"
                    placeholder="enter email"
                    required={true}
                    title="Enter Email"
                    name="email"
                    id="email"
                    value={email}
                    disabled
                    readOnly
                  />

                  <label
                    htmlFor="phone_Number"
                    id="phone_Number"
                    name="phone_Number"
                    className="text-lg text-gray-800"
                  >
                    Phone Number
                  </label>

                  <input
                    className="h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black px-2 py-2 nav_Box_shadow"
                    type="tel"
                    placeholder="Enter Phone Number"
                    required
                    title="Enter Phone Number"
                    name="phone_Number"
                    id="phone_Number"
                    defaultValue={phone_Number}
                  />

                  <label
                    htmlFor="gender"
                    id="gender"
                    name="gender"
                    className="text-lg text-gray-800"
                  >
                    Gender
                  </label>

                  <select
                    name="gender"
                    className="h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black px-2 py-2 nav_Box_shadow"
                    required
                    value={gender}
                    disabled
                    readOnly
                  >
                    <option value="none">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others/Not Specified</option>
                  </select>

                  <label
                    htmlFor="year"
                    id="year"
                    name="year"
                    className="text-lg text-gray-800"
                  >
                    Year
                  </label>

                  <select
                    name="year"
                    className="h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black px-2 py-2 nav_Box_shadow"
                    required
                    value={year}
                    disabled
                    readOnly
                  >
                    <option value="none">Select Year</option>
                    <option value="first">1st</option>
                    <option value="second">2nd</option>
                    <option value="third">3rd</option>
                    <option value="fourth">4th</option>
                  </select>

                  <label
                    className="text-lg text-gray-800"
                    id="college"
                    name="college"
                    htmlFor="college"
                  >
                    College
                  </label>
                  <input
                    className="h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black px-2 py-2 nav_Box_shadow disabled:text-gray-500"
                    type="text"
                    placeholder="Enter college name"
                    required
                    title="Enter College Name"
                    name="college"
                    id="college"
                    value={college}
                    disabled
                    readOnly
                  />

                  <label
                    htmlFor="address"
                    id="address"
                    name="address"
                    className="text-lg  text-gray-800"
                  >
                    Address
                  </label>
                  <input
                    className="h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black px-2 py-2 nav_Box_shadow disabled:text-gray-500"
                    type="text"
                    placeholder="enter address"
                    required
                    title="Enter Address"
                    name="address"
                    id="address"
                    value={address}
                    disabled
                    readOnly
                  />

                  <div className="my-2 p-2 flex flex-col">
                    <span>
                      <div>
                        <input name="m" type="checkbox" />
                        <label
                          id="merch"
                          name="merch"
                          className="mx-2"
                          htmlFor="merch"
                        >
                          Merchandise (Rs. 400 per head)
                        </label>
                        <a
                          className="text-blue-600"
                          href="
                      https://drive.google.com/drive/folders/10gCHONSBR8QJoZ6D0tuIQ-MB_4aCEho0"
                          target="_blank"
                        >
                          click Here for more details
                        </a>
                      </div>
                    </span>
                    <span>
                      <input name="a" type="checkbox" />
                      <label className="mx-2" htmlFor="acc" id="acc" name="acc">
                        Accomodation and Fooding (Rs. 900 per head for 4 days)
                      </label>
                    </span>
                    <span>
                      <input name="e" type="checkbox" />
                      <label className="mx-2" htmlFor="edm" id="edm" name="edm">
                        EDM Night (Rs. 500 per head)
                      </label>
                    </span>
                  </div>

                  <br />

                  <label
                    className="text-2xl font-Default"
                    id="participants"
                    htmlFor="participants"
                    name="participants"
                  >
                    Participants Info
                  </label>
                  {customInputs?.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="container my-2 py-2">
                          <div className="input_container contact-form-shadow border-2 bg-primary shadow-md">
                            <input
                              name={item?.name_email}
                              type="email"
                              className="m-2 h-10 w-[95%] md:w-60 border border-black nav_Box_shadow bg-primary focus:outline-none focus:text-black px-2 py-2"
                              placeholder="Email"
                              defaultValue={
                                Object.keys(teamDataFromFirebase).length
                                  ? item?.email
                                  : ""
                              }
                            />
                            <input
                              name={item?.name_name}
                              type="text"
                              className="m-2 h-10 w-[95%] md:w-60 border border-black nav_Box_shadow bg-primary focus:outline-none focus:text-black px-2 py-2"
                              placeholder="Name"
                              defaultValue={
                                Object.keys(teamDataFromFirebase).length
                                  ? item?.name
                                  : ""
                              }
                            />
                            {!Object.keys(teamDataFromFirebase).length ? (
                              <button
                                className="w-full md:w-20 h-8 md:h-8 nav_Box_shadow text-md cursor-pointer font-bold transition duration-300 ease-in-out font-Default mt-4 bg-green-500 text-white"
                                onClick={(e) => handleAddDynamic(e, index)}
                              >
                                Add
                              </button>
                            ) : null}
                            {index > 0 &&
                            !Object.keys(teamDataFromFirebase).length ? (
                              <button
                                className="w-full md:w-20 h-8 md:h-8 nav_Box_shadow text-md cursor-pointer font-bold transition duration-300 ease-in-out font-Default mt-4 bg-red-500 text-white "
                                onClick={(e) => handleDeleteDynamic(e, index)}
                              >
                                Delete
                              </button>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {!Object.keys(teamDataFromFirebase).length ? (
                    <div className="m-8">
                      <button
                        className="w-full md:w-32 h-12 md:h-12 text-2xl cursor-pointer font-bold transition duration-300 ease-in-out font-Default nav_Box_shadow mt-10 text-center border-2 text-white bg-[#9360fa] border-white"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  ) : (
                    <div className="m-8">
                      <p className="text-lg md:text-2xl font-bold break-words">
                        You have been successfully registered for this event. If
                        you need to make any changes, please contact the event
                        administrator.
                      </p>
                      <Link to={"/contact"}>
                        <button className="w-full md:w-32 h-12 md:h-12 text-2xl cursor-pointer font-bold transition duration-300 ease-in-out font-Default nav_Box_shadow mt-10 text-center border-2 text-white bg-[#9360fa] border-white">
                          Contact Us
                        </button>
                      </Link>
                    </div>
                  )}
                </form>
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
      </div>
    </div>
  );
};

export default FormTeam;

FormTeam.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone_Number: PropTypes.string,
  college: PropTypes.string,
  address: PropTypes.string,
  gender: PropTypes.string,
  year: PropTypes.string,
  team_name: PropTypes.string,
};
