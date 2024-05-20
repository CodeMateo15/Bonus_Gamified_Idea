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
    is_admin: boolean;
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

  // Fetch all authenticated users
  const { data: users, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return (
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="py-6 font-bold bg-red-600 text-center text-white">
          Error fetching users: {error.message}
        </div>
      </div>
    );
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

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <h2 className="font-bold text-4xl mb-4">Authenticated Users</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user: User)=> (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
         </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>Product of Utility Solutions Group</p>
      </footer>
    </div>
  );
}
