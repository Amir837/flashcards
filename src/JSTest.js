import { useSearchParams } from "react-router-dom";
import { Chess } from "chess.js";
import ConvertPGNtoArray from "./ConvertPGNtoArray";
import { useState } from "react";

export default function JSTest() {
    // some Action 
    console.log("I am here");
    // for action 
    for (let i = 0; i < 3; i++){
        console.log("Loop");
    }

    // variables
    // searchParams
    const [searchParams, setSearchParams] = useSearchParams();
    // const
    let temp = searchParams.get("point");
    let point; 
    if (temp != null){
        point = parseInt(temp);
    }
    const str = searchParams.get("str");


    const pgn = searchParams.get("pgn");
    let ArrPlannedPGN;
    let k;
    if (pgn != null){
        ArrPlannedPGN = ConvertPGNtoArray(pgn);
        k = ArrPlannedPGN.length;
    }

    const chess = new Chess();
    if (k != null && ArrPlannedPGN != null){
        for (let i = 0; i < k; i++){
            chess.move(String(ArrPlannedPGN[i]));
        }
    }

    var history = chess.history();

    return (NextTest(str, point, history, ArrPlannedPGN));
}

function NextTest(str, point, history, ArrPlannedPGN) {
    const handleClick = () => {
        console.log("Click");
        setJ(j + 1);
    }
    
    const [j, setJ] = useState(0);

    console.log("And I am there");
    
    return (
        <div>
            <h1>{ str }</h1>
            <h1>{ point }</h1>
            <h1>{ history }</h1>
            <h1>{ ArrPlannedPGN }</h1>
            <h1>Amount of Clicks { j }</h1>
            <button onClick = { handleClick }>Click</button> 
        </div>
        
    );
}