import UIAbility from "@ohos:app.ability.UIAbility";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import preferences from "@ohos:data.preferences";
import type { BusinessError } from "@ohos:base";
import promptAction from "@ohos:promptAction";
const DOMAIN = 0x0000;
const PREFERENCES_NAME = 'privacy_prefs';
const PRIVACY_AGREED_KEY = 'privacyAgreed';
const PRIVACY_REJECTED_KEY = 'privacyRejected';
const PRIVACY_VERSION_KEY = 'privacyVersion';
const CURRENT_VERSION = 1;
const SPLASH_DURATION = 1500;
export default class EntryAbility extends UIAbility {
    private handleLoadCallback = (err: BusinessError): void => {
        if (err.code) {
            hilog.error(DOMAIN, 'testTag', '页面加载失败: %{public}s', JSON.stringify(err));
            promptAction.showToast({ message: '页面加载失败，请重试' });
            return;
        }
        hilog.info(DOMAIN, 'testTag', '页面加载成功');
    };
    private delay(timeout: number): Promise<void> {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, timeout);
        });
    }
    private async setWindowBackgroundColor(windowStage: window.WindowStage): Promise<void> {
        try {
            const win = await windowStage.getMainWindow();
            win.setWindowBackgroundColor('#F5F5F5');
        }
        catch (err) {
            const error = err as BusinessError;
            hilog.error(DOMAIN, 'testTag', '窗口背景设置失败: %{public}s', JSON.stringify(error));
        }
    }
    async onWindowStageCreate(windowStage: window.WindowStage): Promise<void> {
        hilog.info(DOMAIN, 'testTag', 'Ability生命周期: onWindowStageCreate');
        // 设置窗口背景
        await this.setWindowBackgroundColor(windowStage);
        windowStage.loadContent('pages/Splash', async (err: BusinessError) => {
            if (err.code) {
                hilog.error(DOMAIN, 'testTag', '启动页加载失败: %{public}s', JSON.stringify(err));
                return;
            }
            await this.delay(SPLASH_DURATION);
            try {
                const pref = await preferences.getPreferences(this.context, PREFERENCES_NAME);
                const results = await Promise.all([
                    pref.get(PRIVACY_AGREED_KEY, false),
                    pref.get(PRIVACY_REJECTED_KEY, false),
                    pref.get(PRIVACY_VERSION_KEY, 0)
                ]);
                const agreed = results[0] as boolean;
                const rejected = results[1] as boolean;
                const savedVersion = results[2] as number;
                if (savedVersion < CURRENT_VERSION) {
                    await this.handleVersionUpdate(pref);
                }
                if (rejected) {
                    this.showExitDialog();
                    return;
                }
                const targetPage = agreed ? 'pages/Index' : 'pages/PrivacyPolicy';
                windowStage.loadContent(targetPage, this.handleLoadCallback);
            }
            catch (error) {
                const err: BusinessError = error as BusinessError;
                hilog.error(DOMAIN, 'testTag', '初始化失败: %{public}s', JSON.stringify(err));
                this.showErrorAndExit();
            }
        });
    }
    private async handleVersionUpdate(pref: preferences.Preferences): Promise<void> {
        try {
            await pref.delete(PRIVACY_AGREED_KEY);
            await pref.put(PRIVACY_VERSION_KEY, CURRENT_VERSION);
            await pref.flush();
        }
        catch (error) {
            const err: BusinessError = error as BusinessError;
            hilog.error(DOMAIN, 'testTag', '版本更新失败: %{public}s', JSON.stringify(err));
        }
    }
    private showExitDialog(): void {
        promptAction.showDialog({
            title: '提示',
            message: '您已拒绝隐私协议，应用即将退出',
            buttons: [
                {
                    text: '确定',
                    color: '#2196F3'
                }
            ]
        }).then((result) => {
            if (result.index === 0) {
                this.context.terminateSelf();
            }
        });
    }
    private showErrorAndExit(): void {
        promptAction.showDialog({
            title: '系统错误',
            message: '应用初始化失败，请重新启动',
            buttons: [{
                    text: '确定',
                    color: '#333333'
                }]
        }).then(() => {
            this.context.terminateSelf();
        });
    }
}
