/*
 * @Author: czy0729
 * @Date: 2025-05-04 17:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-04 18:08:13
 */
import { useCallback, useState } from 'react'
import { tinygrailStore } from '@stores'
import { getTimestamp } from '@utils'
import { LIST_EMPTY } from '@constants'
import { assets, lv, refine, rk } from './utils'
import { PickItem, Props } from './types'

/** 物品类型判断 */
export const useItemType = (title: string) => {
  return {
    isChaos: title === '混沌魔方',
    isFishEye: title === '鲤鱼之眼',
    isGuidePost: title === '虚空道标',
    isStarBreak: title === '闪光结晶',
    isStarDust: title === '星光碎片'
  }
}

/** 道具框状态 */
export const useModalState = ({ leftItem, rightItem }: Props) => {
  // 组件状态
  const [focus, setFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<PickItem[]>(null)
  const [amount, setAmount] = useState(0)
  const [isTemple] = useState(false)

  // 左侧列表相关状态
  const [left, setLeft] = useState({ ...LIST_EMPTY })
  const [leftFilter, setLeftFilter] = useState('')
  const [leftSelected, setLeftSelected] = useState<PickItem>(leftItem || null)
  const [leftText, setLeftText] = useState('')

  // 右侧列表相关状态
  const [right, setRight] = useState({ ...LIST_EMPTY })
  const [rightFilter, setRightFilter] = useState('')
  const [rightSelected, setRightSelected] = useState<PickItem>(rightItem || null)
  const [rightText, setRightText] = useState('')

  return {
    focus,
    loading,
    search,
    amount,
    isTemple,
    left,
    leftFilter,
    leftSelected,
    leftText,
    right,
    rightFilter,
    rightSelected,
    rightText,
    setFocus,
    setLoading,
    setSearch,
    setAmount,
    setLeft,
    setLeftFilter,
    setLeftSelected,
    setLeftText,
    setRight,
    setRightFilter,
    setRightSelected,
    setRightText
  }
}

/** 更新左侧列表数据 */
export const useUpdateLeft = (
  itemType: ReturnType<typeof useItemType>,
  isTemple: boolean,
  leftItem: any,
  leftText: string,
  rightItem: any
) => {
  return useCallback(() => {
    const templeCopy = {
      ...tinygrailStore.temple(),
      list: [...tinygrailStore.temple().list]
    }

    let filteredList = templeCopy.list

    if (itemType.isGuidePost) {
      filteredList = filteredList
        .filter(item => {
          if (leftItem) return item.id === leftItem.id
          if (item.assets < 100 || item.sacrifices < 500) return false
          if (rightItem && leftText) return item?.name?.includes(leftText)
          if (leftText) return item?.name?.includes(leftText)
          return true
        })
        .sort((a, b) => a.rate - b.rate)
    } else if (itemType.isStarDust) {
      const dataCopy = isTemple
        ? { ...tinygrailStore.temple(), list: [...tinygrailStore.temple().list] }
        : {
            ...tinygrailStore.myCharaAssets.chara,
            list: [...tinygrailStore.myCharaAssets.chara.list]
          }

      filteredList = dataCopy.list
        .filter(item => {
          if (leftText && !item?.name?.includes(leftText)) return false
          if (rightItem) {
            const _lv = lv(item) - lv(rightItem)
            if (leftText) {
              if (isTemple) {
                return (
                  item?.name?.includes(leftText) && lv(item) + (isTemple ? 0 : 1) >= lv(rightItem)
                )
              }
              return item?.name?.includes(leftText) && assets(item) >= Math.min(32, 2 ** -(_lv + 1))
            }
            return isTemple
              ? lv(item) + (isTemple ? 0 : 1) >= lv(rightItem)
              : assets(item) >= Math.min(32, 2 ** -(_lv + 1))
          }
          if (leftText) return item?.name?.includes(leftText)
          return true
        })
        .sort((a, b) => {
          const lA = lv(a)
          const lB = lv(b)
          if (lA !== lB) return lB - lA
          return a.current - b.current
        })
    } else {
      filteredList = filteredList
        .filter(item => {
          if (leftItem) return item.id === leftItem.id
          if (assets(item) < 250 || item.sacrifices < 500) return false
          if (leftText) return item?.name?.includes(leftText)
          return true
        })
        .sort((a, b) => a.rate - b.rate)
    }

    return { ...templeCopy, list: filteredList }
  }, [itemType.isGuidePost, itemType.isStarDust, isTemple, leftItem, leftText, rightItem])
}

/** 更新右侧列表数据 */
export const useUpdateRight = (
  title: string,
  itemType: ReturnType<typeof useItemType>,
  isTemple: boolean,
  leftItem: any,
  rightItem: any,
  rightItemId: any,
  rightText: string,
  search: PickItem[] | null
) => {
  return useCallback(() => {
    if (!title || itemType.isChaos) return { ...LIST_EMPTY }

    if (search) {
      return {
        list: [...search],
        pagination: { page: 1, pageTotal: 1 },
        _loaded: getTimestamp()
      }
    }

    const rightData = { ...LIST_EMPTY }

    if (itemType.isGuidePost) {
      const msrcCopy = {
        ...tinygrailStore.msrc,
        list: [...tinygrailStore.msrc.list]
      }

      rightData.list = msrcCopy.list
        .filter(item => {
          if (rightText) return item?.name?.includes(rightText)
          return true
        })
        .sort((a, b) => rk(a) - rk(b))
    } else if (itemType.isStarDust) {
      const templeCopy = {
        ...tinygrailStore.temple(),
        list: [...tinygrailStore.temple().list]
      }

      rightData.list = templeCopy.list
        .filter(item => {
          if (rightItemId) return item.id === rightItemId
          if (rightItem) return item.id === rightItem.id
          if (item.assets === item.sacrifices) return false
          if (leftItem) {
            return rightText
              ? item?.name?.includes(rightText) && lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
              : lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
          }
          if (rightText) return item?.name?.includes(rightText)
          return true
        })
        .sort((a, b) => {
          const rankA = rk(a)
          const rankB = rk(b)
          const refineA = rankA <= 500 ? refine(a) : 0
          const refineB = rankB <= 500 ? refine(b) : 0
          return refineA || refineB ? refineB - refineA : rankA - rankB
        })
    } else if (itemType.isStarBreak) {
      const starCopy = {
        ...tinygrailStore.star('1|100'),
        list: [...tinygrailStore.star('1|100').list]
      }

      rightData.list = starCopy.list.filter(item => {
        if (rightText) return item?.name?.includes(rightText)
        return true
      })
    } else if (itemType.isFishEye) {
      const fantasyCopy = {
        ...tinygrailStore.fantasy,
        list: [...tinygrailStore.fantasy.list]
      }

      rightData.list = fantasyCopy.list.filter(item => {
        if (rightText) return item?.name?.includes(rightText)
        return true
      })
    } else {
      const templeCopy = {
        ...tinygrailStore.temple(),
        list: [...tinygrailStore.temple().list]
      }

      rightData.list = templeCopy.list
        .filter(item => {
          if (item.assets === item.sacrifices) return false
          if (leftItem) {
            if (rightText) {
              return (
                item?.name?.includes(rightText) && lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
              )
            }
            return lv(item) <= lv(leftItem) + (isTemple ? 0 : 1)
          }
          if (rightText) return item?.name?.includes(rightText)
          return true
        })
        .sort((a, b) => lv(b) - lv(a))
    }

    return rightData
  }, [
    itemType.isChaos,
    itemType.isFishEye,
    itemType.isGuidePost,
    itemType.isStarBreak,
    itemType.isStarDust,
    isTemple,
    leftItem,
    rightItem,
    rightItemId,
    rightText,
    search,
    title
  ])
}
