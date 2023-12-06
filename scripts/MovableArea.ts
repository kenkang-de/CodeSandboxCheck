import { Behaviour, GameObject} from "@needle-tools/engine";
import { MovementManager, GameManager, Object3D, BoardArea} from "./GameManager";

export class MovableArea extends Behaviour
{
    onClick()
    {
        console.log("Movable Area Clicked");
        const parent = this.gameObject.parent;
        const movementManager = GameManager.GetInstnace().movementManager;

        if(!movementManager)
        return;

        if(parent &&  MovementManager.selectedPiece ) 
        {
            // update Piece position
            MovementManager.selectedPiece.PlacePiece(parent);

            // update boardarea currentpiece
            const previousBoardArea= movementManager.GetPieceArea(MovementManager.selectedPiece!);

            const targetBoardArea = this.gameObject.getComponentInParent(BoardArea);

            targetBoardArea!.pieceInCurrentArea = MovementManager.selectedPiece;

            previousBoardArea.pieceInCurrentArea = null;

        }
        movementManager.onMoved();
    }
}