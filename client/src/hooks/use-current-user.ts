import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data:user, isLoading, isError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const response = await api.get("/auth/current-user");
        return response?.data;
      } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
      }
    }
  });

  return {
    user,
    isLoading,
    isError,
  };
};
