/*
 * @Author: czy0729
 * @Date: 2024-04-17 17:24:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 15:39:49
 */
import SHA1 from 'crypto-js/sha1'
import { logger } from '@utils/dev'
import { TaskQueue } from '../../scheduler/task-queue'
import { FileSystem } from '../file-system'
import { BASE_DIR, LEGACY_BASE_DIR, MAX_CACHE_FILES, MAX_CACHE_SIZE, TMP_TTL } from './ds'

import type { CacheFile, DownloadOptions } from './type'

/** 日志标签 */
const TAG = 'ImageCache'

/** 下载并发上限 */
const DOWNLOAD_CONCURRENCY = 3

/** 批量 IO 并发数 */
const IO_BATCH_SIZE = 25

/** 命中判定 / 淘汰决策的下载队列, 仅网络下载入队 */
const fsQueue = new TaskQueue(DOWNLOAD_CONCURRENCY)

/**
 * 会话级目录索引: 文件名集合
 * null 表示未构建, 首次访问时以一次 readDirectoryAsync 构建, 之后命中判定零 IO
 */
let dirIndexPromise: Promise<Set<string>> | null = null

/** 会话内残留 tmp 名单 (构建索引时顺带收集) */
let sessionTmps: string[] = []

/** 本会话写入文件的字节大小 (uri → bytes), 跨会话老文件无记录返回 0 */
const sessionSizes = new Map<string, number>()

/** 会话计数器 (汇总日志用) */
const counters = { hits: 0, writes: 0, failures: 0 }

/** 是否已完成旧版缓存目录的一次性清理 */
let legacyCleaned = false

/** uri → 条目登记表 (去重并发加载) */
const entries = new Map<string, CacheEntry>()

export class CacheEntry {
  uri: string
  options: DownloadOptions

  private loading?: Promise<
    | {
        path: string
        size: number
      }
    | undefined
  >

  constructor(uri: string, options: DownloadOptions) {
    this.uri = uri
    this.options = options
  }

  getPath(): Promise<
    | {
        path: string
        size: number
      }
    | undefined
  > {
    if (this.loading) return this.loading

    this.loading = this.resolve()
    return this.loading
  }

  /** 文件失效后清空已完成的加载状态, 允许下次 getPath 重新走磁盘判定与下载 */
  reset() {
    this.loading = undefined
  }

  private async resolve(): Promise<
    | {
        path: string
        size: number
      }
    | undefined
  > {
    const index = await getDirIndex()
    const { name, path } = getCacheNames(this.uri)

    if (index.has(name)) {
      counters.hits += 1
      return { path, size: sessionSizes.get(this.uri) || 0 }
    }

    return fsQueue.run(async () => {
      // 双重检查: 排队期间同文件可能已被其它任务写入
      if (index.has(name)) {
        counters.hits += 1
        return { path, size: sessionSizes.get(this.uri) || 0 }
      }

      const tmpPath = `${BASE_DIR}${name}.tmp`

      try {
        const result = await FileSystem.downloadAsync(this.uri, tmpPath, this.options)

        if (!result || result.status !== 200) {
          counters.failures += 1
          this.loading = undefined
          logger.error(TAG, 'download failed', result?.status ?? '-', shortName(this.uri))
          return undefined
        }

        await FileSystem.moveAsync({
          from: tmpPath,
          to: path
        })

        index.add(name)
        sessionSizes.set(this.uri, sizeFromHeaders(result.headers))
        counters.writes += 1

        return { path, size: sessionSizes.get(this.uri) || 0 }
      } catch (error) {
        counters.failures += 1
        this.loading = undefined
        logger.error(TAG, 'download error', shortName(this.uri), String(error))
        throw error
      }
    })
  }
}

/** 获取或创建 uri 对应的缓存条目 */
export function getEntry(uri: string, options: DownloadOptions): CacheEntry {
  let entry = entries.get(uri)
  if (!entry) {
    entry = new CacheEntry(uri, options)
    entries.set(uri, entry)
  }

  return entry
}

/**
 * 缓存失效: 移除内存命中记录与目录索引并重置条目, 下次 getPath 将重新下载
 * 本地文件损坏 ('The file') 或被外部删除时调用, 构成自愈闭环
 *
 * 已知边界: 若失效发生在该 uri 下载进行中, 完成回调仍会回填索引;
 * 当前触发链路 (渲染失败时文件早已落盘) 窗口极小, 接受不改
 */
export function invalidate(uri: string) {
  entries.get(uri)?.reset()
  sessionSizes.delete(uri)

  getDirIndex()
    .then(index => index.delete(getCacheNames(uri).name))
    .catch(() => {})
}

/** 重置会话状态 (clearCache 后调用) */
export function resetSession() {
  entries.clear()
  sessionSizes.clear()
  sessionTmps = []
  dirIndexPromise = null
  counters.hits = 0
  counters.writes = 0
  counters.failures = 0
}

/** 从响应头解析文件大小, 缺失或非法返回 0 */
export function sizeFromHeaders(headers: Record<string, string> = {}) {
  const raw = headers['Content-Length'] ?? headers['content-length']
  const size = Number(raw)

  return Number.isFinite(size) && size > 0 ? size : 0
}

/**
 * 由 uri 推导缓存文件名与目标路径
 * sha1(uri) 作主键; 扩展名取 pathname 最后一段 '.' 后缀 (query 不参与), 无扩展名默认 .jpg
 */
export function getCacheNames(uri: string): {
  name: string
  tmpName: string
  path: string
} {
  const hash = SHA1(uri).toString()

  const pathname = uri.split('?')[0]
  const dot = pathname.lastIndexOf('.')
  const slash = pathname.lastIndexOf('/')
  const ext = dot > slash && dot !== -1 ? pathname.slice(dot) : '.jpg'

  const name = `${hash}${ext}`

  return {
    name,
    tmpName: `${hash}.tmp`,
    path: `${BASE_DIR}${name}`
  }
}

/**
 * 目录条目分类
 * 有效缓存文件名进集合 (作为会话索引), .tmp 残留进名单等待回收
 */
export function classifyEntries(names: string[]): {
  files: Set<string>
  tmps: string[]
} {
  const files = new Set<string>()
  const tmps: string[] = []

  names.forEach(name => {
    if (name.endsWith('.tmp')) tmps.push(name)
    else files.add(name)
  })

  return { files, tmps }
}

/**
 * 淘汰决策: 新→旧排序累计, 超出数量或容量上限后的文件全部淘汰
 * 纯函数, 不做 IO
 */
export function pickOverflow(files: CacheFile[], maxFiles: number, maxSize: number): CacheFile[] {
  const sorted = [...files].sort((a, b) => b.time - a.time)

  let total = 0
  let overflow = sorted.length
  for (let i = 0; i < sorted.length; i += 1) {
    total += sorted[i].size
    if (i >= maxFiles || total > maxSize) {
      overflow = i
      break
    }
  }

  return sorted.slice(overflow)
}

/** 构建会话目录索引 (每会话一次), 顺带收集 tmp 残留名单与触发旧目录迁移清理 */
function buildIndex(): Promise<Set<string>> {
  // 一次性迁移清理: 移除旧 cacheDirectory 下的孤儿缓存 (幂等, 目录不存在即无操作)
  if (!legacyCleaned) {
    legacyCleaned = true
    FileSystem.deleteAsync(LEGACY_BASE_DIR, { idempotent: true }).catch(() => {})
  }

  return FileSystem.makeDirectoryAsync(BASE_DIR)
    .catch(() => {})
    .then(() => FileSystem.readDirectoryAsync(BASE_DIR))
    .then(names => {
      const { files, tmps } = classifyEntries(names)
      sessionTmps = tmps
      return files
    })
    .catch(error => {
      // 失败不缓存失败态, 下次访问重新构建
      dirIndexPromise = null
      throw error
    })
}

/** 获取会话目录索引 (懒构建, 共享 Promise 防并发重复构建) */
function getDirIndex(): Promise<Set<string>> {
  if (!dirIndexPromise) dirIndexPromise = buildIndex()

  return dirIndexPromise
}

/** 从 uri 提取短名用于日志 */
function shortName(uri: string) {
  const name = uri.split('?')[0]

  return name.slice(name.lastIndexOf('/') + 1) || uri
}

/** 分批读取文件元信息 (stat), 失败的单个文件跳过 */
async function statFiles(names: string[]): Promise<CacheFile[]> {
  const files: CacheFile[] = []

  for (let i = 0; i < names.length; i += IO_BATCH_SIZE) {
    const results = await Promise.all(
      names.slice(i, i + IO_BATCH_SIZE).map(async name => {
        try {
          const info = (await FileSystem.getInfoAsync(`${BASE_DIR}${name}`)) as {
            exists: boolean
            modificationTime?: number
            size?: number
          }

          if (!info.exists) return null

          return {
            uri: `${BASE_DIR}${name}`,
            time: (info.modificationTime || 0) * 1000,
            size: info.size || 0
          } as CacheFile
        } catch {
          return null
        }
      })
    )

    results.forEach(item => {
      if (item) files.push(item)
    })
  }

  return files
}

/** 分批删除文件, 单个失败忽略 */
async function deleteFiles(uris: string[]) {
  for (let i = 0; i < uris.length; i += IO_BATCH_SIZE) {
    await Promise.all(
      uris
        .slice(i, i + IO_BATCH_SIZE)
        .map(uri => FileSystem.deleteAsync(uri, { idempotent: true }).catch(() => {}))
    )
  }
}

/**
 * 清理图片缓存
 * - 回收超过 TMP_TTL 的残留 .tmp (仅 stat 名单内文件)
 * - 数量超出 MAX_CACHE_FILES 时才全量 stat 并按数量/容量上限从最旧淘汰
 *   (数量未超限时跳过全部 stat, 容量上限让位于数量上限)
 * - 结束输出会话计数汇总
 * 由 scheduleCleanup 在启动后延迟调度一次
 */
export async function cleanupCache() {
  try {
    const index = await getDirIndex()

    // tmp 回收: 只对构建索引时收集到的名单 stat mtime
    const expiredTmp: string[] = []
    if (sessionTmps.length) {
      const nowTs = Date.now()

      for (let i = 0; i < sessionTmps.length; i += IO_BATCH_SIZE) {
        const batch = sessionTmps.slice(i, i + IO_BATCH_SIZE)
        const infos = await Promise.all(
          batch.map(async name => {
            try {
              const info = (await FileSystem.getInfoAsync(`${BASE_DIR}${name}`)) as {
                exists: boolean
                modificationTime?: number
              }

              return info.exists && nowTs - (info.modificationTime || 0) * 1000 > TMP_TTL
                ? name
                : null
            } catch {
              return null
            }
          })
        )

        infos.forEach(name => {
          if (name) expiredTmp.push(`${BASE_DIR}${name}`)
        })
      }
    }

    // 数量未超限则不做全量 stat, 容量上限不生效
    let overflow: CacheFile[] = []
    if (index.size > MAX_CACHE_FILES) {
      const files = await statFiles([...index])
      overflow = pickOverflow(files, MAX_CACHE_FILES, MAX_CACHE_SIZE)
    }

    const obsoleteUris = [...expiredTmp, ...overflow.map(item => item.uri)]
    if (obsoleteUris.length) {
      await deleteFiles(obsoleteUris)
      overflow.forEach(item => index.delete(item.uri.slice(BASE_DIR.length)))
    }

    logger.warn(
      TAG,
      `hits=${counters.hits} write=${counters.writes} failed=${counters.failures}`,
      obsoleteUris.length
        ? `cleanup removed=${obsoleteUris.length} kept=${index.size}`
        : 'cleanup none'
    )
  } catch (error) {
    logger.error(TAG, 'cleanup error', String(error))
  }
}
