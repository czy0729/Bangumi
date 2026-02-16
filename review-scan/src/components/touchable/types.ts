/*
 * @Author: czy0729
 * @Date: 2022-05-28 07:50:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 06:35:41
 */
import { TouchableWithoutFeedbackProps } from 'react-native'
import { Override } from '@types'

export type Props = Override<
  TouchableWithoutFeedbackProps,
  {
    /** 是否无反馈效果 */
    withoutFeedback?: boolean

    /** 是否高亮反馈效果 */
    highlight?: boolean

    /** 是否防止快速多次点击 */
    delay?: boolean

    /** 在 onPressOut 和 onPress 之前的时间 */
    delayPressIn?: number

    /** 松开手后的时间 */
    delayPressOut?: number

    /**
     * iOS 端此值无变化
     * 安卓端 Touchable 都使用了 react-native-gesture-handler 提供的封装
     * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 <Touchable>
     */
    useRN?: boolean

    /** 涟漪状的背景（安卓 only）*/
    ripple?: boolean

    /** 是否使用缩放动画 */
    animate?: boolean

    /** 点击中动画缩放比例, 默认 0.95 */
    scale?: number

    /** 覆写 onPress */
    onPress?: (evt: { pageX?: number; pageY?: number }) => any
  }
>
