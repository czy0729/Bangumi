/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 *
 * 响应头 Set-Cookie 解析
 * - 反代/节点可能把多条 Set-Cookie 拆成多值(数组), 也可能折叠成一条合并串
 * - 只读第一条会丢 cookie (如 chii_sec_id), 故统一在这里取全部
 */

/** 节点输出的合并 Set-Cookie 头 (把全部 Set-Cookie 用 ', ' 拼成一条) */
const MERGED_HEADER = 'x-set-cookie'

/** 兼容多种写法取出 Set-Cookie 原文, x-set-cookie 优先 */
function getRawSetCookie(headers: Record<string, unknown>): string {
  const raw =
    headers[MERGED_HEADER] ??
    headers['X-Set-Cookie'] ??
    headers['set-cookie'] ??
    headers['Set-Cookie']

  if (!raw) return ''

  const list = Array.isArray(raw) ? raw : [raw]
  return list
    .filter(item => typeof item === 'string' && !!item.trim())
    .map(item => (item as string).trim())
    .join(', ')
}

/** 单个 Set-Cookie 的键值 (已去掉属性) */
export interface SetCookieItem {
  key: string
  value: string
}

/**
 * 取响应头里的全部 Set-Cookie 原文 (多条以 ', ' 拼接)
 * - 兼容 x-set-cookie / 多值数组 / 单值字符串
 * - 无 cookie 时返回空字符串
 */
export function parseSetCookieHeader(headers?: Record<string, unknown>): string {
  if (!headers) return ''
  return getRawSetCookie(headers)
}

/**
 * 解析出全部 Set-Cookie 键值对
 * - 合并串按 ', key=' 继续拆分, 避免只拿到第一条
 * - 只取每条第一个 ';' 之前的部分, 属性(expires/path/domain 等)忽略
 */
export function parseSetCookieItems(headers?: Record<string, unknown>): SetCookieItem[] {
  const raw = parseSetCookieHeader(headers)
  if (!raw) return []

  const items: SetCookieItem[] = []
  raw.split(/,\s*(?=[A-Za-z_][\w-]*=)/).forEach(part => {
    const pair = part.split(';')[0].trim()
    const index = pair.indexOf('=')
    if (index <= 0) return

    const key = pair.slice(0, index).trim()
    if (key) items.push({ key, value: pair.slice(index + 1).trim() })
  })

  return items
}

/**
 * 把任意形态的 Set-Cookie 规范成"请求头可用"的 cookie 串
 * - 入参兼容 x-set-cookie / 多值数组 / 单值字符串 / 含属性的整行 / 多条逗号拼接的历史脏数据
 * - 只保留 keyPrefix 前缀的键值对, 丢弃 Path / Domain / Expires 等属性
 * - 结果形如 `chii_sid=xxx; chii_cookietime=2592000`, 可直接拼进请求 Cookie 头
 */
export function normalizeSetCookie(value: unknown, keyPrefix: string = 'chii_'): string {
  if (!value) return ''

  const list = (Array.isArray(value) ? value : [value]).filter(
    item => typeof item === 'string' && !!item.trim()
  ) as string[]
  if (!list.length) return ''

  return parseSetCookieItems({ 'set-cookie': list })
    .filter(item => item.key.startsWith(keyPrefix))
    .map(item => `${item.key}=${item.value}`)
    .join('; ')
}
