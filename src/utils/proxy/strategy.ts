/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 09:08:16
 *
 * 代理策略单一真源: 请求链路 / 接口链路 / 图片链路 / 图片请求头 统一从这里取
 */
import { getSupporterConfig } from '@utils/kv/worker'
import { syncSystemStore } from '../async'
import { isEchProxyRunning } from './ech'

/**
 * 代理策略
 * - 直连: disabled = true, 地址与请求头均保持原样
 * - ECH: ech = true, 地址与请求头均保持原样 (由本地代理在网络层接管)
 * - 普通反代 (Nginx 等): rewriteHeaders = false, 仅替换地址, 转发细节由反代方处理
 * - Worker 式 (自建 Worker / 内置支持者节点): rewriteHeaders = true, 替换地址并改写请求头
 */
export interface ProxyStrategy {
  /** 全局禁用代理 */
  disabled: boolean

  /** ECH 本地代理接管中 */
  ech: boolean

  /** 是否可以改写地址与请求头 (未禁用且未走 ECH) */
  enabled: boolean

  /** 是否命中内置支持者节点 (需高级会员) */
  supporter: boolean

  /** 主站代理地址 (支持者模式下为内置节点) */
  host: string

  /** 显式配置的 API 代理地址 (支持者模式下为空, 由 host 接管) */
  apiHost: string

  /** 图片代理地址 (支持者模式下为内置图片节点) */
  lainHost: string

  /** 主站请求密钥 */
  secret: string

  /** 图片签名密钥 */
  lainSecret: string

  /** true = Worker 式 (改写请求头); false = 仅替换地址 */
  rewriteHeaders: boolean
}

/**
 * api.bgm.tv redirect 图片 (如头像) 的改写目标
 * - 支持者节点由内置主节点一并接管 (此时 apiHost 为空)
 * - 自建 Worker 用用户自填的 API 域名
 * - 单一出口: lain.ts 的地址改写与 image-headers.ts 的请求头计算共用, 避免两处各写一遍
 */
export function getApiProxyTarget(config: Pick<ProxyStrategy, 'supporter' | 'host' | 'apiHost'>) {
  return config.supporter ? config.host : config.apiHost
}

/** 获取当前生效的代理策略 */
export function getProxyStrategy(): ProxyStrategy {
  const store = syncSystemStore()
  const {
    workerProxyDisabled,
    workerProxy,
    workerProxyDirect,
    workerApiProxy,
    workerLainProxy,
    workerLainSecret,
    workerPreset,
    workerSecret
  } = store.setting

  // 支持者节点仅对高级会员开放, 地址与密钥均内置, 不占用用户自填设置
  const supporter = workerPreset === 'supporter' && !!store.advance
  const disabled = !!workerProxyDisabled
  const ech = isEchProxyRunning()

  // 内置配置惰性解密 (首次调用解析并缓存, 失败时为空串), 模块加载期不再有抛错风险
  const builtin = getSupporterConfig()
  const host = supporter ? builtin.host : String(workerProxy || '')

  return {
    disabled,
    ech,
    enabled: !disabled && !ech,
    supporter,
    host,
    apiHost: supporter ? '' : String(workerApiProxy || ''),
    lainHost: supporter ? builtin.lainHost : String(workerLainProxy || ''),
    secret: supporter ? builtin.secret : String(workerSecret || ''),
    lainSecret: supporter ? builtin.lainSecret : String(workerLainSecret || ''),
    // 支持者节点必须由节点处理转发 (需 x-upstream 与密钥), 恒为改写头
    rewriteHeaders: supporter || !workerProxyDirect
  }
}
