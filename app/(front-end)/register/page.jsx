import RegisterForm from "@/components/frontend/RegisterForm";

export default function Register() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container py-16">
        <div className="max-w-lg mx-auto rounded-lg shadow-2xl p-10 bg-gray-800 border-gray-700 overflow-hidden">
          <h2 className="text-2xl font-medium mb-1 text-center">
            Create an Account
          </h2>
          <RegisterForm role={"USER"} />
        </div>
      </div>
    </section>
  );
}
