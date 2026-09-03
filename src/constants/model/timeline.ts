/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:19:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:19:30
 *
 * 字典 - 时间胶囊
 */
import { Model } from './utils'

export const TIMELINE_SCOPE = [
  {
    label: '好友',
    value: 'friend'
  },
  {
    label: '全站',
    value: 'all'
  },
  {
    label: '自己',
    value: 'self'
  }
] as const

/** 时间胶囊范围 */
export const MODEL_TIMELINE_SCOPE = new Model(TIMELINE_SCOPE, 'TIMELINE_SCOPE')

export const TIMELINE_TYPE = [
  {
    label: '全部',
    value: 'all'
  },
  {
    label: '吐槽',
    value: 'say'
  },
  {
    label: '收藏',
    value: 'subject'
  },
  {
    label: '进度',
    value: 'progress'
  },
  {
    label: '日志',
    value: 'blog'
  },
  {
    label: '人物',
    value: 'mono'
  },
  {
    label: '好友',
    value: 'relation'
  },
  {
    label: '小组',
    value: 'group'
  },
  {
    label: '维基',
    value: 'wiki'
  },
  {
    label: '目录',
    value: 'index'
  }
] as const

/** 时间胶囊类型 */
export const MODEL_TIMELINE_TYPE = new Model(TIMELINE_TYPE, 'TIMELINE_TYPE')

/** 超展开板块 */
