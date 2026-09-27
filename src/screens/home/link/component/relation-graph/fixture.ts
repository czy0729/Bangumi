/*
 * @Author: czy0729
 * @Date: 2026-09-27 11:45:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 19:09:00
 *
 * 关系图测试数据 (真实抓取: 无职转生 bangumi-link/map/277/277554.json)
 */
import type { NodeItem } from '../../types'
import type { RelationEdge } from './types'

/** 全部节点 (原始顺序) */
export const NODES: NodeItem[] = [
  {
    id: 277554,
    name: '無職転生 ～異世界行ったら本気だす～',
    nameCN: '无职转生～到了异世界就拿出真本事～',
    date: '2021-01-10',
    type: 2,
    nsfw: false,
    platform: 'TV'
  },
  {
    id: 325585,
    name: '無職転生 ～異世界行ったら本気だす～ 第2クール',
    nameCN: '无职转生～到了异世界就拿出真本事～ 第2部分',
    date: '2021-10-03',
    type: 2,
    nsfw: false,
    platform: 'TV'
  },
  {
    id: 419363,
    name: '無職転生 心の声ラジオ',
    nameCN: '无职转生 心之声广播',
    date: '2021-01-04',
    type: 6,
    nsfw: false,
    platform: '其他'
  },
  {
    id: 373247,
    name: '無職転生Ⅱ ～異世界行ったら本気だす～',
    nameCN: '无职转生 第二季 ～到了异世界就拿出真本事～',
    date: '2023-07-02',
    type: 2,
    nsfw: false,
    platform: 'TV'
  },
  {
    id: 444557,
    name: '無職転生Ⅱ ～異世界行ったら本気だす～ 第2クール',
    nameCN: '无职转生 第二季 ～到了异世界就拿出真本事～ 第2部分',
    date: '2024-04-07',
    type: 2,
    nsfw: false,
    platform: 'TV'
  },
  {
    id: 501963,
    name: '無職転生Ⅲ ～異世界行ったら本気だす～',
    nameCN: '无职转生 第三季 ～到了异世界就拿出真本事～',
    date: '2026-07-04',
    type: 2,
    nsfw: false,
    platform: 'TV'
  }
]

/** 全部关联线 (原始顺序) */
export const RELATES: RelationEdge[] = [
  { relate: '续集', src: 277554, dst: 325585 },
  { relate: '衍生', src: 277554, dst: 419363 },
  { relate: '前传', src: 325585, dst: 277554 },
  { relate: '续集', src: 325585, dst: 373247 },
  { relate: '前传', src: 373247, dst: 325585 },
  { relate: '续集', src: 373247, dst: 444557 },
  { relate: '衍生', src: 419363, dst: 277554 },
  { relate: '前传', src: 444557, dst: 373247 },
  { relate: '续集', src: 444557, dst: 501963 },
  { relate: '前传', src: 501963, dst: 444557 }
]

/** 按日期排序后的节点 ID 顺序 */
export const SORTED_IDS = [419363, 277554, 325585, 373247, 444557, 501963]
