/*
 * @Author: czy0729
 * @Date: 2024-04-02 11:00:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-02 11:00:27
 */
export const NAMESPACE = 'TinygrailCompCharactersModal'

export const HIT_SLOP = {
  top: 6,
  right: 6,
  bottom: 6,
  left: 6
} as const

export const ITEMS_TYPE = {
  混沌魔方: 'chaos',
  虚空道标: 'guidepost',
  星光碎片: 'stardust',
  闪光结晶: 'starbreak',
  鲤鱼之眼: 'fisheye'
} as const

export const ITEMS_USED = {
  混沌魔方: 100,
  虚空道标: 90,
  星光碎片: 80,
  闪光结晶: 70,
  鲤鱼之眼: 60
} as const

export const ITEMS_NOTIFY = {
  虚空道标: `虚空道标：消耗100点塔值，抽取目标随机数量的股份，消耗目标的等级必须大于等于抽取目标等级。
    \n左侧数据基于自己的圣殿。
    \n右侧数据基于最高股息前面的角色，点击搜索可以查询远端所有角色。`,
  星光碎片: `星光碎片：消耗活股或塔值补充目标已损失塔值。
    \n消耗目标的等级必须大于等于补充目标等级，使用活股时消耗等级可以比目标等级少1级。
    \n塔值少于250时塔会找不到请自行查询远端数据。`,
  混沌魔方: `混沌魔方：消耗10点塔值，抽取随机目标10-100的股份。
  \n当前每天可使用3次。`
} as const
