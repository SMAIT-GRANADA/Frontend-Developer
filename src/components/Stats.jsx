import { useState, useEffect } from "react";
import graduates from "../assets/lulusan.svg";
import student from "../assets/siswa.svg";
import teacher from "../assets/guru.svg";
import extracurricular from "../assets/ekskul.svg";

const StatsCard = ({ icon, label, value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 500;
    const steps = 50;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center p-4 mx-2">
      <div className="mb-2">
        <img src={icon} alt={`${label} icon`} className="w-12 h-12" />
      </div>
      <div className="text-green-600 text-2xl font-bold mb-1">{count}+</div>
      <div className="text-green-600 text-lg">{label}</div>
    </div>
  );
};

export default function Stats() {
  const stats = [
    {
      icon: graduates,
      label: "Lulusan",
      value: 2000,
    },
    {
      icon: teacher,
      label: "Guru",
      value: 2000,
    },
    {
      icon: student,
      label: "Siswa",
      value: 2000,
    },
    {
      icon: extracurricular,
      label: "Ekstrakurikuler",
      value: 2000,
    },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-48 py-16">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
}
