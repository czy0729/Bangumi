/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:04:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-21 06:08:05
 */
import { syncSystemStore } from '@utils/async'

import type { SubjectId } from '@types'

/** 云端设置数据 (OTA, 键为 VERSION_* / SITE_* 等配置项, 值为版本号或地址字符串) */
export type OTAData = Record<string, string>

/** 获取云端设置 */
export function getOTA(): OTAData {
  return syncSystemStore().ota
}

/** 自动判断需要使用的版本号 */
export function getVersion(key: string, version: string) {
  const ota = getOTA()
  return parseInt(ota[key]) > parseInt(version) ? ota[key] : version
}

/** repo 的目录显示文件数量有限, 所以根据 subjectId 每 100 划分为一个目录 */
export function getFolder(subjectId: SubjectId, split: 100 | 1000 = 100) {
  return Math.floor(Number(subjectId) / split)
}
