import React from "react";
import { useSalarySlips } from "../../hooks/UseSalarySlips";

const SalarySlipSection = () => {
  const { salarySlips, loading, error, refetch } = useSalarySlips();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }
  return (
    <div>
      <h2>Salary Slips</h2>
      <div className="grid gap-4">
        {salarySlips.map((slip) => (
          <div key={slip.id} className="p-4 border rounded-lg">
            <h3>Period: {new Date(slip.period).toLocaleDateString()}</h3>
            <p>Teacher: {slip.teacher.name}</p>
            <p>Uploaded by: {slip.admin.name}</p>
            <a
              href={slip.slipImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Slip
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalarySlipSection;
