import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchPoints,
  createPoint,
  updatePoint,
  deletePoint,
} from "../services/pointService";
import { toast } from "react-toastify";

export const usePoints = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const { data: points, isLoading } = useQuery("points", () => fetchPoints());

  const createMutation = useMutation(createPoint, {
    onSuccess: () => {
      queryClient.invalidateQueries("points");
      toast.success("Point berhasil ditambahkan");
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Gagal menambahkan point");
    },
  });

  const updateMutation = useMutation(updatePoint, {
    onSuccess: () => {
      queryClient.invalidateQueries("points");
      toast.success("Point berhasil diupdate");
      setIsModalOpen(false);
      setSelectedPoint(null);
    },
    onError: () => {
      toast.error("Gagal mengupdate point");
    },
  });

  const deleteMutation = useMutation(deletePoint, {
    onSuccess: () => {
      queryClient.invalidateQueries("points");
      toast.success("Point berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus point");
    },
  });

  const handleCreatePoint = useCallback(
    (data) => {
      createMutation.mutate(data);
    },
    [createMutation]
  );

  const handleUpdatePoint = useCallback(
    (id, data) => {
      updateMutation.mutate({ id, data });
    },
    [updateMutation]
  );

  const handleDeletePoint = useCallback(
    (id) => {
      if (window.confirm("Apakah anda yakin ingin menghapus point ini?")) {
        deleteMutation.mutate(id);
      }
    },
    [deleteMutation]
  );

  return {
    points,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    selectedPoint,
    setSelectedPoint,
    handleCreatePoint,
    handleUpdatePoint,
    handleDeletePoint,
  };
};
