import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

// Define the User type
type User = {
    id: string;
    email: string;
    created_at: string;
  };

export default async function AdminPage() {
  const supabase = createClient();

  // Fetch the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if no user is authenticated
  if (!user) {
    return redirect("/login");
  }
  
 

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

      <div className="flex flex-col items-center gap-4 mt-8">
        <h2 className="text-xl font-bold">Choose Employee Shipping Numbers Chart</h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Serv Reg Bonus Chart</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded">C&I Reg Bonus Chart</button>
        </div>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>Product of Utility Solutions Group</p>
      </footer>
    </div>
  );
}