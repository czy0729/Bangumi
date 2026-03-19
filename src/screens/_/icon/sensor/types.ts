/*
 * @Author: czy0729
 * @Date: 2026-03-12 04:56:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:34:48
 */
export type Props = {
  /** 是否展开 */
  enabled: boolean

  /** 展开位移距离 */
  spreadDistance?: number

  /** 菱形大小 */
  shapeSize?: number

  /** 菱形旋转度数 (RotateZ) */
  rotationAngle?: number

  /** 往用户方向倾斜度数 (RotateX) */
  tiltAngle?: number

  /** 切换回调 */
  onPress: () => void
}
