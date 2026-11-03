/*
 * @Author: czy0729
 * @Date: 2022-08-20 10:24:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-04 12:00:00
 *
 * 网络探针: 站点清单与延迟档位判定
 */
import {
  API_CALENDAR,
  API_HOST_TINYGRAIL,
  API_MK_STATUS_HOST,
  GITHUB_RELEASE_REPOS,
  HOST,
  HOST_AC,
  HOST_IMAGE_UPLOAD_RYMK,
  HOST_NETABA,
  SITE_AGEFANS,
  URL_OAUTH
} from '@constants'
import { getOriginConfig } from '../origin-setting/utils'
import { PING_TIMEOUT, STATUS_FAST, STATUS_OK, URL_PROBE_BILIBILI, URL_PROBE_YOUKU } from './ds'

import type { Origin } from '@types'
import type { ProbeStatus, Site } from './types'

/**
 * 生成一条待检测站点
 *
 * @param desc 说明文案
 * @param url 请求地址
 * @param headers 额外请求头
 */
function createSite(desc: string, url: string, headers?: Record<string, string>): Site {
  return {
    desc,
    url,
    msg: [],
    loading: false,
    headers
  }
}

/**
 * 用户配置的源头, 只取启用且为 http 地址的项
 *
 * @param origin 用户的源头配置
 */
function getOriginSites(origin: Origin): Site[] {
  try {
    return Object.values(getOriginConfig(origin))
      .flat()
      .filter(item => item.active === 1 && String(item.url).startsWith('http'))
      .map(item => createSite(`${item.name} (源头)`, item.url))
  } catch {
    return []
  }
}

/**
 * 站点清单: 固定依赖 + 用户配置的源头
 *
 * @param origin 用户的源头配置
 */
export function getSitesList(origin: Origin): Site[] {
  return [
    createSite('主站 (必要)', `${HOST}/about/copyright`),
    createSite('主站 API (必要)', API_CALENDAR()),
    createSite('授权登录服务 (登录必要)', URL_OAUTH),
    createSite('服务状态', `${API_MK_STATUS_HOST}/api/mini`),
    createSite('小圣杯 API', API_HOST_TINYGRAIL),
    createSite('客户端版本检测', GITHUB_RELEASE_REPOS),
    createSite('免费图床', HOST_IMAGE_UPLOAD_RYMK),
    createSite('bilibili 番剧预览图', URL_PROBE_BILIBILI, {
      Referer: `${HOST_AC}/`
    }),
    createSite('youku 番剧预览图', URL_PROBE_YOUKU, {
      Referer: 'https://list.youku.com/'
    }),
    createSite('Agefans', `${SITE_AGEFANS()}/update`),
    createSite('netaba.re', HOST_NETABA),
    ...getOriginSites(origin)
  ]
}

/**
 * 延迟中位数: 只统计成功样本, 首次建连与偶发抖动不会拉偏判定; 全部失败按超时计
 */
export function getMedianLatency(msg: number[]) {
  const valid = msg.filter(item => item > 0).sort((a, b) => a - b)
  if (!valid.length) return PING_TIMEOUT

  const mid = Math.floor(valid.length / 2)
  return valid.length % 2 ? valid[mid] : Math.round((valid[mid - 1] + valid[mid]) / 2)
}

/** 探测档位: 任意一次失败即红色, 否则按延迟中位数分档 */
export function getStatus(msg: number[]): ProbeStatus {
  if (msg.some(item => !item)) return 'danger'

  const latency = getMedianLatency(msg)
  if (latency <= STATUS_FAST) return 'success'
  if (latency <= STATUS_OK) return 'warning'
  return 'danger'
}
