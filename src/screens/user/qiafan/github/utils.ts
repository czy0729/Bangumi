/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { getTimestamp } from '@utils'
import { xhrTimeout } from '@utils/fetch'
import {
  REPO_ADDITIONS,
  REPO_AVATAR_URL,
  REPO_COMMIT_COUNT,
  REPO_DELETIONS,
  REPO_PUBLISH_COUNT,
  REPO_USER,
  REPO_WEEKS_ALL,
  REPO_WEEKS_HISTORY_ALL,
  REPO_WEEKS_HISTORY_OWNER,
  REPO_WEEKS_HISTORY_START,
  REPO_WEEKS_OWNER,
  URL_REPO_CONTRIBUTORS,
  URL_REPO_PARTICIPATION,
  URL_REPO_RELEASES
} from './ds'

import type { Contributor, Participation, RepoStats, Week } from './types'

const HEADERS = {
  Accept: 'application/vnd.github+json'
}

const DAY = 86400

/** 未鉴权的 GitHub 接口会被限流, 202 与异常都按取不到处理 */
async function requestJSON<T>(url: string): Promise<T | null> {
  try {
    const response = await xhrTimeout(url, 8000, HEADERS)
    return JSON.parse(response._response || '') as T
  } catch {
    return null
  }
}

/**
 * 发布数: 读响应头 Link 里 rel="last" 的页码
 *  - WEB 端 XHR 被展开成普通对象, 拿不到响应头, 返回 0 回退快照值
 * */
async function fetchReleasesCount() {
  try {
    const response = (await xhrTimeout(
      URL_REPO_RELEASES,
      8000,
      HEADERS
    )) as unknown as XMLHttpRequest
    const link =
      typeof response?.getResponseHeader === 'function'
        ? response.getResponseHeader('Link') || ''
        : ''
    const match = /[?&]page=(\d+)>;\s*rel="last"/.exec(link)
    return match ? Number(match[1]) : 0
  } catch {
    return 0
  }
}

/** 历史快照只有数量没有时间, 按 7 天一项从起始周展开 */
export function buildHistoryWeeks(data: number[]): Week[] {
  return data.map((c, index) => ({
    w: REPO_WEEKS_HISTORY_START + index * 7 * DAY,
    c
  }))
}

/**
 * 历史 + 最近 52 周, 重叠部分以新的为准
 *  - 历史是一次性抓取的快照, 之后只下载 participation 就能补全到当前周
 *  - history 里 w >= 首周 的项被丢弃, 由 recent 接管
 * */
export function mergeWeeks(history: Week[], recent: Week[]): Week[] {
  if (!recent.length) return history

  const start = recent[0].w
  return [...history.filter(item => item.w < start), ...recent]
}

/**
 * participation 只有数量没有时间, 按 GitHub 的规则补全周起始时间戳
 *  - 周以 UTC 周日为起点, 最后一项是当前周
 * */
export function buildWeeks(data: number[]): Week[] {
  const now = getTimestamp()
  const midnight = Math.floor(now / DAY) * DAY
  const weekday = new Date(midnight * 1000).getUTCDay()
  const sunday = midnight - weekday * DAY

  return data.map((c, index) => ({
    w: sunday - (data.length - 1 - index) * 7 * DAY,
    c
  }))
}

/** 历史快照拼上最近数据, recent 为空时回退到快照常量 */
function mergeByKey(
  historyData: number[],
  recentData: number[] | undefined,
  fallback: number[]
): Week[] {
  return mergeWeeks(
    buildHistoryWeeks(historyData),
    buildWeeks(recentData?.length ? recentData : fallback)
  )
}

/** 仓库统计, 任一项取不到都回退快照 */
export async function fetchRepoStats(): Promise<RepoStats> {
  const [contributors, participation, releases] = await Promise.all([
    requestJSON<Contributor[]>(URL_REPO_CONTRIBUTORS),
    requestJSON<Participation>(URL_REPO_PARTICIPATION),
    fetchReleasesCount()
  ])

  const author = contributors?.find(item => item?.login === REPO_USER)

  return {
    releases: releases || REPO_PUBLISH_COUNT,
    commits: author?.contributions || REPO_COMMIT_COUNT,
    additions: REPO_ADDITIONS,
    deletions: REPO_DELETIONS,
    login: author?.login || REPO_USER,
    avatarUrl: author?.avatar_url || REPO_AVATAR_URL,
    authorWeeks: mergeByKey(REPO_WEEKS_HISTORY_OWNER, participation?.owner, REPO_WEEKS_OWNER),
    weeks: mergeByKey(REPO_WEEKS_HISTORY_ALL, participation?.all, REPO_WEEKS_ALL)
  }
}
