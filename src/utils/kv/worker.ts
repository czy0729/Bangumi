/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 22:13:00
 *
 * 内置支持者节点配置
 */
import { readSupporterValue } from './supporter'

/** 内置支持者节点配置 */
export interface SupporterConfig {
  /** 主站节点地址 */
  host: string

  /** 主站请求密钥 */
  secret: string

  /** 图片节点地址 */
  lainHost: string

  /** 图片签名密钥 */
  lainSecret: string
}

/** 解析缓存 (undefined 表示尚未解析) */
let config: SupporterConfig | undefined

/** 获取内置支持者节点配置 (首次调用时解析并缓存; 读取失败时各项为空, 支持者模式不生效) */
export function getSupporterConfig(): SupporterConfig {
  if (config) return config

  config = {
    host: readSupporterValue('host'),
    secret: readSupporterValue('secret'),
    lainHost: readSupporterValue('lainHost'),
    lainSecret: readSupporterValue('lainSecret')
  }

  return config
}
