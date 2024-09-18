import RegisterForm from "@/components/frontend/RegisterForm";

export default function Register() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container py-16">
        <div className="max-w-lg mx-auto rounded-lg shadow-2xl p-10 bg-gray-800 border-gray-700 overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">CREATE AN ACCOUNT</h2>
          <p className="text-white mb-6 text-sm">Register here if you don&apos;t have an account</p>
          <RegisterForm role={"USER"} />
        </div>
      </div>
    </section>
  );
}
