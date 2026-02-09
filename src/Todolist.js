import React,{useState} from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos,setTodos]=useState([])
  const [editIndex,setEditIndex]=useState(false)
  const [editText,setEditText]=useState('')
  const addTodo=()=>{
    if(todo.trim()=== '') return
    setTodos([...todos,{todo:todo}])
    setTodo('')
  }
  const deleteTodo=(index)=>{
    const filterTodos=todos.filter((_,id)=>id!==index)
    setTodos(filterTodos)
  }
  const editTodo=(index)=>{
    setEditIndex(index)
    setEditText(todos[index].todo)
  }
  const updateTodo=()=>{
const newTodos=[...todos]
newTodos[editIndex].todo=editText
setTodos(newTodos)
setEditIndex('')
setEditText('')
  }
  const cancelUpdate=()=>{
    setEditIndex('')
  }
  return (
    <div style={{textAlign:'center'}}>
      <input
        type="text"
        value={todo}
        placeholder="Add Todo"
        onChange={(e) => setTodo(e.target.value)}
        style={{padding:'8px',width:'20%', marginTop:'10px'}}
      />
      <button style={{padding:'9px',marginLeft:'6px'}} onClick={addTodo}>ADD</button>
      {
       todos.length==0 ?<p>No todos found</p> : todos.map((elem,index)=>{
          return(
            <div key={index}>
              {
               editIndex===index ?<>
                     <input
        type="text"
        value={editText}
        placeholder="Edit Todo"
        onChange={(e) => setEditText(e.target.value)}
        style={{padding:'8px',width:'15%', marginTop:'10px'}}
      />
      <button style={{padding:'9px',marginLeft:'6px'}} onClick={updateTodo}>Update</button>
      <button style={{padding:'9px',marginLeft:'6px'}} onClick={cancelUpdate}>cancel</button>
               </>: 
              <p>{elem.todo}<button onClick={()=>editTodo(index)}>edit</button><button onClick={()=>deleteTodo(index)}>Delete</button></p>

              }
            </div>
          )
        })
      }
    </div>
  );
};

export default App;
