/*
 * @Author: czy0729
 * @Date: 2024-04-02 11:01:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 23:15:43
 */
import type { Fn } from '@types'

/** 小圣杯道具/角色项 */
export type PickItem = Partial<{
  /** 卖单数量 */
  asks: number

  /** 买单数量 */
  bids: number

  /** 奖励 */
  bonus: number

  /** 涨跌 */
  change: number

  /** 当前价格 */
  current: number

  /** 收盘价 */
  end: number

  /** 涨跌幅 */
  fluctuation: any

  /** 头像 */
  icon: any

  /** ID */
  id: number

  /** 上次操作 */
  lastOrder: string

  /** 等级 */
  level: number

  /** 上市日期 */
  listedDate: string

  /** 市值 */
  marketValue: number

  /** 关联角色ID */
  monoId: number

  /** 名称 */
  name: string

  /** 排名 */
  rank: number

  /** 涨幅 */
  rate: number

  /** 献祭值/固定资产 */
  sacrifices: number

  /** 星之力 */
  starForces: number

  /** 星级 */
  stars: number

  /** 状态/活股 */
  state: number

  /** 总股数 */
  total: number

  /** 用户数量 */
  users: any

  /** 流通股/资产 */
  assets: number

  /** 精炼值 */
  refine: number

  /** 用户持有数量 */
  userAmount: number
}>

/** 道具选择弹窗 Props */
export type Props = {
  /** 道具名称 */
  title?: string

  /** 是否显示 */
  visible?: boolean

  /** 左侧选中的角色 */
  leftItem?: PickItem

  /** 右侧指定角色ID */
  rightItemId?: number

  /** 右侧选中的角色 */
  rightItem?: PickItem

  /** 关闭回调 */
  onClose?: Fn

  /** 提交回调 */
  onSubmit?: Fn
}
