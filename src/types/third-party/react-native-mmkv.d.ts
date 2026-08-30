/*
 * react-native-mmkv 类型声明 (Android 平台使用，iOS 不装此包)
 *
 * @Author: czy0729
 * @Date: 2026-08-30 07:02:30
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-30 07:02:30
 */
declare module 'react-native-mmkv' {
  export class MMKV {
    constructor(options?: { id: string })

    getString(key: string): string | undefined
    set(key: string, value: string): void
    getBoolean(key: string): boolean | undefined
    set(key: string, value: boolean): void
    getNumber(key: string): number | undefined
    set(key: string, value: number): void
    getAllKeys(): string[]
    delete(key: string): void
    clearAll(): void
  }
}
