import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="mx-auto flex min-h-screen max-w-screen-sm items-center justify-center">
          <div className="h-14 w-full rounded-md bg-gradient-to-r from-accent via-button to-accent2 p-[2px]">
            <div className="flex h-full w-full items-center justify-center gap-2 bg-primary back px-4 py-1 rounded-md">
              <FcGoogle className="text-2xl" />
              <h1 className="text-xl text-primaryText">SignIn with Google</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
