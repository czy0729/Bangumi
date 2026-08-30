/*
 * @Author: czy0729
 * @Date: 2026-03-14 05:07:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-15 06:41:09
 */
import { useAnimatedSensor } from 'react-native-reanimated'

/**
 * 基于设备传感器数据创建动画 (iOS / Web)
 *  - 使用 reanimated 公开的 hook; Android 端使用内部 API 的自实现版本, 见 useAnimatedSensor.android.ts
 */
export default useAnimatedSensor
