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
  // http://localhost:3000/?initialPGN=1.%20e4%20e5&pgn=2.%20Nf3%20Nc6%203.%20Bb5%20a6%204.%20Ba4%20Nf6%205.%20O-O&initialFEN=rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR%20w%20KQkq%20-%200%202&orientation=black&title=Title&description=description

  // temporarry variables (read from url)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPGN = searchParams.get("initialPGN")
  const initialFEN = searchParams.get("initialFEN"); 
  const plannedPGN = searchParams.get("pgn");                         // It's good to convert it to array. 
  const orientation = searchParams.get("orientation");
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  // config for chess
  const [fen, setFen] = useState(initialFEN);
  let chess = new Chess(fen);
  const turnColor = chess.turn() === "w" ? "white" : "black";         // ??? I don't know how to set up chess.turn()

  // pgn
  const pgn = useRef(initialPGN);
  const ArrPlannedPGN = ConvertPGNtoArray(plannedPGN); 

  const [ind, setInd] = useState(0);

  // Very small function
  const isItPlannedMove = () => {
    return(getLastMove() === getPlannedMove());
  }

  const getLastMove = () => {
    var temp = chess.history();
    return temp[temp.length - 1];
  }

  const getPlannedMove = () => {
    return (ArrPlannedPGN[ind]);
  }

  const changePGN_forPrinting = () => {
    var temp = chess.history();
    pgn.current += temp[temp.length - 1] + " ";
  }
  //////////////////////////////////////////////

  const resetOfChess = () => {
    pgn.current = initialPGN;
    chess = new Chess(initialFEN);
    setFen(chess.fen);
    setInd(0);
  }

  const movable = (e) => {
    if (ind < ArrPlannedPGN.length){
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
    chess.move(ArrPlannedPGN[ind]);
    setFen(chess.fen());
    if (ind < ArrPlannedPGN.length){
      changePGN_forPrinting();
      setInd(ind + 1);
    }
  }

  useEffect(() => {
    pgnPrint('PGNp', { pgn: pgn.current, notationLayout: 'list' });
  })

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
        { ind === ArrPlannedPGN.length && <h1>Good Job!</h1> }
      </div>
    </div>
  );
}
