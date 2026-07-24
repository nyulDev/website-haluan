import { db } from "@/lib/db";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true },
  });

  return <HomeClient categories={categories} />;
}
