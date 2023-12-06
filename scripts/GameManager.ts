import { Behaviour,  serializable} from "@needle-tools/engine";
import { MovementManager } from "./MovementManager";
import {Piece, Piecetype, PieceColor} from "./Piece/Piece"
import { BoardArea } from "./BoardArea";
import {MovableArea} from "./MovableArea"
import { Object3D } from "three";
import { Pawn } from "./Piece/Pawn";


export {BoardArea};
export {Piece, Piecetype,PieceColor};
export {MovementManager};
export {MovableArea};
export {Object3D};
export {Pawn};



export class GameManager extends Behaviour
{
        private static instance: GameManager; 

        public static GetInstnace(): GameManager{
return GameManager.instance;
        }
    
        initInstance() {
            if (!GameManager.instance) {
                GameManager.instance = this;
            }
            return GameManager.instance;
        }

    // @type MovementManager
    @serializable (Behaviour)
    public movementManager?: MovementManager;

    InitialPiecePlacement() {
        if (this.movementManager && this.movementManager.BoardArea2x2Matrix) {
            for (const column of this.movementManager.BoardArea2x2Matrix) {
                for (const boardArea of column) {
                const piece = boardArea.pieceInCurrentArea;
                if (piece) {
                    piece.PlacePiece(boardArea.gameObject);
                 }
                 }
            }
        }
    }
    
    awake() {

        this.initInstance();

        if (this.movementManager) {
            this.movementManager.InitBoardArea();
            this.movementManager.BoardArea2x2Matrix = [];
            this.movementManager.ConvertBoardArea();
        }
        else
        {
            console.error("missing moveManager Reference");
        }

        this.InitialPiecePlacement();


    }
}
