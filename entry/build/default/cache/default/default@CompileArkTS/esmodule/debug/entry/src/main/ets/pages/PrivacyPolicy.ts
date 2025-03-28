if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PrivacyPolicy_Params {
    privacyAgreed?: boolean;
    privacyRejected?: boolean;
}
import router from "@ohos:router";
import preferences from "@ohos:data.preferences";
import type { BusinessError } from "@ohos:base";
import type common from "@ohos:app.ability.common";
import promptAction from "@ohos:promptAction";
class PrivacyPolicy extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__privacyAgreed = this.createStorageLink('privacyAgreed', false, "privacyAgreed");
        this.__privacyRejected = this.createStorageLink('privacyRejected', false, "privacyRejected");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("privacyAgreed", this.onAgreeChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PrivacyPolicy_Params) {
    }
    updateStateVars(params: PrivacyPolicy_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__privacyAgreed.purgeDependencyOnElmtId(rmElmtId);
        this.__privacyRejected.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__privacyAgreed.aboutToBeDeleted();
        this.__privacyRejected.aboutToBeDeleted();
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
    private __privacyRejected: ObservedPropertyAbstractPU<boolean>;
    get privacyRejected() {
        return this.__privacyRejected.get();
    }
    set privacyRejected(newValue: boolean) {
        this.__privacyRejected.set(newValue);
    }
    onAgreeChange(): void {
        if (this.privacyAgreed) {
            router.replaceUrl({ url: 'pages/Index' });
        }
    }
    async saveAgreementStatus(agreed: boolean): Promise<void> {
        try {
            const context = getContext(this) as common.Context;
            const pref = await preferences.getPreferences(context, 'privacy_prefs');
            await pref.put('privacyAgreed', agreed);
            await pref.put('privacyRejected', !agreed);
            await pref.flush();
        }
        catch (error) {
            const err: BusinessError = error as BusinessError;
            console.error('保存协议状态失败:', JSON.stringify(err));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollBar(BarState.Off);
            Scroll.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777241, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.margin({ top: 24, bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.strokeWidth(1);
            Divider.color({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Divider.margin({ bottom: 24 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontSize({ "id": 16777239, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.fontColor({ "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Text.lineHeight(24);
            Text.padding({ left: 16, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(20);
            Row.margin({ top: 32 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Button.width('45%');
            Button.height(48);
            Button.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.borderRadius({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Button.onClick(() => {
                promptAction.showDialog({
                    title: '确认退出',
                    message: '确定要拒绝协议并退出应用吗？',
                    buttons: [
                        {
                            text: '取消',
                            color: { "id": 16777236, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
                        },
                        {
                            text: '确定',
                            color: { "id": 16777237, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
                        }
                    ]
                }).then(result => {
                    if (result.index === 1) {
                        // 修改开始：添加应用退出逻辑
                        this.saveAgreementStatus(false).then(() => {
                            const context = getContext(this) as common.UIAbilityContext;
                            context.terminateSelf().catch((err: BusinessError) => {
                                promptAction.showToast({ message: '退出失败，请重试' });
                            });
                        }); // 修改结束
                    }
                });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Button.width('45%');
            Button.height(48);
            Button.margin({ left: { "id": 16777240, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" } });
            Button.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Button.fontColor(Color.White);
            Button.borderRadius({ "id": 16777238, "type": 10002, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Button.onClick(async () => {
                await this.saveAgreementStatus(true);
                this.privacyAgreed = true;
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PrivacyPolicy";
    }
}
registerNamedRoute(() => new PrivacyPolicy(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/PrivacyPolicy", pageFullPath: "entry/src/main/ets/pages/PrivacyPolicy", integratedHsp: "false", moduleType: "followWithHap" });
