import { useEffect, useState } from 'react';
import { pgnPrint } from '@mliebelt/pgn-viewer'

export default function PGNp(chess) {
  const [pgn, setPgn] = useState("1. e4 e5");

  const handelClick1 = () => {
      setPgn("1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6");
  }

  pgnPrint('board', { pgn: pgn, notationLayout: 'list' });
  
  return (
    <div>
        <div id = 'board'>Hi</div>
        <button onClick = { handelClick1 }>1</button>
    </div>
    
  )
}