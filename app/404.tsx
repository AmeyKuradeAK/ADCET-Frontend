// app/404.tsx (for App Router in Next.js 13)
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    // Optionally, you can redirect to a login page if the user tries to access a non-existent page.
    setTimeout(() => {
      router.push("http://localhost:5000/login");
    }, 3000); // Redirect after a few seconds

  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">404 - Page Not Found</h2>
        <p>It seems you are not logged in. You will be redirected to the login page.</p>
      </div>
    </div>
  );
};

export default NotFound;
