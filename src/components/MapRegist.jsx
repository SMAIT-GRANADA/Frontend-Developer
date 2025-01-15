const MapRegist = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="relative">
        <div className="rounded-xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.690946704103!2d117.12340047447843!3d-0.45782763528076503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df6788b55b00001%3A0x33b395eceeee2d85!2sSma%20Islam%20Terpadu%20Granada!5e0!3m2!1sen!2sid!4v1736960919284!5m2!1sen!2sid"
            className="w-full h-[550px] md:h-[650px]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full bg-[#F3F9F1] bg-opacity-95 p-8 max-w-3xl rounded-xl">
          <h2 className="text-center text-2xl font-medium mb-4">
            Lokasi Sekolah
          </h2>
          <p className="text-center text-gray-700">
            Jl. HM Ardan KM 03, Kel. Bukit Pinang Kec. Samarinda Ulu, Kota
            Samarinda, Kalimantan Timur 75124 Indonesia
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapRegist;
