import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const Account = () => {
  const navigate = useNavigate();

  const LogoutUser = () => {
    signOut(auth);
    localStorage.removeItem("authUser");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-white font-Default text-2xl mb-4 md:mb-8">
        Account
      </div>
      <div className="text-white font-Default text-lg md:text-2xl mb-4 md:mb-8 px-4 break-words text-center">
        Sign in as <span>{auth?.currentUser?.email}</span>
      </div>
      <button
        className="text-white bg-[#9360FA] hover:bg-[#9360FA]/80 border border-white nav_Box_shadow h-10 font-Default w-2/3 md:w-1/3 text-center"
        type="button"
        onClick={LogoutUser}
      >
        Logout
      </button>
    </div>
  );
};

export default Account;
