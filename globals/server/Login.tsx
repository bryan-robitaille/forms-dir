import { signIn } from "@/auth";

export const Login = ({ language = "en" }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("gcAccount", { redirectTo: `/${language}` });
      }}
    >
      <button
        className="border-gcds-blue-800 bg-gcds-blue-900 text-white-default hover:border-gcds-blue-800 hover:bg-gcds-blue-800 hover:text-white-default active:border-black"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
};
