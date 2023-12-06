import { Behaviour, getWorldPosition, serializable,EventList} from "@needle-tools/engine";
import { Object3D, Vector3 } from "three";
import { BoardArea, GameManager, MovementManager } from "../GameManager";

export{GameManager, MovementManager,EventList};

export enum Piecetype{
    Default,
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King
}

export enum PieceColor{
    Default,
    Black,
    White
}

export class Piece extends Behaviour {
    
    @serializable(Object3D)
    public pieceTransform!: Object3D;

    // @type PieceColor
    @serializable()
    public color : PieceColor = PieceColor.Default;

    // @type Piecetype
    @serializable() 
    public pieceType: Piecetype = Piecetype.Default;

    public mobility : number =0;

    // @type BoardArea
    public movableArea? : BoardArea[];

    CompareToOtherPiece(otherPiece : Piece): boolean
    {
        return this.pieceTransform === otherPiece.pieceTransform &&
        this.pieceType === otherPiece.pieceType &&
        this.color === otherPiece.color;
    }

    PlacePiece(targetTransform : Object3D)
    {
        const worldPos: Vector3 =  getWorldPosition(targetTransform);
        const loclConvertedPos: Vector3 = this.gameObject.parent!.parent!.worldToLocal(worldPos);
        this.gameObject.position.set(loclConvertedPos.x,loclConvertedPos.y,loclConvertedPos.z) ; 
    }

    GetMovableArea()
    {
       const movementManager  = GameManager.GetInstnace().movementManager;
       if(!movementManager)
       return;
       const boardArea = movementManager.GetPieceArea(this); 
       this.movableArea = movementManager.CalculateMovableArea(this, boardArea); 
       console.log(this.movableArea.length);
    }

    showmovableArea=()=>
    {
        console.log("show Area");
        this.movableArea?.forEach(boardArea=>{boardArea.showMovableArea?.invoke();})
        GameManager.GetInstnace().movementManager?.hideCurrentMovableArea?.addEventListener(this.hidemovableArea);
    }

    hidemovableArea=()=>
    {
        console.log("hide Area");
        this.movableArea?.forEach(boardArea=>{boardArea.hideMovableArea?.invoke();})
        GameManager.GetInstnace().movementManager?.hideCurrentMovableArea?.removeEventListener(this.hidemovableArea);
    }


    onClick()
    {
GameManager.GetInstnace().movementManager?.hideCurrentMovableArea?.invoke();
MovementManager.selectedPiece = this;
this.GetMovableArea();
this.showmovableArea();
    }

    onMoved()
    {

    }





}

