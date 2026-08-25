/*
 * @Author: czy0729
 * @Date: 2024-04-17 17:25:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 15:38:42
 */
import { FileSystem } from '../../thirdParty/file-system'

/**
 * 缓存根目录
 * 使用持久目录而非 cacheDirectory: iOS 的 Library/Caches 在存储压力下会被系统随时清空,
 * 导致冷启动后图片缓存全部失效重新下载; 本目录由应用自行按 LRU 上限管理
 */
export const BASE_DIR = `${FileSystem.documentDirectory}expo-image-cache/`

/** 旧版缓存目录 (cacheDirectory), 存量用户孤儿数据的一次性清理目标 */
export const LEGACY_BASE_DIR = `${FileSystem.cacheDirectory}expo-image-cache/`

/** 缓存文件数上限, 超出后从最旧开始清理 */
export const MAX_CACHE_FILES = 4000

/** 缓存总大小上限 (bytes), 超出后从最旧开始清理 */
export const MAX_CACHE_SIZE = 512 * 1024 * 1024

/** 残留 .tmp 下载临时文件的回收时间 (ms) */
export const TMP_TTL = 24 * 60 * 60 * 1000
