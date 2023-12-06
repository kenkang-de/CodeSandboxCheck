import { EffectProviderResult, PostProcessingEffect, registerCustomEffectType, serializable } from "@needle-tools/engine";
import { OutlineEffect } from "postprocessing";
import { Object3D } from "three";


export class OutlinePostEffect extends PostProcessingEffect {
    get typeName(): string {
        return "Outline";
    }

    @serializable(Object3D)
    selection!: Object3D[];

    private _outlineEffect: void | undefined | OutlineEffect;

    onCreateEffect(): EffectProviderResult | undefined {

        const outlineEffect = new OutlineEffect(this.context.scene, this.context.mainCamera!);
        this._outlineEffect = outlineEffect;
        outlineEffect.edgeStrength = 10;
        outlineEffect.visibleEdgeColor.set(0xff0000);
        for (const obj of this.selection) {
            outlineEffect.selection.add(obj);
        }

        return outlineEffect;
    }

    updateSelection() {
        if (this._outlineEffect) {
            this._outlineEffect.selection.clear();
            for (const obj of this.selection) {
                this._outlineEffect.selection.add(obj);
            }
        }
    }
}
registerCustomEffectType("Outline", OutlinePostEffect);