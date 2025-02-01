import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/supabase";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Likes = () => {
  const queryClient = useQueryClient();

  const fetchLikes = async () => {
    const { data, error } = await supabase
      .from("likes")
      .select("count")
      .order("id", { ascending: true })
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }
    console.log({ data, error });
    return data?.[0];
  };

  // useQuery to load likes count
  const { data, error, isPending } = useQuery({
    queryKey: ["likes"],
    queryFn: fetchLikes,
  });

  // Mutation to increment the likes count via RPC
  const incrementMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc("increment_likes", { row_id: 1 });
      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="flex flex-col items-center gap-2">
      <p>Likes: {data.count}</p>
      <Button
        onClick={() => {
          incrementMutation.mutate();
        }}
        disabled={incrementMutation.isPending}
        variant="ghost"
        size="icon"
      >
        <Heart className="w-4 h-4 active:animate-ping" />
      </Button>
    </div>
  );
};

export default Likes;
