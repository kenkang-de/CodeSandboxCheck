import {serializable } from "@needle-tools/engine";
import { Piece,Piecetype } from "./Piece";



export class King extends Piece
{
    @serializable() 
    public pieceType: Piecetype = Piecetype.King;
}
