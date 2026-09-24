/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 11:31:23
 */
import { useState } from 'react'
import { useMount } from '@utils/hooks'
import { buildHistoryWeeks, buildWeeks, fetchRepoStats, mergeWeeks } from './utils'
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
  REPO_WEEKS_OWNER
} from './ds'

import type { RepoStats } from './types'

/** 首屏先用快照渲染, 请求回来后再替换 */
const INITIAL: RepoStats = {
  releases: REPO_PUBLISH_COUNT,
  commits: REPO_COMMIT_COUNT,
  additions: REPO_ADDITIONS,
  deletions: REPO_DELETIONS,
  login: REPO_USER,
  avatarUrl: REPO_AVATAR_URL,
  authorWeeks: mergeWeeks(
    buildHistoryWeeks(REPO_WEEKS_HISTORY_OWNER),
    buildWeeks(REPO_WEEKS_OWNER)
  ),
  weeks: mergeWeeks(buildHistoryWeeks(REPO_WEEKS_HISTORY_ALL), buildWeeks(REPO_WEEKS_ALL))
}

/**
 * 生命周期内只请求一次
 *  - cache 存最终结果, inflight 存进行中的请求, 避免重进页面或并发挂载重复发请求
 * */
let cache: RepoStats | null = null
let inflight: Promise<RepoStats> | null = null

function fetchOnce(): Promise<RepoStats> {
  if (cache) return Promise.resolve(cache)
  if (!inflight) {
    inflight = fetchRepoStats().then(stats => {
      cache = stats
      inflight = null
      return stats
    })
  }
  return inflight
}

/** 仓库的提交与发布数据 */
export function useGithubStats() {
  const [stats, setStats] = useState<RepoStats>(cache || INITIAL)

  useMount(() => {
    if (cache) return
    ;(async () => {
      setStats(await fetchOnce())
    })()
  })

  return stats
}
