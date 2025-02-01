import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/supabase";
import { ArrowLeft, Heart } from "lucide-react";

const Likes = () => {
  // const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(() => {
    return localStorage.getItem("isLiked") === "true";
  });

  // const fetchLikes = async () => {
  //   const { data, error } = await supabase
  //     .from("likes")
  //     .select("count")
  //     .order("id", { ascending: true })
  //     .limit(1);

  //   if (error) {
  //     throw new Error(error.message);
  //   }

  //   return data?.[0];
  // };

  // const { data, error, isPending } = useQuery({
  //   queryKey: ["likes"],
  //   queryFn: fetchLikes,
  // });

  const incrementMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc("increment_likes", { row_id: 1 });
      if (error) {
        throw new Error(error.message);
      }
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["likes"] });
    // },
  });

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      localStorage.setItem("isLiked", "true");
    }
    incrementMutation.mutate();
  };

  return (
    <div className="flex items-center gap-3 px-3">
      {/* <p>Likes: {data.count}</p> */}
      <Heart
        className={`w-4 h-4 cursor-pointer transition-colors duration-200 stroke-red-500
          ${isLiked && "fill-red-500"}
          active:animate-long-ping`}
        onClick={handleLike}
      />
      <span className="text-xs flex items-center gap-1">
        <ArrowLeft className="h-3 w-3" />
        Click if you like the project
      </span>
    </div>
  );
};

export default Likes;
