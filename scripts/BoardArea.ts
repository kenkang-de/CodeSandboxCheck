import { Behaviour, EventList, serializable } from "@needle-tools/engine";
import { Object3D } from "three";
import {Piece} from "./GameManager";

export class BoardArea extends Behaviour{

    @serializable(Object3D)
    transform?: Object3D;
  
    @serializable()
    description?: string;

        // @type Piece
    @serializable(Behaviour)
    pieceInCurrentArea?: Piece | null;

    @serializable(EventList)
    showMovableArea? : EventList;

    @serializable(EventList)
    hideMovableArea? : EventList;

    // A, B, C, ...H
    public column: number=0;
    // 1, 2, 3, ...8
    public row: number=0;

awake()
{
    this.transform = this.gameObject;
  }

  
}  