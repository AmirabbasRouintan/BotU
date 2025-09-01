import { useState } from "react";

export default function TestTemplate() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Test Template</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}