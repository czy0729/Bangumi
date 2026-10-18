/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:08:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:31:16
 *
 * 维基人页面的类型定义
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

/** 顶部标签下标 (编辑 / 关联 / 入库) */
export type TopIndex = 0 | 1 | 2

/** 编辑标签下标 (条目 / 锁定 / 合并 / 角色 / 人物 / 章节) */
export type TypeIndex = 0 | 1 | 2 | 3 | 4 | 5

/** 关联标签下标 (条目关联 / 人物关联 / 角色关联) */
export type RelationIndex = 0 | 1 | 2

/** 入库标签下标 (全部 / 动画 / 书籍 / 音乐 / 游戏 / 三次元) */
export type LastIndex = 0 | 1 | 2 | 3 | 4 | 5
