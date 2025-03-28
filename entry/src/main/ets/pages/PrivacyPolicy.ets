import router from '@ohos.router';
import preferences from '@ohos.data.preferences';
import { BusinessError } from '@kit.BasicServicesKit';
import common from '@ohos.app.ability.common';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct PrivacyPolicy {
  @StorageLink('privacyAgreed') @Watch('onAgreeChange') privacyAgreed: boolean = false;
  @StorageLink('privacyRejected') privacyRejected: boolean = false;

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
    } catch (error) {
      const err: BusinessError = error as BusinessError;
      console.error('保存协议状态失败:', JSON.stringify(err));
    }
  }

  build() {
    Scroll() {
      Column() {
        Text($r('app.string.privacy_title'))
          .fontSize($r('app.float.title_font_size'))
          .fontColor($r('app.color.primary_color'))
          .margin({ top: 24, bottom: 16 })

        Divider()
          .strokeWidth(1)
          .color($r('app.color.primary_color'))
          .margin({ bottom: 24 })

        Text($r('app.string.privacy_content'))
          .fontSize($r('app.float.content_font_size'))
          .fontColor($r('app.color.text_primary'))
          .lineHeight(24)
          .padding({ left: 16, right: 16 })

        Row() {
          Button($r('app.string.disagree_btn'))
            .width('45%')
            .height(48)
            .backgroundColor($r('app.color.warning_color'))
            .fontColor(Color.White)
            .borderRadius($r('app.float.button_radius'))
            .onClick(() => {
              promptAction.showDialog({
                title: '确认退出',
                message: '确定要拒绝协议并退出应用吗？',
                buttons: [
                  {
                    text: '取消',
                    color: $r('app.color.text_primary')
                  },
                  {
                    text: '确定',
                    color: $r('app.color.warning_color')
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
                  });   // 修改结束
                }
              });
            })

          Button($r('app.string.agree_btn'))
            .width('45%')
            .height(48)
            .margin({ left: $r('app.float.section_spacing') })
            .backgroundColor($r('app.color.primary_color'))
            .fontColor(Color.White)
            .borderRadius($r('app.float.button_radius'))
            .onClick(async () => {
              await this.saveAgreementStatus(true);
              this.privacyAgreed = true;
            })
        }
        .width('100%')
        .padding(20)
        .margin({ top: 32 })
      }
    }
    .scrollBar(BarState.Off)
    .backgroundColor($r('app.color.background_color'))
  }
}
