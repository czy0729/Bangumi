/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
/** slide 模式定位: 隐藏时从屏外进入, 显示时为 0 */
export function getPosition(
  animationType: 'none' | 'slide-up' | 'slide-down' | 'fade',
  visible: boolean,
  screenHeight: number
): number {
  if (visible || animationType === 'fade' || animationType === 'none') {
    return 0
  }
  return animationType === 'slide-down' ? -screenHeight : screenHeight
}

/** fade 模式缩放 */
export function getScale(visible: boolean): number {
  return visible ? 1 : 1.05
}

/** 遮罩/内容透明度 */
export function getOpacity(visible: boolean): number {
  return visible ? 1 : 0
}

/** focus 模式下内容上移距离 */
export function getFocusMargin(windowHeight: number, ratio: number): number {
  return -Math.floor(windowHeight * ratio)
}