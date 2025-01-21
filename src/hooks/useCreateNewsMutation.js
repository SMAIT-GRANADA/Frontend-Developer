import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNews } from "../services/news.service";
import Swal from "sweetalert2";

export const useCreateNewsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      Swal.fire({
        title: "Success!",
        text: "News has been successfully created",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to create news",
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });
};
