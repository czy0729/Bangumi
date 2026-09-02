/*
 * @Author: czy0729
 * @Date: 2026-09-02 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 19:43:43
 */
import { axios } from '../index'
import Base64 from '../base64'

/**
 * webDAV 目录列表 (自研, 仅实现项目用到的 PROPFIND 目录列举, 对齐 webdav@4.11.3 行为)
 * @doc https://github.com/perry-mitchell/webdav-client/blob/master/source/operations/directoryContents.ts
 * */
export type WebDAVItem = {
  filename: string
  basename: string
  lastmod: string | null
  size: number
  type: 'directory' | 'file'
  etag: string | null
  mime?: string
}

export type WebDAVOptions = {
  username?: string
  password?: string
}

/**
 * v4.11.3 getDirectoryContents 的函数式等价
 * - Basic 认证 (AuthType.Password), 用户名/密码支持非 Latin1 字符 (UTF-8 编码, 优于原库 base-64 的 Latin1 限制)
 * - 返回条目按响应顺序排列, 已剔除目录自身条目 (与原库一致)
 * */
export async function getDirectoryContents(
  url: string,
  options: WebDAVOptions & { path?: string } = {}
): Promise<WebDAVItem[]> {
  const request = buildPropfindRequest(url, options.path ?? '', options)
  // PROPFIND 自定义方法与 Depth 头超出 CustomAxios 类型约束, 运行时为透传
  const response = await (axios as any)(request)
  const { serverBase, requestPath } = request
  return parseMultistatus(response.data, serverBase, requestPath)
}

/**
 * 构造 PROPFIND 请求参数 (纯函数, 便于测试)
 * - URL: origin + pathname + encodePath(path) + '/', 与原库 joinURL + encodePath 一致
 * - headers: Accept/Depth 与原库一致; Authorization 仅在有凭据时携带
 * */
export function buildPropfindRequest(
  url: string,
  path: string,
  options: WebDAVOptions = {}
): {
  url: string
  method: string
  headers: Record<string, string>
  responseType: string
  serverBase: string
  requestPath: string
} {
  const match = url.match(/^(https?:\/\/[^/]+)(\/.*)?$/i)
  if (!match) throw new Error(`Invalid webDAV url: ${url}`)

  const origin = match[1]
  const pathname = match[2] || ''
  const serverBase = pathname.replace(/\/+$/, '') || ''
  const requestPath = path.startsWith('/') ? path : `/${path}`
  // 去尾斜杠后统一追加, 避免根路径 (/) 时产生双斜杠
  const requestURL = `${origin}${serverBase}${encodePath(requestPath.replace(/\/+$/, ''))}/`

  const headers: Record<string, string> = {
    Accept: 'text/plain',
    Depth: '1'
  }
  if (options.username || options.password) {
    headers.Authorization = generateBasicAuthHeader(
      String(options.username),
      String(options.password)
    )
  }

  return {
    url: requestURL,
    method: 'PROPFIND',
    headers,
    responseType: 'text',
    serverBase: `${serverBase}/` || '/',
    requestPath
  }
}

/**
 * Basic 认证头
 * - UTF-8 用户名/密码先转字节字符串再 btoa (原库 base-64 遇非 Latin1 直接抛错)
 * */
export function generateBasicAuthHeader(username: string, password: string): string {
  return `Basic ${toBase64UTF8(`${username}:${password}`)}`
}

/** UTF-8 字符串 → 字节字符串 → base64 */
function toBase64UTF8(str: string): string {
  const bytes = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p) =>
    String.fromCharCode(parseInt(p, 16))
  )
  return Base64.btoa(bytes)
}

/** 按段 encodeURIComponent, 保留 '/' (对齐原库 encodePath) */
function encodePath(path: string): string {
  return path
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/')
}

/**
 * 解析 PROPFIND multistatus 响应 (纯函数)
 * - 兼容 D:/d:/无前缀命名空间与绝对/相对 href
 * - lastmod 原样透传 (对齐 v4.11.3, 不做 ISO 转换)
 * - 剔除目录自身条目 (basename 为空或 filename 等于请求目录)
 * */
export function parseMultistatus(
  xml: string,
  serverBase: string,
  requestPath: string
): WebDAVItem[] {
  if (!/<(?:[\w]+:)?multistatus[\s>]/.test(xml)) {
    throw new Error('Invalid response: No root multistatus found')
  }

  const base = serverBase === '/' ? '/' : serverBase
  const items: WebDAVItem[] = []

  const responseRe = /<(?:[\w]+:)?response(?:\s[^>]*)?>([\s\S]*?)<\/(?:[\w]+:)?response>/g
  let matched: RegExpExecArray | null
  while ((matched = responseRe.exec(xml))) {
    const block = matched[1]

    const hrefMatch = block.match(/<(?:[\w]+:)?href(?:\s[^>]*)?>([\s\S]*?)<\/(?:[\w]+:)?href>/)
    if (!hrefMatch) throw new Error('Invalid response: response item missing href')

    // 与原库一致: 实体先解码, URL 解码在 filename 计算时进行
    const href = decodeEntities(hrefMatch[1]).replace(/^https?:\/\/[^/]+/, '')

    const filename = decodeURIComponent(
      base === '/' ? normalisePath(href) : normalisePath(relative(base, href))
    )

    const propContent = getFirstPropContent(block)
    const lastmod = getPropValue(propContent, 'getlastmodified')
    const size = parseInt(getPropValue(propContent, 'getcontentlength') ?? '0', 10)
    const isCollection = /<(?:[\w]+:)?collection\s*\/?>/.test(propContent)
    const etag = getPropValue(propContent, 'getetag')

    const item: WebDAVItem = {
      filename,
      basename: filename.split('/').filter(Boolean).pop() ?? '',
      lastmod,
      size,
      type: isCollection ? 'directory' : 'file',
      etag: typeof etag === 'string' ? etag.replace(/"/g, '') : null
    }
    if (item.type === 'file') {
      const mimeType = getPropValue(propContent, 'getcontenttype')
      item.mime = mimeType ? mimeType.split(';')[0] : ''
    }

    items.push(item)
  }

  return (
    items
      // Filter out the item pointing to the current directory (not needed)
      .filter(item => item.basename && (item.type === 'file' || item.filename !== requestPath))
  )
}

/** 取第一个 propstat 的 prop 内容 (原库: 多 propstat 时取首组) */
function getFirstPropContent(block: string): string {
  const propstat = block.match(/<(?:[\w]+:)?propstat(?:\s[^>]*)?>([\s\S]*?)<\/(?:[\w]+:)?propstat>/)
  const content = propstat ? propstat[1] : ''
  const prop = content.match(/<(?:[\w]+:)?prop(?:\s[^>]*)?>([\s\S]*?)<\/(?:[\w]+:)?prop>/)
  return prop ? prop[1] : ''
}

/** 提取单个属性值并解码实体 */
function getPropValue(content: string, name: string): string | null {
  const match = content.match(
    new RegExp(`<(?:[\\w]+:)?${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:[\\w]+:)?${name}>`)
  )
  return match ? decodeEntities(match[1]) : null
}

/** 去重斜杠 + 保证首斜杠 + 去尾斜杠 (对齐原库 normalisePath) */
function normalisePath(pathStr: string): string {
  let normalisedPath = pathStr
  if (normalisedPath[0] !== '/') {
    normalisedPath = `/${normalisedPath}`
  }
  if (/^.+\/$/.test(normalisedPath)) {
    normalisedPath = normalisedPath.substr(0, normalisedPath.length - 1)
  }
  return normalisedPath.replace(/\/{2,}/g, '/')
}

/** 相对 serverBase 取路径 (简化版 posix.relative: 前缀匹配裁剪, 不匹配时原样返回) */
function relative(base: string, href: string): string {
  const normalisedBase = base.endsWith('/') ? base : `${base}/`
  return href.startsWith(normalisedBase) ? href.slice(normalisedBase.length) : href
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&nbsp;': ' '
}

/** XML 实体解码 (命名实体 + 数字实体, 覆盖 fast-xml-parser 默认解码范围) */
function decodeEntities(str: string): string {
  return str.replace(/&(?:#x([0-9a-fA-F]+)|#([0-9]+)|([a-zA-Z]+));/g, (match, hex, dec, named) => {
    if (named) return ENTITIES[`&${named};`] ?? match
    const code = hex ? parseInt(hex, 16) : parseInt(dec, 10)
    return code ? String.fromCharCode(code) : match
  })
}
