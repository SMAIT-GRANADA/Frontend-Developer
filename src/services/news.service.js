import axiosInstance from "../api/axiosInstance";

export const getNews = async (params) => {
  const response = await axiosInstance.get("news", { params });
  return response.data;
};

export const createNews = async (formData) => {
  const form = new FormData();
  form.append("title", formData.title);
  form.append("description", formData.description);
  if (formData.media) {
    form.append("media", formData.media);
  }

  const response = await axiosInstance.post("/news", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
