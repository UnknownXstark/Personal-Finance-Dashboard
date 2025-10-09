import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-blue-500 text-white p-8 text-center">
        <h1 className="text-4xl font-bold">Hello, Tailwind v4!</h1>
      </div>
    </>
  );
}

export default App;
