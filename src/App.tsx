import { useEffect, useState } from "react";
import { users } from "./utils/generateMockData";
import ImageGrid from "./ImageGrid";

function App() {
  const [data, setData] = useState(users);
  return (
    <div className="flex justify-center items-center h-screen min-w-max overflow-auto gap-x-2">
      <ImageGrid users={data} setUsers={setData} />
    </div>
  );
}

export default App;
