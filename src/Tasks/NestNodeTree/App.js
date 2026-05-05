import React, {useState } from "react";
import Tree from "./Tree";
const App = () => {
  const grocerious = [
    {
      id: "fruits",
      label: "Friuts",
      children: [
        { id: "apple", label: "Apple" },
        { id: "banana", label: "Banana" },
        {
          id: "citrus",
          label: "citrus",
          children: [
            { id: "orange", label: "Orange" },
            { id: "lemon", label: "Lemon" },
          ],
        },
      ],
    },
    {
      id: "vegatables",
      label: "Vegatables",
      children: [
        { id: "carrot", label: "Carrot" },
        { id: "Brocoli", label: "Brocoli" },
      ],
    },
  ];
  const[ state,setState]=useState([])
  return <div>
{
  grocerious.map((elem)=>(
   <Tree
   key={elem.id}
   node={elem}
   state={state}
   setState={setState}
   roots={grocerious}
   />
  ))
}
  </div>;
};

export default App;
