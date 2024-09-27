const { useState, useEffect, createElement } = React;
  const { render } = ReactDOM;

  const TicTacToe = () => {
    let [board, setBoard] = useState(Array(9).fill(null));
    let [xIsNext, setXIsNext] = useState(true);
    let [moveTimeouts, setMoveTimeouts] = useState(Array(9).fill(null));
    let winner = calculateWinner(board);
    
    let [x, setX] = useState(0);
    let [o, setO] = useState(0);

    const handleClick = (index) => {
      const newBoard = board.slice();
      const newMoveTimeouts = moveTimeouts.slice();
    
      if ((newMoveTimeouts[index] !== null && newMoveTimeouts[index] >= 1)||winner) {
        return;   
    }

      if(board[index]){
        console.log(board[index],xIsNext)
        if(board[index] == (xIsNext? 'X':'O')){

          return
        }else{
        newBoard[index] = 'C'
        newMoveTimeouts[index] = 2;
        setBoard(newBoard);
      setXIsNext(!xIsNext);
      }}else{
      newBoard[index] = xIsNext ? 'X' : 'O';
      newMoveTimeouts[index] = 2;
      setBoard(newBoard);
      setXIsNext(!xIsNext);
      }
     const updatedTimeouts = newMoveTimeouts.map(timeout => (timeout !== null ? timeout - 1 : null));
    setMoveTimeouts(updatedTimeouts);
    };

    const renderSquare = (index) => {
      return createElement('div', {
        id:`block${index}`,
        onClick: () => handleClick(index),
      }, board[index] && createElement('img', { 
        src: board[index] == 'C' ? 'cross.png' : (board[index] == 'X' ? 'up.png' : 'right.png'), 
      })
      )}

      useEffect(() => {
        if (winner) {
          if (winner&&xIsNext) {
            setO(prevO => prevO + 1);
          } else{
            setX(prevX => prevX + 1);
          }
        }
      }, [winner]);

      const result = () =>{
          return createElement('h1',{className:"count"},`Player1 ${x} | ${o} Player2`) ;
      }
    
     const getStatus = () => {
      let win;
      if(winner){
        
        if(xIsNext){
           win = 'plaer2'
        }else{
          win = 'plaer1'
        }
        return (createElement('h1',{className:"pop"},
        `Winner: ${win}`,
        createElement('button',{id:'reset',onClick: () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);}},"Return")
        ));
      }
        
      
    };

    return createElement('div', 
  null,
  createElement('div', { className: 'count' }, result()),
  createElement('div', { className: 'status' }, getStatus()),
  createElement('div', { className: 'ttt' }, 
    renderSquare(1),
    renderSquare(2),
    renderSquare(3),
    renderSquare(4),
    renderSquare(5),
    renderSquare(6),
    renderSquare(7),
    renderSquare(8),
    renderSquare(9)
      )
    )
  };
  
    const calculateWinner = (squares) => {
    const lines = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      
      if ((squares[a] && squares[a] === squares[b] && squares[a] === squares[c])&&squares[a]=='C') {

        return squares[a];
      }
    }
    
    return null;
  };

  render(createElement(TicTacToe), document.getElementById('root'));