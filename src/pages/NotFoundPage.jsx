import { Link } from "react-router-dom";
import NotFoundImage from "../assets/404.jpg";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <img
        src={NotFoundImage}
        alt="Not Found"
        className="w-full max-w-md object-contain"
      />
      <h1 className="mt-6 text-3xl font-bold text-gray-800 md:text-5xl">
        Oops! Halaman Tidak Ditemukan
      </h1>
      <p className="mt-4 text-gray-600 text-base md:text-lg">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white text-sm md:text-base font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;
