import React from "react";
import ParentTodo from "./Components/ParentTodo";
import { RecoilRoot } from "recoil";
function App() {
  return (
    <RecoilRoot>
      <ParentTodo />
    </RecoilRoot>
  );
}

export default App;
