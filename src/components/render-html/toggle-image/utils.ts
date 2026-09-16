/*
 * @Author: czy0729
 * @Date: 2022-09-27 16:47:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 23:16:11
 */
import { computeHeaders } from '@components/image/utils'
import { ensureCacheLimit } from '@utils/cache'
import { getDirectImageUri, resolveImageUri } from '@utils/image'
import { axios } from '@utils/thirdParty'
import pLimit from '@utils/thirdParty/p-limit'
import { WEB } from '@constants'

/** 图片体积缓存上限 */
const CACHE_LIMIT = 500

/** HEAD 超时 (毫秒): 打包的 axios 默认无超时, 必须显式给, 否则节点挂起会一直占着并发槽 */
const HEAD_TIMEOUT = 8000

/** 回退直连的超时 (毫秒): 回退本身大概率无效 (节点模式下官方域可能不可达), 不能等满主超时 */
const FALLBACK_TIMEOUT = 3000

/** 并发上限: 帖子多图时避免同时打出大量 HEAD */
const HEAD_CONCURRENCY = 4

/**
 * 「无法确定体积 (0)」的缓存有效期 (毫秒)
 * 缓存 0 是为了避免重复请求 (chunked / 无 content-length 的节点), 但必须能过期重试:
 * 否则一次抖动 (网络瞬断 / 节点临时不转发 header) 会被永久记住, 自动展开再也不会恢复
 * */
const UNKNOWN_TTL = 5 * 60 * 1000

/** 缓存条目: expires 为 0 表示永久 (已知体积), 否则到期后允许重新探测 */
type CacheEntry = {
  size: number
  expires: number
}

/** 图片体积缓存 (单位 KB, 键为原始地址) */
const CACHE = new Map<string, CacheEntry>()

/** 进行中的请求: 同一地址并发调用只发一次 HEAD */
const PENDING = new Map<string, Promise<number>>()

/** 并发闸门 */
const limit = pLimit(HEAD_CONCURRENCY)

/** HEAD 结果: size 为 null 表示「不确定」, status 为 0 表示请求异常 */
type HeadResult = {
  size: number | null
  status: number
}

/** 记录图片体积 (KB): 已知体积永久缓存, 未知 (0) 只缓存 UNKNOWN_TTL, 超出上限按插入顺序淘汰最早条目 */
function memoSize(url: string, value: number) {
  CACHE.set(url, {
    size: value,
    expires: value > 0 ? 0 : Date.now() + UNKNOWN_TTL
  })
  ensureCacheLimit(CACHE, CACHE_LIMIT)
}

/** 读取缓存体积, 过期条目顺手清理 */
function readCache(url: string): number | undefined {
  const entry = CACHE.get(url)
  if (!entry) return undefined

  if (entry.expires && entry.expires <= Date.now()) {
    CACHE.delete(url)
    return undefined
  }

  return entry.size
}

/** 取 content-length 对应的 KB 体积, 无法确定时返回 null */
function readSize(headers?: Record<string, string>): number | null {
  if (!headers) return null

  // axios 的 parseHeaders 会把键名小写化, 但换 adapter / 换请求库后不保证, 故不区分大小写
  let raw: unknown
  Object.keys(headers).some(key => {
    if (key.toLowerCase() !== 'content-length') return false

    raw = headers[key]
    return true
  })
  if (raw === undefined || raw === null || raw === '') return null

  const bytes = Number(raw)
  if (!Number.isFinite(bytes) || bytes <= 0) return null

  // 向上取整: 小于 1KB 的图也要得到 >= 1 的值, 否则与「探测失败 (0)」不可区分 ——
  // 调用方 setLoaded(Boolean(size)) 会把正常小图判成未加载, 体积上限判定也会失效
  return Math.ceil(bytes / 1024)
}

/**
 * 发起 HEAD 请求
 *  - 打包的 axios 本身支持 head 方法与 timeout 配置, 但 @utils/thirdParty 的包装层从未挂载
 *    head 别名 (只声明在类型里), 因此统一走 config 形式; 不要改回 `axios.head(url)`, 会同步抛 TypeError
 *  - 请求头与渲染同源: 用原始地址算 computeHeaders (lain 域带 Referer,
 *    被节点改写的 API 图带 x-upstream / 密钥), 否则这类地址的 HEAD 必然非 200
 * */
function headRequest(target: string, src: string, timeout: number) {
  return axios({
    method: 'head',
    url: target,
    headers: computeHeaders(src),
    timeout
  })
}

/** 单次 HEAD 取体积, 任何异常都收敛为「不确定」 */
async function headSize(target: string, src: string, timeout: number): Promise<HeadResult> {
  try {
    const response = await headRequest(target, src, timeout)
    return {
      size: readSize(response?.headers),
      status: Number(response?.status) || 0
    }
  } catch {
    // 包装层同步抛错 / 网络异常: 不能让异常冒泡 ——
    // getSize 的调用方对该 promise 没有 catch, 会变成 unhandled rejection 且 setSize/setLoaded 不执行
    return { size: null, status: 0 }
  }
}

/** 真正发起一次体积探测: 代理优先, 仅在节点明确不支持 HEAD 时回退原始地址 */
async function requestSize(url: string) {
  try {
    const proxied = resolveImageUri(url)
    // 回退目标必须是「归一化 + 补协议」后的官方地址:
    // 直接用原始地址会在历史存量数据 (旧代理域名) 上回退到一个早已失效的域名
    const direct = getDirectImageUri(url)

    const first = await headSize(proxied, url, HEAD_TIMEOUT)
    let size = first.size

    // 只在节点返回 405 / 501 (明确不支持 HEAD) 时回退:
    // 其余失败 (超时 / 无 content-length / 500) 下直连官方域大概率也只是白等一次
    if (size === null && proxied !== direct && (first.status === 405 || first.status === 501)) {
      size = (await headSize(direct, url, FALLBACK_TIMEOUT)).size
    }

    const result = size || 0
    memoSize(url, result)
    return result
  } catch {
    memoSize(url, 0)
    return 0
  }
}

/**
 * 获取远程图片的大小 (KB)
 *  - 返回 0 表示「无法确定体积」, 调用方据此不再自动展开; 因此失败判定要保守,
 *    且 0 只缓存 UNKNOWN_TTL, 避免一次抖动被永久记住
 *  - 缓存键保持原始地址, 与调用方 (toggle-image) 的入参一致
 * */
export function getSize(url: string): Promise<number> | number {
  if (WEB) return 0

  // 非法地址不发请求 (调用方存在 propSrc 为空的路径)
  if (typeof url !== 'string' || !url) return 0

  const cached = readCache(url)
  if (cached !== undefined) return cached

  // 同地址在途去重 + 全局并发上限
  let pending = PENDING.get(url)
  if (!pending) {
    const task = limit(() => requestSize(url))
    pending = task.then(value => {
      PENDING.delete(url)
      return value
    })
    PENDING.set(url, pending)
  }

  return pending
}

/**
 * 发到 UI 的百分比步进
 *  - 引擎 (FastImage) 按 0.5% 派发进度, 若逐 1% 更新, 单张图会重渲染外层组件约 100 次
 *  - 放宽到 5% 后约 20 次; 30px 圆环上 5% 仅约 4px 弧长, 观感几乎无差
 * */
export const PROGRESS_STEP = 5

/**
 * 把百分比吸附到步进倍数 (向下取整, 避免尚未完成就提前显示 100%)
 *  - null / 非有限数 透传 (交由圆环走不确定态)
 *  - step 非法时不吸附, 原样返回
 *  - 吸附结果为 0 (即 1%–4%) 也返回 null: 显示 0% 会得到一个静止的空弧,
 *    与 getProgressPercent「不足 1% 不显示」的意图一致, 宁可不退不确定态
 *
 * @param percent 0-100 的整数百分比
 * @param step 步进 (默认 PROGRESS_STEP)
 * */
export function stepPercent(percent: number | null, step: number = PROGRESS_STEP): number | null {
  if (typeof percent !== 'number' || !Number.isFinite(percent)) return null
  if (!Number.isFinite(step) || step <= 0) return percent

  const stepped = Math.floor(percent / step) * step
  return stepped > 0 ? stepped : null
}
