import {serializable } from "@needle-tools/engine";
import { Piece,Piecetype } from "./Piece";



export class Knight extends Piece
{
    @serializable() 
    public pieceType: Piecetype = Piecetype.Knight;
}
