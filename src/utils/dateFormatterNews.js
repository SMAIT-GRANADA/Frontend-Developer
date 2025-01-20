export const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formatted = new Date(date).toLocaleDateString("id-ID", options);
  const [day, month, year] = formatted.split(" ");
  return `${month} ${day}, ${year}`;
};
