/*
 * react-native-reanimated 深路径类型声明 (Android 平台使用)
 *
 * Android 端 metro 实际解析 packages/android/node_modules 中的 reanimated 3.6.0,
 * useAnimatedSensor.android.ts 有意深引用其内部传感器 API 以绕过公开 hook,
 * 此处按 3.6.0 的真实类型补齐声明
 *
 * @Doc https://github.com/software-mansion/react-native-reanimated/tree/3.6.0/src/reanimated2
 * @Author: czy0729
 * @Date: 2026-08-30 09:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 09:40:00
 */
declare module 'react-native-reanimated/src/reanimated2/commonTypes' {
  export interface SharedValue<Value> {
    value: Value
    addListener: (listenerID: number, listener: (value: any) => void) => void
    removeListener: (listenerID: number) => void
    modify: (modifier?: (value: any) => any, forceUpdate?: boolean) => void
  }

  export enum SensorType {
    ACCELEROMETER = 1,
    GYROSCOPE = 2,
    GRAVITY = 3,
    MAGNETIC_FIELD = 4,
    ROTATION = 5
  }

  export enum IOSReferenceFrame {
    XArbitraryZVertical,
    XArbitraryCorrectedZVertical,
    XMagneticNorthZVertical,
    XTrueNorthZVertical,
    Auto
  }

  export enum InterfaceOrientation {
    ROTATION_0 = 0,
    ROTATION_90 = 90,
    ROTATION_180 = 180,
    ROTATION_270 = 270
  }

  export type SensorConfig = {
    interval: number | 'auto'
    adjustToInterfaceOrientation: boolean
    iosReferenceFrame: IOSReferenceFrame
  }

  export type Value3D = {
    x: number
    y: number
    z: number
    interfaceOrientation: InterfaceOrientation
  }

  export type ValueRotation = {
    qw: number
    qx: number
    qy: number
    qz: number
    yaw: number
    pitch: number
    roll: number
    interfaceOrientation: InterfaceOrientation
  }

  export type AnimatedSensor<T extends Value3D | ValueRotation> = {
    sensor: SharedValue<T>
    unregister: () => void
    isAvailable: boolean
    config: SensorConfig
  }
}

declare module 'react-native-reanimated/src/reanimated2/core' {
  import type {
    SensorConfig,
    SensorType,
    SharedValue,
    Value3D,
    ValueRotation
  } from 'react-native-reanimated/src/reanimated2/commonTypes'

  export function initializeSensor(
    sensorType: SensorType,
    config: SensorConfig
  ): SharedValue<Value3D | ValueRotation>

  export function registerSensor(
    sensorType: SensorType,
    config: SensorConfig,
    eventHandler: (data: Value3D | ValueRotation, orientationDegrees: number) => void
  ): number

  export function unregisterSensor(sensorId: number): void
}

declare module 'react-native-reanimated/src/reanimated2/threads' {
  export const callMicrotasks: () => void
}

declare module 'react-native-reanimated/lib/module/reanimated2/commonTypes' {
  import type {
    SensorConfig,
    SharedValue,
    Value3D,
    ValueRotation
  } from 'react-native-reanimated/src/reanimated2/commonTypes'

  export { SensorConfig, Value3D, ValueRotation }

  export type AnimatedSensor<T extends Value3D | ValueRotation> = {
    sensor: SharedValue<T>
    unregister: () => void
    isAvailable: boolean
    config: SensorConfig
  }
}
