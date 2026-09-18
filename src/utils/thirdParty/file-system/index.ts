/*
 * @Author: czy0729
 * @Date: 2026-09-19 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 00:00:00
 *
 * expo-file-system 统一出口: 只显式 re-export 仓库实际用到的符号
 *  - 固定 /legacy 入口: SDK 57 起主入口的旧 API 是运行时 throw 的废弃桩
 *  - 出口面收敛: 将来迁移新 API 或更换存储方案时只改这一个文件
 */
export {
  EncodingType,
  cacheDirectory,
  deleteAsync,
  documentDirectory,
  downloadAsync,
  getInfoAsync,
  makeDirectoryAsync,
  moveAsync,
  readAsStringAsync,
  readDirectoryAsync,
  writeAsStringAsync
} from 'expo-file-system/legacy'
