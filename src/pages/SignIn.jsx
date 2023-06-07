import { FcGoogle } from "react-icons/fc";
import AppLogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../firebase";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="mx-auto flex flex-col gap-5 min-h-screen max-w-screen-sm items-center justify-center">
          <div className="flex items-center gap-4">
            <img
              src={AppLogo}
              alt="Code Review"
              draggable="false"
              className="w-16 h-16 object-contain"
            />

            <h1 className="text-primaryText font-bold tracking-tighter leading-3 select-none">
              <p className="text-2xl -mb-3">Code</p>
              <p className="text-3xl">Review</p>
            </h1>
          </div>

          <button
            className="h-14 w-full rounded-md bg-gradient-to-r from-accent via-button to-accent2 p-[2px]"
            onClick={() => {
              const result = signInWithGoogle();
              console.log(result);
              if (result) {
                navigate("/");
              }
            }}
          >
            <div className="flex h-full w-full items-center justify-center gap-2 bg-primary back px-4 py-1 rounded-md">
              <FcGoogle className="text-2xl" />
              <h1 className="text-xl text-primaryText">SignIn with Google</h1>
            </div>
          </button>

          <p className="text-primaryText">Save Your Reports By Signing In</p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
