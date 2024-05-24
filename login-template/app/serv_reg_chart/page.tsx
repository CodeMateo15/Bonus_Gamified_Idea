import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import dynamic from 'next/dynamic';
// Import EditableTable dynamically
const EditableTable = dynamic(() => import('@/components/editableTable'), {
  ssr: false, // Disable server-side rendering
});

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
      {/* Adjust the width as needed */}
      <h1 className="text-xl font-semibold">Serv Reg Chart - Editable</h1>
      <div style={{ width: '1300px' }}>
        <EditableTable />
      </div>
      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>Product of Utility Solutions Group</p>
      </footer>
    </div>
  );
}
