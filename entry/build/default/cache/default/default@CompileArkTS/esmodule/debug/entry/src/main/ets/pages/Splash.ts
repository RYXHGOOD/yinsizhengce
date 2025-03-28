if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Splash_Params {
    scaleX?: number;
    scaleY?: number;
    rotateAngle?: number;
}
class Splash extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__scaleX = new ObservedPropertySimplePU(0.5, this, "scaleX");
        this.__scaleY = new ObservedPropertySimplePU(0.5, this, "scaleY");
        this.__rotateAngle = new ObservedPropertySimplePU(0, this, "rotateAngle");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Splash_Params) {
        if (params.scaleX !== undefined) {
            this.scaleX = params.scaleX;
        }
        if (params.scaleY !== undefined) {
            this.scaleY = params.scaleY;
        }
        if (params.rotateAngle !== undefined) {
            this.rotateAngle = params.rotateAngle;
        }
    }
    updateStateVars(params: Splash_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__scaleX.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleY.purgeDependencyOnElmtId(rmElmtId);
        this.__rotateAngle.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__scaleX.aboutToBeDeleted();
        this.__scaleY.aboutToBeDeleted();
        this.__rotateAngle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __scaleX: ObservedPropertySimplePU<number>;
    get scaleX() {
        return this.__scaleX.get();
    }
    set scaleX(newValue: number) {
        this.__scaleX.set(newValue);
    }
    private __scaleY: ObservedPropertySimplePU<number>;
    get scaleY() {
        return this.__scaleY.get();
    }
    set scaleY(newValue: number) {
        this.__scaleY.set(newValue);
    }
    private __rotateAngle: ObservedPropertySimplePU<number>;
    get rotateAngle() {
        return this.__rotateAngle.get();
    }
    set rotateAngle(newValue: number) {
        this.__rotateAngle.set(newValue);
    }
    aboutToAppear(): void {
        this.startAnimation();
    }
    private startAnimation(): void {
        Context.animateTo({
            duration: 1000,
            curve: Curve.EaseOut
        }, () => {
            this.rotateAngle = 360;
            this.scaleX = 1.2;
            this.scaleY = 1.2;
        });
        Context.animateTo({
            duration: 500,
            delay: 1000,
            curve: Curve.EaseIn
        }, () => {
            this.scaleX = 0.8;
            this.scaleY = 0.8;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(200);
            Image.height(200);
            Image.scale({ x: this.scaleX, y: this.scaleY });
            Image.rotate({ angle: this.rotateAngle });
            Image.margin({ bottom: 20 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Progress.create({ value: 50, style: ProgressStyle.Ring });
            Progress.color('#2196F3');
            Progress.width(80);
            Progress.height(80);
        }, Progress);
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Splash";
    }
}
registerNamedRoute(() => new Splash(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/Splash", pageFullPath: "entry/src/main/ets/pages/Splash", integratedHsp: "false", moduleType: "followWithHap" });
