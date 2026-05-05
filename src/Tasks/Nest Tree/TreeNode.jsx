import React,{useState} from "react";

const TreeNode=({ node, state, setState, roots, level = 0 })=> {
  const [expanded, setExpanded] = useState(true);

  const handleCheck = (e) => {
    const newState = { ...state };
    toggleAll(node, e.target.checked, newState);
    roots.forEach(root => updateParent(root, newState));
    setState(newState);
  };

  const toggleAll=(node, checked, state)=> {
    state[node.id] = checked;
    node.children?.forEach(child => toggleAll(child, checked, state));
  }

  const updateParent=(node, state) =>{
    if (!node.children) return state[node.id] || false;

    const values = node.children.map(child =>
      updateParent(child, state)
    );

    state[node.id] = values.every(v => v === true);
    return state[node.id];
  }

  return (
    <div style={{ marginLeft: level * 20 }}> {/* ✅ FIX */}
      
  <span style={{ display: "inline-block", width: 20 }}>
  {node.children ? (
    <span onClick={() => setExpanded(!expanded)} style={{cursor:'pointer'}}>
      {expanded ? "▼" : "▶"}
    </span>
  ) : null}
</span>

      <input
        type="checkbox"
        checked={state[node.id] || false}
        onChange={handleCheck}
        style={{cursor:"pointer"}}
      />


      {node.label}

      {expanded &&
        node.children?.map(child => (
          <TreeNode
            key={child.id}
            node={child}
            state={state}
            setState={setState}
            roots={roots}
            level={level + 1}   // ✅ IMPORTANT
          />
        ))}
    </div>
  );
}
export default TreeNode