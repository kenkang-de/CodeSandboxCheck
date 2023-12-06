import { Behaviour } from "@needle-tools/engine";

export class Rotate extends Behaviour
{
    speed : number = 1;

    start(){
        console.log(this);
    }

    update(){
        this.gameObject.rotateY(this.context.time.deltaTime * this.speed);
    }
}
