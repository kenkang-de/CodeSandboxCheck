import { Behaviour, serializable,  GameObject, EventList} from "@needle-tools/engine";
import  { BoardArea } from "./GameManager";
import { Piece, PieceColor} from "./GameManager";
import { Pawn } from "./GameManager";
// import { Object3D } from "three";


export class MovementManager extends Behaviour
{
     // @type BoardArea
  @serializable(Behaviour)
 public boardAreaList?: BoardArea[];

     // @type BoardArea
 @serializable(Behaviour)
 public BoardArea2x2Matrix? : BoardArea[][] | undefined;

 @serializable(GameObject)
 public boardObject?: GameObject;

 @serializable(EventList)
 hideCurrentMovableArea? : EventList;

 //@type Piece
private static _selectedPiece: Piece | null = null;

 //@type Piece
public static get selectedPiece(): Piece | null
{
  return MovementManager._selectedPiece! ;
}

 //@type Piece
public static set selectedPiece(piece: Piece | null)
{
MovementManager._selectedPiece = piece;
}


// Read All Board Area, set it all in boardAreaList
 InitBoardArea() {
  this.boardAreaList=this.boardObject?.getComponentsInChildren(BoardArea);
}


// convert boardAreaList to BoardArea2x2Matrix
 ConvertBoardArea() {
  if (this.BoardArea2x2Matrix) {
    for (let i = 0; i < 8; i++) {
      this.BoardArea2x2Matrix.push([]); // Initialize the inner array
      for (let j = 0; j < 8; j++) {
        const boardArea: BoardArea = this.boardAreaList![i * 8 + j];
        if (this.BoardArea2x2Matrix[i]) {
          this.BoardArea2x2Matrix[i].push(boardArea);
          //Initialize BoardArea Column and Row of 2x2 Matrix
          boardArea.column=i;
          boardArea.row= j;
}}}}}

// return a PieceA == PieceB;
isMatching(pieceA: Piece , pieceB: Piece): boolean {
  return pieceA !== undefined && pieceA.CompareToOtherPiece(pieceB);
}

// reutrn BoardArea where Piece is standing on
GetPieceArea(piece: Piece) : BoardArea 
{
  if (this.BoardArea2x2Matrix) {
    for (const column of this.BoardArea2x2Matrix) {
        for (const boardArea of column) {
        const currentAreaPiece = boardArea.pieceInCurrentArea;
        if (currentAreaPiece && this.isMatching(currentAreaPiece,piece))  {
            return boardArea;
         }
         }
    }
}
return new BoardArea;
}

// returns BoardArea [] of movableAreas,
GetMovableArea(piece: Piece): BoardArea[] 
{
const pieceCurrentBoardArea = this.GetPieceArea(piece);

return this.CalculateMovableArea(piece,pieceCurrentBoardArea);

}

// max and min of Column and Rows
minRowColumn : number = 0;
maxRowColumn : number = 7;

// Check number is in Rows and Column boundary.
CheckBoundary(num: number):boolean
{
return this.minRowColumn <= num && num <= this.maxRowColumn ;
}

// If the Number is too big or too small, adjust it to maximum or minimum number
AdjustToBoundary(value: number) : number
{
  if(value > this.maxRowColumn)
  return this.maxRowColumn;

  if(value <this.minRowColumn)
  return this.minRowColumn

return value;
}

// Calculate where the piece can move
CalculateMovableArea(piece: Piece, boardArea: BoardArea): BoardArea[]  {

  const result : BoardArea[] =[];

  if (!boardArea || !this.BoardArea2x2Matrix) {
    return result;
  }

  switch(true)
  {
    case piece instanceof Pawn :
      {
        const pawn = piece as Pawn;

        switch (pawn.color) {
          case PieceColor.White:
            for(let i=boardArea.row+1; i<=this.AdjustToBoundary(boardArea.row + pawn.mobility); i++)
             result.push(this.BoardArea2x2Matrix[boardArea.column][i]);
            break;
      
          case PieceColor.Black:
            for(let i=boardArea.row-1; i>=this.AdjustToBoundary(boardArea.row - pawn.mobility); i--)
            { 
             result.push(this.BoardArea2x2Matrix[boardArea.column][i]);
            }
            break;
      }

break;
  }
  default:
    break;
  }

  // Additional logic and return statement if needed
  return result;
}

// SWITCH TURN SHOULD BE APPLIED HERE!
onMoved()
{
  //hide MovableArea on Screen 
this.hideCurrentMovableArea?.invoke();

if(!MovementManager.selectedPiece)
return;

// Special event for specific piece (ex. Pawn)
MovementManager.selectedPiece.onMoved();
  
  MovementManager.selectedPiece = null;


//TODO
//SWITCH TURN!

}



}



  
