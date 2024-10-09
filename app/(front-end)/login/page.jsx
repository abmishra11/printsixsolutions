import LoginForm from "@/components/frontend/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container py-16">
        <div className="max-w-lg mx-auto rounded-lg shadow-2xl p-10 bg-gray-800 border-gray-700 overflow-hidden">
          <h2 className="text-2xl font-medium mb-1">Login</h2>
          <p className="text-white mb-6 text-sm">
            Login if you are a returning customer
          </p>
          <LoginForm />
          {/* <div className="flex justify-center relative mt-6">
            <div className="text-white uppercase px-3 bg-primary z-10 relative">
              Or login with
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
          </div>
          <div className="flex mt-4 gap-4">
            <Link
              href="#"
              className="w-1/2 p-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="w-1/2 p-2 text-center text-white bg-yellow-600 rounded uppercase font-roboto font-medium text-sm hover:bg-yellow-500"
            >
              Google
            </Link>
          </div> */}
          <p className="mt-4 text-white">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="text-primary">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
