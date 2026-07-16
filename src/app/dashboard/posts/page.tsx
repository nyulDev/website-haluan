import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Posts</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Post
        </Button>
      </div>
      <div className="bg-white rounded-md border p-8 text-center text-slate-500">
        <p>Posts management will be implemented here.</p>
      </div>
    </div>
  );
}
