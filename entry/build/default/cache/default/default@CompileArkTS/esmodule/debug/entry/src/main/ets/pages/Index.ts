if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    privacyAgreed?: boolean;
}
import router from "@ohos:router";
import preferences from "@ohos:data.preferences";
import type { BusinessError } from "@ohos:base";
import type common from "@ohos:app.ability.common";
import promptAction from "@ohos:promptAction";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__privacyAgreed = this.createStorageLink('privacyAgreed', false, "privacyAgreed");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__privacyAgreed.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__privacyAgreed.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __privacyAgreed: ObservedPropertyAbstractPU<boolean>;
    get privacyAgreed() {
        return this.__privacyAgreed.get();
    }
    set privacyAgreed(newValue: boolean) {
        this.__privacyAgreed.set(newValue);
    }
    aboutToAppear(): void {
        this.checkPrivacyStatus();
    }
    async checkPrivacyStatus(): Promise<void> {
        try {
            const context = getContext(this) as common.Context;
            const pref = await preferences.getPreferences(context, 'privacy_prefs');
            const agreed = await pref.get('privacyAgreed', false) as boolean;
            this.privacyAgreed = agreed;
            if (!agreed) {
                promptAction.showToast({ message: '请先同意隐私协议' });
            }
        }
        catch (error) {
            const err: BusinessError = error as BusinessError;
            promptAction.showToast({ message: '状态检查失败' });
            console.error('隐私状态检查失败:', JSON.stringify(err));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor(Color.White);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.privacyAgreed) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Center);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onAppear(() => {
                            Context.animateTo({
                                duration: 1000,
                                curve: Curve.EaseOut
                            }, () => {
                                // 触发过渡动画
                            });
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.width(180);
                        Image.height(180);
                        Image.margin({ bottom: 24 });
                        Image.transition({ type: TransitionType.Insert, scale: { x: 0, y: 0 } });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('认元学横');
                        Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Text.margin({ bottom: 8 });
                        Text.transition({ type: TransitionType.Insert, opacity: 0 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('让知识更有价值');
                        Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Text.transition({ type: TransitionType.Insert, translate: { y: 50 } });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Center);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.width(80);
                        Image.height(80);
                        Image.margin({ bottom: 16 });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('访问需要同意隐私协议');
                        Text.fontSize(18);
                        Text.fontColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('前往协议页面');
                        Button.margin({ top: 24 });
                        Button.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Button.fontColor(Color.White);
                        Button.onClick(() => {
                            router.replaceUrl({ url: 'pages/PrivacyPolicy' });
                        });
                    }, Button);
                    Button.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
