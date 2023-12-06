import { Piece,Piecetype,GameManager, PieceColor } from "../GameManager";


export class Pawn extends Piece
{
    //TODO: mobility -1 , after first move 
    start()
    {
        super.pieceType = Piecetype.Pawn;
        this.setMobility();
    }

    setMobility()
    {
        this.mobility =2;

        this.checkMoved();
    }

    onMoved()
    {
        this.checkMoved();
    }

    checkMoved() {
        const movementManager = GameManager.GetInstnace().movementManager;
        if (!movementManager) {
            return;
        }
        const pieceArea = movementManager.GetPieceArea(this);
        
        const currentPawnRow = pieceArea?.row;
    
        switch (this.color) {
            case PieceColor.White:
                if (currentPawnRow != 1) {
                    this.mobility = 1;
                }
                break;
            case PieceColor.Black:
                if (currentPawnRow != 6) {
                    this.mobility = 1;
                }
                break;
        }
    }
    


}
