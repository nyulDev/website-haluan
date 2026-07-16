import { db } from "@/lib/db";
import { UserManagement } from "@/components/UserManagement";

export default async function UsersPage() {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <UserManagement users={users} />;
}
