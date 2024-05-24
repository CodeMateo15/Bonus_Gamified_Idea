import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = createClient();

  // Fetch the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if no user is authenticated
  if (!user) {
    return redirect("/login");
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <div className="py-6 font-bold bg-cyan-950 text-center text-white">
          This is the admin page
        </div>
        <nav className="w-full font-bold flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            Utility Solutions Group
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-xl font-semibold mb-4">Choose Employee Shipping Numbers Chart</h1>
        <div className="flex gap-4">
          <Link href="/C&I_chart">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go to C&I Chart
            </button>
          </Link>
          <Link href="/serv_reg_chart">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Go to Serv Reg Chart
            </button>
          </Link>
        </div>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>Product of Utility Solutions Group</p>
      </footer>
    </div>
  );
}
