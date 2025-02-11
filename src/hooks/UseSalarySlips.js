import { useState, useEffect } from "react";
import { salarySlipService } from "../services/slip.service";

export const useSalarySlips = () => {
  const [salarySlips, setSalarySlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSalarySlips = async () => {
    try {
      setLoading(true);
      const response = await salarySlipService.getSalarySlips();
      if (response.status) {
        setSalarySlips(response.data);
      } else {
        setError(response.message || "Failed to fetch salary slips");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalarySlips();
  }, []);

  const refetch = () => {
    fetchSalarySlips();
  };

  return {
    salarySlips,
    loading,
    error,
    refetch,
  };
};
