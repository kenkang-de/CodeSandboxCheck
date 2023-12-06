import {serializable } from "@needle-tools/engine";
import { Piece,Piecetype } from "./Piece";



export class Queen extends Piece
{
    @serializable() 
    public pieceType: Piecetype = Piecetype.Queen;
}
