/*
 * @Author: czy0729
 * @Date: 2026-10-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 00:00:00
 *
 * expo-file-system/legacy 类型声明
 * - 该子路径自 SDK 53 起才有, SDK 49 (15.x) 无此入口, 补环境声明
 * - 类型从根包 'expo-file-system' (有 main/types 入口, 可正常解析) 复用
 */
declare module 'expo-file-system/legacy' {
  export * from 'expo-file-system'
}
