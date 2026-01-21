/*
 * @Author: czy0729
 * @Date: 2022-05-22 14:02:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 18:44:08
 */
export type CollectionAction = 'create' | 'update'

/**
 * 列表类型
 *  - mvc: 最高市值
 *  - mrc: 最大涨幅
 *  - mfc: 最大跌幅
 *  - mvi: ICO最多资金
 *  - mpi: ICO最高人气
 *  - rai: ICO最近活跃
 *  - mri: ICO即将结束
 *  - recent: 最近活跃
 *  - tnbc: 新番市值
 *  - nbc: 新番活跃
 *  - msrc: 最高股息
 */
export type TinygrailType =
  | 'mvc'
  | 'mrc'
  | 'mfc'
  | 'mvi'
  | 'mpi'
  | 'rai'
  | 'mri'
  | 'recent'
  | 'tnbc'
  | 'nbc'
  | 'msrc'

/**
 * 道具类型
 *  - chaos: 混沌魔方
 *  - guidepost: 虚空道标
 *  - stardust: 星光碎片
 *  - starbreak: 闪光结晶
 *  - fisheye: 鲤鱼之眼
 *  - refine: 精炼
 */
export type TinygrailMagic = 'chaos' | 'guidepost' | 'stardust' | 'starbreak' | 'fisheye' | 'refine'
