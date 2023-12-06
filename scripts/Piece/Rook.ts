import {serializable } from "@needle-tools/engine";
import { Piece,Piecetype } from "./Piece";



export class Rook extends Piece
{
    @serializable() 
    public pieceType: Piecetype = Piecetype.Rook;
}
