import {serializable } from "@needle-tools/engine";
import { Piece,Piecetype } from "./Piece";



export class Bishop extends Piece
{
    @serializable() 
    public pieceType: Piecetype = Piecetype.Bishop;
}
