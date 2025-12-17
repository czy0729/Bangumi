/*
 * @Author: czy0729
 * @Date: 2025-12-17 06:07:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 06:08:36
 */
import { xhrCustom } from '@utils/fetch'
import { HOST_DOGE } from '@constants'

import type { SubjectId } from '@types'

type CacheItem = {
  nodeId: number
  extra: boolean
}

const cacheMap = new Map<SubjectId, CacheItem>()

export async function getNodeId(subjectId: SubjectId): Promise<CacheItem | null> {
  const cached = cacheMap.get(subjectId)
  if (cached) return cached

  const group = Math.floor(Number(subjectId) / 1000)
  let nodeId = 0
  let extra = false

  try {
    const res = await xhrCustom({
      url: `${HOST_DOGE}/bangumi-link/node/${group}/${subjectId}`
    })
    nodeId = Number(res._response)
  } catch (_) {}

  if (!nodeId) {
    try {
      const res = await xhrCustom({
        url: `${HOST_DOGE}/bangumi-link-extra/node/${group}/${subjectId}`
      })
      nodeId = Number(res._response)
      extra = true
    } catch (_) {}
  }

  if (!nodeId) return null

  const result = { nodeId, extra }
  cacheMap.set(subjectId, result)

  return result
}
