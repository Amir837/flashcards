import { useState } from "react";
import Chessground from "react-chessground";
import "./chess.css";
import "./styles.css";
import "./theme.css";
import toDests from "./to-dests";
import { Chess } from "chess.js";

export default function Board() {
    const [fen, setFen] = useState(
        "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );

    const chess = new Chess(fen);
    const turnColor = chess.turn() === "w" ? "white" : "black";
  
    const handleMove = ( from, to ) => {
      console.log(from, to);
      console.log(chess.move({ from, to, promotion: "q" }));
      console.log(chess.fen());
      setFen(chess.fen());
    };

    return (
        <div className="justChessBoard">
          <div>
            <Chessground
              fen={fen}
              turnColor={turnColor}
              onMove={handleMove}
              movable={toDests(chess)}
            />
          </div>
        </div>
    );
}