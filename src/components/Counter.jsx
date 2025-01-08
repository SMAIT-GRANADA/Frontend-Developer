import { useCounterStore } from "../store/counterStore";

const Counter = () => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div className="p-4 border rounded shadow-md text-center">
      <h1 className="text-xl font-bold">Counter</h1>
      <p className="text-lg">Count: {count}</p>
      <div className="mt-4 space-x-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={increment}
        >
          Increment
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={decrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default Counter;
