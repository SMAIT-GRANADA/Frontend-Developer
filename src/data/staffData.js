export const fetchStaffData = async () => {
  const staffData = [
    {
      id: 1,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC011238.webp?updatedAt=1737227693278",
    },
    {
      id: 2,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC288.webp?updatedAt=1737227692822",
    },
    {
      id: 3,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC0131900.webp?updatedAt=1737227690617",
    },
    {
      id: 4,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC0127134.webp?updatedAt=1737227687042",
    },
    {
      id: 5,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC012830.webp?updatedAt=1737227686998",
    },
    {
      id: 6,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC012031.webp?updatedAt=1737227686951",
    },
    {
      id: 7,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC012522.webp?updatedAt=1737227686912",
    },
    {
      id: 8,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC0124223.webp?updatedAt=1737227686871",
    },
    {
      id: 9,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC0121234.webp?updatedAt=1737227686787",
    },
    {
      id: 10,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC0112293.webp?updatedAt=1737227686707",
    },
    {
      id: 11,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC019231.webp?updatedAt=1737227686653",
    },
    {
      id: 12,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC013103.webp?updatedAt=1737227686671",
    },
    {
      id: 13,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC0112297.webp?updatedAt=1737227685346",
    },
    {
      id: 14,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC012.webp?updatedAt=1737226372561",
    },
    {
      id: 15,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC06.webp?updatedAt=1737226372541",
    },
    {
      id: 16,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC12.webp?updatedAt=1737226372158",
    },
    {
      id: 17,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DS1179.webp?updatedAt=1737226371944",
    },
    {
      id: 18,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC011.webp?updatedAt=1737226371931",
    },
    {
      id: 19,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC4.webp?updatedAt=1737226371900",
    },
    {
      id: 20,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC00.webp?updatedAt=1737226371667",
    },
    {
      id: 21,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DS204.webp?updatedAt=1737226371424",
    },
    {
      id: 22,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC01.webp?updatedAt=1737226368096",
    },
    {
      id: 23,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/D3.webp?updatedAt=1737226363412",
    },
    {
      id: 24,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC0122.webp?updatedAt=1737226363375",
    },
    {
      id: 25,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC01112.webp?updatedAt=1737226363479",
    },
    {
      id: 26,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC015.webp?updatedAt=1737226363477",
    },
    {
      id: 27,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC266.webp?updatedAt=1737226363274",
    },
    {
      id: 28,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC0206.webp?updatedAt=1737226363014",
    },
    {
      id: 29,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DS.webp?updatedAt=1737226362754",
    },
    {
      id: 30,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/12.webp?updatedAt=1737226362700",
    },
    {
      id: 31,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/1.webp?updatedAt=1737226362683",
    },
    {
      id: 32,
      name: "Wahyu",
      position: "Bimbingan Konseling",
      image:
        "https://ik.imagekit.io/wahyup/Foto%20Guru%20SMA%20IT%20Granada/DSC061.webp?updatedAt=1737226362586",
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 500));
  return staffData;
};
