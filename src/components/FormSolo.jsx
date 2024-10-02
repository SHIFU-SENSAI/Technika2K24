import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
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
import { ToastContainer, toast } from "react-toastify";

const FormSolo = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [event_Data, setEvent_Data] = useState([]);
  const [soloData, setSoloData] = useState({});
  const url = new URL(window?.location?.href);
  const eventId = url.searchParams.get("id");
  const r_id = uuid.v4(10);
  const [formEdit, setFormEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);
  const fetchData = async () => {
    const eventQuery = doc(db, "events", eventId);

    const docSnap = await getDoc(eventQuery);

    if (docSnap.exists()) {
      setEvent_Data(docSnap?.data());
    }
  };

  // console.log(data);
  const fetchSoloData = async () => {
    if (event_Data?.event_title) {
      const q = query(
        collection(db, "solo_form"),
        where("event_name", "==", event_Data?.event_title),
        where("email", "==", auth?.currentUser?.email)
      );

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setSoloData(doc.data());
          setFormEdit(true);
        });
      });
    }
  };

  // console.log("soloData", soloData);
  const fetchUserData = async () => {
    const uidFromLocal = JSON.parse(localStorage.getItem("authUser")).uid;
    const uid = auth?.currentUser?.uid;
    const userDataQuery = doc(db, "registered_users", uidFromLocal || uid);
    const userSnap = await getDoc(userDataQuery);
    if (userSnap.exists()) {
      setUserData(userSnap?.data());
    }
  };
  // console.log(userData);
  useEffect(() => {
    fetchData();
  }, [eventId]);

  useEffect(() => {
    fetchUserData();
    fetchSoloData();
  }, [auth?.currentUser?.uid, event_Data]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(formRef.current);
    const formObj = Object.fromEntries(formData.entries());
    const { phone_Number, team_name, e, a, m } = formObj;

    const { name, email, college, address, gender, year } = userData;

    // console.log(formObj);
    try {
      const id = formEdit ? soloData?.regId : r_id;
      const soloFormDetails = doc(db, "solo_form", id);
      await setDoc(soloFormDetails, {
        name: name,
        email: email?.toLowerCase(),
        phone_Number: phone_Number,
        college: college,
        address: address?.toLowerCase(),
        gender: gender,
        year: year,
        team_name: team_name,
        edm: e === "on" ? "checked" : "null",
        merch: m === "on" ? "checked" : "null",
        accommodation: a === "on" ? "checked" : "null",
        dateCreated: new Date(),
        regId: id,
        event_name: event_Data?.event_title,
      });

      toast.success("Form submitted successfully!");
      toast.info(
        `Please note your registration number : ${id}, We will contact you shortly about your registration and payment. Contact : +91 9983334549 for any queries`
      );
    } catch (err) {
      toast.error("Something went wrong! Please try again.");
      console.log("error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative z-10">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-white text-center py-5 my-5">
          Registration
        </h1>
        <div className="w-[95%] md:max-w-4xl mx-auto bg-primary p-5 border-4 border-black contact-form-shadow">
          <div className="border rounded p-4">
            <div className="font-Default">
              <div className="flex flex-col gap-2 font-Default text-lg my-2 mb-5">
                <div>
                  <label
                    htmlFor="title"
                    name="title"
                    className="text-lg font-bold text-gray-800"
                  >
                    Confirm submission for {event_Data.event_title}
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="venue"
                    name="venue"
                    className="text-md font-semibold text-gray-700"
                  >
                    Venue: {event_Data.event_venue}
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="time"
                    name="time"
                    className="text-md font-semibold text-gray-700"
                  >
                    Time: {event_Data.event_date}
                  </label>
                </div>
              </div>
              <div>
                <form
                  action="#"
                  className="flex flex-col gap-1 font-Default text-lg lowercase "
                  onSubmit={handleSubmit}
                  ref={formRef}
                >
                  <label
                    htmlFor="name"
                    name="name"
                    className="text-lg text-gray-800"
                  >
                    Name
                  </label>
                  <input
                    className="w-100 md:w-160 h-10 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow  disabled:text-gray-500"
                    type="text"
                    placeholder="full name "
                    name="name"
                    minLength={3}
                    maxLength={100}
                    required
                    title="Enter Your name"
                    autoComplete="off"
                    id="name"
                    disabled
                    value={userData?.name || ""}
                  />
                  <label htmlFor="team_name">Team Name</label>
                  <input
                    className="w-100 md:w-160 h-10 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                    type="text"
                    placeholder="enter team name"
                    name="team_name"
                    minLength={3}
                    maxLength={100}
                    required
                    title="Enter Your Team name"
                    autoComplete="on"
                    id="team_name"
                    defaultValue={soloData?.team_name || ""}
                  />
                  <label htmlFor="email">Email</label>
                  <input
                    className=" h-10 w-100 md:w-160 border border-black  bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow disabled:text-gray-500"
                    type="email"
                    placeholder="enter email"
                    required={true}
                    title="Enter Email"
                    name="email"
                    autoComplete="off"
                    id="email"
                    value={userData?.email || ""}
                    disabled
                  />
                  <label htmlFor="phone_Number">Phone Number</label>
                  <input
                    className=" h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow"
                    type="tel"
                    placeholder="enter phone number"
                    required
                    title="Enter Phone Number"
                    name="phone_Number"
                    autoComplete="off"
                    id="phone_Number"
                    defaultValue={userData?.phone_Number || ""}
                  />
                  <label htmlFor="gender">gender</label>
                  <select
                    value={userData?.gender || ""}
                    disabled
                    name="gender"
                    className=" h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow disabled:text-gray-500"
                    required
                  >
                    <option value="none">select gender</option>
                    <option value="male">male</option>

                    <option value="female">female</option>

                    <option value="others">others/not specified</option>
                  </select>
                  <label htmlFor="year">year</label>
                  <select
                    value={userData?.year || ""}
                    name="year"
                    className=" h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow  disabled:text-gray-500"
                    required
                    disabled
                  >
                    <option value="none">select year</option>
                    <option value="first">1st</option>

                    <option value="second">2nd</option>

                    <option value="third">3rd</option>

                    <option value="fourth">4th</option>
                  </select>
                  <label htmlFor="college">college</label>
                  <input
                    value={userData?.college || ""}
                    className=" h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow disabled:text-gray-500"
                    disabled
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
                    className=" h-10 w-100 md:w-160 border border-black bg-primary focus:outline-none focus:text-black  px-2 py-2 nav_Box_shadow disabled:text-gray-500"
                    type="text"
                    placeholder="enter address"
                    required
                    title="Enter Address"
                    name="address"
                    autoComplete="off"
                    id="address"
                    value={userData?.address || ""}
                    disabled
                  />

                  <div className="my-2 p-2 flex flex-col">
                    <div>
                      <input name="m" type="checkbox" />
                      <label className="mx-2" htmlFor="merch">
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
                    <span>
                      <input name="a" type="checkbox" />
                      <label className="mx-2" htmlFor="acc">
                        Accommodation and Fooding (Rs. 900 per head for 4 days)
                      </label>
                    </span>
                    <span>
                      <input name="e" type="checkbox" />

                      <label className="mx-2" htmlFor="edm">
                        EDM Night (Rs. 500 per head)
                      </label>
                    </span>
                  </div>

                  <div>
                    <button
                      className={`w-32 h-12 md:w-40 md:h-12 text-2xl cursor-pointer font-bold transition duration-300 ease-in-out font-Default nav_Box_shadow mt-10 text-center border-2 bg-[#9360fa]  border-white`}
                      type="submit"
                      disabled={loading}
                    >
                      {formEdit || loading
                        ? formEdit
                          ? "Update"
                          : "submitting..."
                        : "submit"}
                    </button>
                  </div>
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

export default FormSolo;
