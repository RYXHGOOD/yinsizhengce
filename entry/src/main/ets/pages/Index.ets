import router from '@ohos.router';
import preferences from '@ohos.data.preferences';
import { BusinessError } from '@kit.BasicServicesKit';
import common from '@ohos.app.ability.common';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct Index {
  @StorageLink('privacyAgreed') privacyAgreed: boolean = false;

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
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      promptAction.showToast({ message: '状态检查失败' });
      console.error('隐私状态检查失败:', JSON.stringify(err));
    }
  }

  build() {
    Stack() {
      if (this.privacyAgreed) {
        Column() {
          Image($r('app.media.app_logo'))
            .width(180)
            .height(180)
            .margin({ bottom: 24 })
            .transition({ type: TransitionType.Insert, scale: { x: 0, y: 0 } })

          Text('认元学横')
            .fontSize($r('app.float.title_font_size'))
            .fontColor($r('app.color.primary_color'))
            .margin({ bottom: 8 })
            .transition({ type: TransitionType.Insert, opacity: 0 })

          Text('让知识更有价值')
            .fontSize($r('app.float.content_font_size'))
            .fontColor($r('app.color.text_primary'))
            .transition({ type: TransitionType.Insert, translate: { y: 50 } })
        }
        .alignItems(HorizontalAlign.Center)
        .justifyContent(FlexAlign.Center)
        .onAppear(() => {
          animateTo({
            duration: 1000,
            curve: Curve.EaseOut
          }, () => {
            // 触发过渡动画
          });
        })
      } else {
        Column() {
          Image($r('app.media.ic_warning'))
            .width(80)
            .height(80)
            .margin({ bottom: 16 })

          Text('访问需要同意隐私协议')
            .fontSize(18)
            .fontColor($r('app.color.warning_color'))

          Button('前往协议页面')
            .margin({ top: 24 })
            .backgroundColor($r('app.color.primary_color'))
            .fontColor(Color.White)
            .onClick(() => {
              router.replaceUrl({ url: 'pages/PrivacyPolicy' });
            })
        }
        .alignItems(HorizontalAlign.Center)
        .justifyContent(FlexAlign.Center)
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Color.White)
  }
}
