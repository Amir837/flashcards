import { useState, useRef, useEffect } from "react";
import Chessground from "react-chessground";
import "./chess.css";
import "./styles.css";
import "./theme.css";
import toDests from "./to-dests";
import { useSearchParams } from "react-router-dom";
import { Chess } from "chess.js";
import { pgnPrint } from '@mliebelt/pgn-viewer';
import ConvertPGNtoArray from "./ConvertPGNtoArray";

export default function App() {
  // Valid Link:
  // http://localhost:3000/flashcards/?pgn=1.%20e4%20e5%202.%20Nf3%20Nc6%203.%20Bb5%20a6%204.%20Ba4%20Nf6%205.%20O-O%20Be7%206.%20Re1%20b5%207.%20Bb3&move=3&turn=black&orientation=white&title=Closed%20Ruy%20Lopez&description=Black%20chose%20not%20to%20capture%20White%27s%20e-pawn%20on%20the%20previous%20move,%20but%20the%20threat%20still%20hangs%20over%20White%27s%20head.%20White%20typically%20removes%20it%20with
  
  // API: 
  // http://localhost:3000/flashcards/?
  // pgn=&
  // move=&
  // turn=&
  // orientation=&
  // title=&
  // description=

  // Set UP
  // URL:
  const [searchParams, setSearchParams] = useSearchParams();
  const plannedPGN = searchParams.get("pgn");
  const move = parseInt(searchParams.get("move"));
  const turn = searchParams.get("turn");
  const orientation = searchParams.get("orientation");
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  const ArrPlannedPGN = useRef([]);
  const initialPGN = useRef();
  const initialFEN = useRef(); 
  const point = useRef();
  
  const [fen, setFen] = useState();
  let chess = new Chess(fen);
  const turnColor = chess.turn() === "w" ? "white" : "black";

  const pgn = useRef();
  const [ind, setInd] = useState(-1);

  // Very small function
  const isItPlannedMove = () => {
    if (chess.in_check()){
      return(getLastMove() === getPlannedMove() + '+')
    }
    return(getLastMove() === getPlannedMove());
  }

  const getLastMove = () => {
    var temp = chess.history();
    return temp[temp.length - 1];
  }

  const getPlannedMove = () => {
    return (ArrPlannedPGN.current[ind]);
  }

  const changePGN_forPrinting = () => {
    var temp = chess.history();
    pgn.current += " " + temp[temp.length - 1];
  }
  //////////////////////////////////////////////

  const resetOfChess = () => {
    pgn.current = initialPGN.current;
    chess = new Chess(initialFEN.current);
    setFen(chess.fen);
    setInd(point.current);
  }

  const movable = (e) => {
    if (ind < ArrPlannedPGN.current.length){
      return(toDests(e));
    }
    else{
      const dests = new Map();
      const color = e.turn() === "w" ? "white" : "black";
    
      return {
        color, // who's turn is it
        dests, // what to move
        free: false
      };
    }
  }

  const handleMove = (from, to) => {
    chess.move({ from, to, promotion:'q'  });

    setFen(chess.fen());

    if (isItPlannedMove()){
      changePGN_forPrinting();
      setInd(ind + 1);
    }
    else {
      setTimeout(() => {
        chess.undo();
        setFen(chess.fen);
      }, 100)
    }
  };

  const handleHint = () => {
    chess.move(ArrPlannedPGN.current[ind]);
    setFen(chess.fen());
    if (ind < ArrPlannedPGN.current.length){
      changePGN_forPrinting();
      setInd(ind + 1);
    }
  }

  // const countRenders = useRef(0);
  useEffect(() => {
    pgnPrint('PGNp', { pgn: pgn.current, notationLayout: 'list' });

    // // counting Renders
    // countRenders.current++;
    // console.log(countRenders.current);
  });

  // executes only once at the end of first rendering 
  useEffect(() => {
    if (turn == "white"){
      point.current = (move - 1) * 2;
    }
    else {
      point.current = (move - 1) * 2 + 1; 
    }

    ArrPlannedPGN.current = ConvertPGNtoArray(plannedPGN);
    const tempChess = new Chess();

    for (let i = 0; i < point.current; i++){
      tempChess.move(ArrPlannedPGN.current[i]);
    }

    initialPGN.current = tempChess.history().join(' ');
    initialFEN.current = tempChess.fen();
    setFen(initialFEN.current);
    pgn.current = initialPGN.current;
    setInd(point.current);
  }, []);

  return (
    <div className="App">
      <h1 className = "chessOpening">{ title }</h1>

      <div className = "leftbox">
        <div className = "descriptionBlock">
          <h2>Description</h2>
          <p>{ description }</p>
        </div>
      </div> 
        
      <div className = "middlebox">
        <Chessground
          orientation = { orientation }
          fen={fen}
          turnColor={turnColor}
          onMove={handleMove}
          movable={movable(chess)}
        />
      </div>
        
      <div className = "rightbox">
        <div id = "PGNp" />
      </div>

      <button onClick={resetOfChess}>Do again</button>
      <button onClick={handleHint}>Hint</button>

      <div>
        { ind >= ArrPlannedPGN.current.length && <h1>Good Job!</h1> }
      </div>
    </div>
  );
}
