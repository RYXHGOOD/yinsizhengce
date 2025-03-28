// entry/src/main/ets/pages/Splash/Splash.ets
@Entry
@Component
struct Splash {
  @State private scaleX: number = 0.5;
  @State private scaleY: number = 0.5;
  @State private rotateAngle: number = 0;

  aboutToAppear(): void {
    this.startAnimation();
  }

  private startAnimation(): void {
    animateTo({
      duration: 1000,
      curve: Curve.EaseOut
    }, () => {
      this.rotateAngle = 360;
      this.scaleX = 1.2;
      this.scaleY = 1.2;
    });

    animateTo({
      duration: 500,
      delay: 1000,
      curve: Curve.EaseIn
    }, () => {
      this.scaleX = 0.8;
      this.scaleY = 0.8;
    });
  }

  build() {
    Column() {
      Image($r('app.media.app_logo'))
        .width(200)
        .height(200)
        .scale({ x: this.scaleX, y: this.scaleY })
        .rotate({ angle: this.rotateAngle })
        .margin({ bottom: 20 })

      Progress({ value: 50, style: ProgressStyle.Ring })
        .color('#2196F3')
        .width(80)
        .height(80)
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .backgroundColor('#F5F5F5')
  }
}
