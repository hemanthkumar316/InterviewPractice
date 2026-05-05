import React from "react";

const Tree = ({node, state, setState,roots,level=0 }) => {
const handleChange=(e)=>{
const newState={...state}
setState(newState)
toggleAll(node,e.target.checked,newState)
roots.forEach((root)=>updateParent(root,newState))
}
const toggleAll=(node,checked,state)=>{
state[node.id]=checked
node.children?.forEach(element => toggleAll(element,checked,state));
}
const updateParent=(node,state)=>{
if(!node.children) return state[node.id] || false
const values=node.children.map(child=>updateParent(child,state))
state[node.id]=values.every(x=>x===true)
return state[node.id]
}
  return (
    <div style={{ marginLeft:'20px'}}>
      <input
        type="checkbox"
        checked={state[node.id] || false}
        style={{ cursor: "pointer" }}
        onChange={handleChange}
      />
      {node.label}
      {node.children?.map((child)=>(
      <Tree
       key={child.id}
       node={child}
       state={state}
       setState={setState}
       roots={roots}
       level={level+1}
       />
      ))}
    </div>
  );
};

export default Tree;
