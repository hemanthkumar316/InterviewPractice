import React,{useState} from 'react'

const Circles = (props) => {
 const [isGray, setIsGray] = useState(false);

  function handleClick() {
    setIsGray(!isGray);
    props.onCircleClick(!isGray);
  }

  const circleStyle = {
    backgroundColor: isGray ? 'grey' : 'red',
    borderRadius: '60%',
    width: '100px',
    height: '100px',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };
  return (
   <div style={circleStyle} onClick={handleClick}></div>
  )
}

export default Circles