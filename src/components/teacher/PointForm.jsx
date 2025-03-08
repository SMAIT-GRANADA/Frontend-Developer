import React from "react";
import { useForm } from "react-hook-form";

const PointForm = ({ onSubmit, initialData, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Student Name
        </label>
        <input
          type="text"
          placeholder="Enter student name"
          {...register("name", { required: "Student name is required" })}
          className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Class Name
        </label>
        <input
          type="text"
          placeholder="Enter class name"
          {...register("className", { required: "Class name is required" })}
          className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all"
        />
        {errors.className && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {errors.className.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Points
        </label>
        <div className="relative">
          <input
            type="number"
            placeholder="Enter points"
            {...register("points", {
              required: "Points are required",
              valueAsNumber: true,
            })}
            className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <span className="text-sm">pts</span>
          </div>
        </div>
        {errors.points && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {errors.points.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows="3"
          placeholder="Enter description"
          {...register("description", { required: "Description is required" })}
          className="mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all"
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default PointForm;
