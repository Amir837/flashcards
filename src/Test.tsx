import { useSearchParams } from "react-router-dom";
import { Chess } from "chess.js";
import ConvertPGNtoArray from "./ConvertPGNtoArray";
import useSound from 'use-sound';

const berserk = require("./Sound/berserk.mp3");

export default function Test() {
    console.log(berserk);

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

function NextTest(str: any, point: any, history: any, ArrPlannedPGN: any) {
    const [play] = useSound(berserk);

    const handleClick = () => {
        play(); 
        console.log("Click");
    }

    return (
        <div>
            <h1>{ str }</h1>
            <h1>{ point }</h1>
            <h1>{ history }</h1>
            <h1>{ ArrPlannedPGN }</h1>
            <button onClick = { handleClick }>Click</button> 
        </div>
        
    );
}