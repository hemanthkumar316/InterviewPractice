import React, { useState } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn,setXTurn]=useState(true)
  const handleClick=(index)=>{
    if(board[index]) return;
    const newBoard=[...board]
newBoard[index]=xTurn ? 'X' :'O'
setBoard(newBoard)
setXTurn(!xTurn)

  }
  const handleReset=()=>{
    setBoard(Array(9).fill(null))
    setXTurn(true)
  }
  const checkWinner=(arr)=>{
    const winnerPatterns=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
    ]

  }
  const winner=checkWinner(board)

  console.log("board", board);
  return (
    <>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 100px)",
        gap: "10px",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {board.map((value,index) => {
        return (
          <div key={index}>
            <button
              style={{
                width: "100px",
                height: "100px",
                fontSize: "30px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={()=>handleClick(index)}
            >
              {value}
            </button>
          </div>
        );
      })}
    <button  style={{width:'100px',height:'30px',cursor:'pointer'}} onClick={handleReset}>Reset</button>

    </div>
    </>
  );
};

export default App;
