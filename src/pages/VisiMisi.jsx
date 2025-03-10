import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import bgVisiMisi from "../assets/bg-visimisi.webp";

const VisiMisi = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [pageFlipping, setPageFlipping] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const roleRoutes = {
    siswa: "/student",
    guru: "/teacher",
    admin: "/admin",
    superadmin: "/superadmin",
    ortu: "/parent",
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded.roles[0]?.toLowerCase();

        if (userRole && roleRoutes[userRole]) {
          navigate(roleRoutes[userRole], { replace: true });
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        Cookies.remove("accessToken", { path: "/" });
      }
    }
  }, [navigate]);

  const flipPage = (direction) => {
    setPageFlipping(true);
    setTimeout(() => {
      if (direction === "next" && currentPage < 2) {
        setCurrentPage(currentPage + 1);
      } else if (direction === "prev" && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
      setPageFlipping(false);
    }, 300);
  };

  const openBook = () => {
    setIsOpen(true);
  };

  const pageContent = [
    // Page 0 - Cover and Visi
    <>
      <div className="left-page">
        <div className="book-cover-content">
          <h1 className="text-3xl font-bold mb-4 text-center">VISI DAN MISI</h1>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-1 bg-green-700"></div>
          </div>
          <p className="text-lg font-serif text-center italic">SMAIT Granada</p>
        </div>
      </div>
      <div className="right-page">
        <div className="page-content">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Visi</h2>
          <p className="text-lg italic mb-6">
            "Mewujudkan generasi yang sholeh, berilmu, dan memimpin."
          </p>
          <p>
            Untuk mencapai visi tersebut, SMAIT Granada menjalankan
            program-program unggulan seperti Tahfidz, Arabic Camp, dan BPI untuk
            pembentukan karakter dan cinta Al-Quran.
          </p>
          <div className="page-number">1</div>
        </div>
      </div>
    </>,
    // Page 1 - Misi
    <>
      <div className="left-page">
        <div className="page-content">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Misi</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              Melahirkan Generasi yang Berakidah Lurus dan Beribadah dengan
              Benar
            </li>
            <li>
              Melahirkan Generasi yang Cerdas, Terampil dan Berjiwa Pemimpin
            </li>
            <li>
              Mewujudkan Lingkungan Belajar yang Ilmiah dengan Pembinaan Akhlak
              Secara Intensif
            </li>
            <li>
              Memberikan Pelayanan Pendidikan Terbaik kepada Siswa dan Orangtua
            </li>
            <li>
              Membangun Kepercayaan & Kemitraan dengan Orangtua, Masyarakat dan
              Pemerintah
            </li>
          </ol>
          <div className="page-number">2</div>
        </div>
      </div>
      <div className="right-page">
        <div className="page-content">
          <h2 className="text-2xl font-bold mb-6 text-green-700">
            7 Karakter Pelajar SMA IT Granada
          </h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>Akidah yang bersih</li>
            <li>Ibadah yang benar</li>
            <li>Kepribadian yang matang dan berakhlak mulia</li>
            <li>
              Pribadi yang sungguh-sungguh, disiplin, dan mampu menahan nafsunya
            </li>
          </ol>
          <div className="page-number">3</div>
        </div>
      </div>
    </>,
    // Page 2 - Karakter continued
    <>
      <div className="left-page">
        <div className="page-content">
          <h2 className="text-2xl font-bold mb-6 text-green-700">
            7 Karakter Pelajar SMA IT Granada (Lanjutan)
          </h2>
          <ol className="list-decimal list-inside space-y-3" start="5">
            <li>Mampu membaca, menghafal, dan memahami Al-Quran</li>
            <li>Berwawasan luas</li>
            <li>
              Memiliki keterampilan hidup (kesehatan dan kebugaran, life skill,
              berwirausaha, dan pengembangan diri)
            </li>
          </ol>
          <div className="mt-10 p-4 border-l-4 border-green-700 bg-green-50">
            <p className="italic text-green-800">
              "Membentuk generasi berakhlak mulia, cerdas, dan siap menghadapi
              tantangan masa depan."
            </p>
          </div>
          <div className="page-number">4</div>
        </div>
      </div>
      <div className="right-page">
        <div className="page-content flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-green-700">
              SMAIT Granada
            </h3>
            <p className="italic mb-4">Mewujudkan Pendidikan Berkualitas</p>
            <div className="flex justify-center">
              <div className="w-16 h-1 bg-green-700 mb-4"></div>
            </div>
            <p className="text-sm">© 2025 SMAIT Granada</p>
          </div>
          <div className="page-number">5</div>
        </div>
      </div>
    </>,
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen py-44">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgVisiMisi})` }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />

        <div className="relative z-10 container mx-auto px-4">
          {!isOpen ? (
            <div className="book-closed mx-auto" onClick={openBook}>
              <div className="book-spine"></div>
              <div className="book-cover">
                <h1 className="text-2xl font-bold text-center text-white">
                  VISI DAN MISI
                </h1>
                <p className="text-center text-white mt-2">SMAIT Granada</p>
                <p className="text-center text-white mt-4 text-sm">
                  Klik untuk membuka
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`book-open mx-auto ${
                pageFlipping ? "page-flipping" : ""
              }`}
            >
              <div className="book-pages">{pageContent[currentPage]}</div>

              <div className="book-navigation">
                <button
                  onClick={() => flipPage("prev")}
                  disabled={currentPage === 0}
                  className={`prev-btn ${
                    currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  ◄
                </button>
                <span className="page-indicator">
                  {currentPage + 1} / {pageContent.length}
                </span>
                <button
                  onClick={() => flipPage("next")}
                  disabled={currentPage === pageContent.length - 1}
                  className={`next-btn ${
                    currentPage === pageContent.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  ►
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .book-closed {
          width: 300px;
          height: 400px;
          background-color: #2d6a4f;
          border-radius: 8px 16px 16px 8px;
          box-shadow: -10px 10px 30px rgba(0, 0, 0, 0.7), -2px 0 0 #1b4332,
            -5px 0 10px rgba(0, 0, 0, 0.2);
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .book-closed:hover {
          transform: translateY(-5px);
          box-shadow: -10px 15px 30px rgba(0, 0, 0, 0.7), -2px 0 0 #1b4332,
            -5px 0 10px rgba(0, 0, 0, 0.2);
        }

        .book-spine {
          position: absolute;
          left: 0;
          top: 0;
          width: 20px;
          height: 100%;
          background-color: #1b4332;
          border-radius: 3px 0 0 3px;
        }

        .book-open {
          width: 800px;
          max-width: 95%;
          height: 500px;
          position: relative;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .book-pages {
          display: flex;
          width: 100%;
          height: 100%;
          background-color: #fff;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2),
            inset 0 0 0 2px rgba(0, 0, 0, 0.1);
        }

        .left-page,
        .right-page {
          flex: 1;
          padding: 30px;
          position: relative;
          background-color: #f8f5e6;
          overflow: auto;
        }

        .left-page {
          border-right: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: inset -10px 0 20px -10px rgba(0, 0, 0, 0.1),
            inset -1px 0 0 rgba(0, 0, 0, 0.05);
        }

        .right-page {
          box-shadow: inset 10px 0 20px -10px rgba(0, 0, 0, 0.1),
            inset 1px 0 0 rgba(0, 0, 0, 0.05);
        }

        .page-content {
          position: relative;
          height: 100%;
          padding-bottom: 40px;
        }

        .book-cover-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          background-color: #d4e6c3;
          border: 8px solid #2d6a4f;
          padding: 20px;
          border-radius: 4px;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .page-number {
          position: absolute;
          bottom: 10px;
          right: 10px;
          font-size: 14px;
          color: #888;
          font-style: italic;
        }

        .book-navigation {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          gap: 20px;
        }

        .prev-btn,
        .next-btn {
          background-color: #2d6a4f;
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .prev-btn:hover,
        .next-btn:hover {
          background-color: #1b4332;
          transform: scale(1.1);
        }

        .page-indicator {
          font-size: 14px;
          color: white;
          background-color: rgba(0, 0, 0, 0.6);
          padding: 4px 12px;
          border-radius: 12px;
        }

        .page-flipping .left-page,
        .page-flipping .right-page {
          opacity: 0.5;
          transform: scale(0.98);
        }

        @media (max-width: 768px) {
          .book-open {
            max-width: 100%;
            height: auto;
          }

          .book-pages {
            flex-direction: column;
            height: auto;
          }

          .left-page,
          .right-page {
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>

      <Footer />
    </>
  );
};

export default VisiMisi;
