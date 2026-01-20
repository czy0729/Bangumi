/*
 * @Author: czy0729
 * @Date: 2022-05-22 14:02:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 18:44:08
 */

/**
 * 管理收藏的动作
 *  - create 添加收藏
 *  - update 更新收藏（推荐统一使用）
 */
export type ApiCollectionAction = 'create' | 'update'

/** 封面图大小 */
export type ApiCoverType = 'small' | 'grid' | 'medium' | 'large'

/** 角色类型 */
export type ApiMonoType = 'characters' | 'persons'

/**
 * 列表类型
 *  - mvc    最高市值
 *  - mrc    最大涨幅
 *  - mfc    最大跌幅
 *  - mvi    ICO 最多资金
 *  - mpi    ICO 最高人气
 *  - rai    ICO 最近活跃
 *  - mri    ICO 即将结束
 *  - recent 最近活跃
 *  - tnbc   新番市值
 *  - nbc    新番活跃
 *  - msrc   最高股息
 */
export type ApiTinygrailType =
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
 *  - chaos     混沌魔方
 *  - guidepost 虚空道标
 *  - stardust  星光碎片
 *  - starbreak 闪光结晶
 *  - fisheye   鲤鱼之眼
 *  - refine    精炼
 */
export type ApiTinygrailMagic =
  | 'chaos'
  | 'guidepost'
  | 'stardust'
  | 'starbreak'
  | 'fisheye'
  | 'refine'
