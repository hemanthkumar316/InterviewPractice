import React, { useState } from "react";
import TreeNode from "./TreeNode";
//https://miro.medium.com/v2/1*iTvoo8q6e5DAKiDryrdiAw.gif
const data = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      { id: "apple", label: "Apple" },
      { id: "banana", label: "Banana" },
      {
        id: "citrus",
        label: "Citrus",
        children: [
          { id: "orange", label: "Orange" },
          { id: "lemon", label: "Lemon" }
        ]
      }
    ]
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      { id: "carrot", label: "Carrot" },
      { id: "broccoli", label: "Broccoli" }
    ]
  }
];

const App=()=> {
  const [state, setState] = useState([]);

  return (
    <div>
      <h2>Checkbox Tree</h2>

      {data.map(node => (
        <TreeNode
          key={node.id}
          node={node}
          state={state}
          setState={setState}
          roots={data}  // ✅ pass root nodes
        />
      ))}
    </div>
  );
}
export default  App