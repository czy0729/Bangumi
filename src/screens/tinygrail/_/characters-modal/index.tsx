/*
 * @Author: czy0729
 * @Date: 2020-06-28 14:02:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-04 18:10:02
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Flex, Text } from '@components'
import { _, tinygrailStore } from '@stores'
import { getTimestamp, info, queue, trim } from '@utils'
import { useBackHandler, useMount, useObserver } from '@utils/hooks'
import { FROZEN_FN, LIST_EMPTY, M2 } from '@constants'
import { ListEmpty, Loaded } from '@types'
import Bottom from './bottom'
import Content from './content'
import Information from './information'
import LeftList from './left-list'
import Modal from './modal'
import RightList from './right-list'
import { assets, charge, getLocal, lv, refine, rk, setLocal } from './utils'
import { PickItem, Props } from './types'

export { ITEMS_TYPE, ITEMS_USED, ITEMS_NOTIFY } from './ds'

function CharactersModal({
  visible,
  title,
  leftItem,
  rightItem,
  rightItemId,
  onClose = FROZEN_FN,
  onSubmit
}: Props) {
  // 物品类型判断
  const itemType = useMemo(
    () => ({
      isChaos: title === '混沌魔方',
      isFishEye: title === '鲤鱼之眼',
      isGuidePost: title === '虚空道标',
      isStarBreak: title === '闪光结晶',
      isStarDust: title === '星光碎片'
    }),
    [title]
  )

  // 组件状态
  const [focus, setFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<PickItem[]>(null)
  const [amount, setAmount] = useState(0)
  const [isTemple] = useState(false)

  // 左侧列表相关状态
  const [left, setLeft] = useState<ListEmpty>({ ...LIST_EMPTY })
  const [leftFilter, setLeftFilter] = useState('')
  const [leftSelected, setLeftSelected] = useState<PickItem>(null)
  const [leftText, setLeftText] = useState('')

  // 右侧列表相关状态
  const [right, setRight] = useState<ListEmpty>({ ...LIST_EMPTY })
  const [rightFilter, setRightFilter] = useState('')
  const [rightSelected, setRightSelected] = useState<PickItem>(null)
  const [rightText, setRightText] = useState('')

  // 记录上次使用的道具类型
  const titleRef = useRef(title)

  // 用 ref 保存所有需要本地化的状态
  const stateRef = useRef({
    leftFilter,
    leftSelected,
    leftText,
    rightFilter,
    rightSelected,
    rightText
  })

  // 实时同步状态到 ref
  useEffect(() => {
    stateRef.current = {
      leftFilter,
      leftSelected,
      leftText,
      rightFilter,
      rightSelected,
      rightText
    }
  }, [leftFilter, leftSelected, leftText, rightFilter, rightSelected, rightText])

  // 是否可以提交
  const memoCanSubmit = useMemo(() => {
    if (itemType.isGuidePost) return !!(leftSelected && rightSelected)
    if (itemType.isStarDust) return !!(leftSelected && rightSelected && amount)
    return !!leftSelected
  }, [amount, itemType.isGuidePost, itemType.isStarDust, leftSelected, rightSelected])

  // 处理焦点变化
  const handleFocus = useCallback(() => {
    setFocus(true)
  }, [])
  const handleBlur = useCallback(() => {
    setFocus(false)
  }, [])

  // 关闭模态框
  const handleClose = useCallback(() => {
    onClose()
    setLoading(false)
    setLocal(stateRef.current)
  }, [onClose])

  // 数量变化处理
  const handleChangeAmount = useCallback((text: string) => {
    const value = parseInt(text)
    setAmount(Number.isNaN(value) || value === 0 ? 0 : value)
  }, [])

  // 搜索处理
  const handleSearch = useCallback(async () => {
    const keyword = trim(rightText)
    if (!keyword) {
      setSearch(null)
      info('请输入关键字')
      return
    }

    // 纯数字搜索视为 ID 搜索
    if (/^\d+$/.test(keyword)) {
      setSearch([
        {
          id: Number(keyword),
          name: '指定 ID 人物',
          level: 0
        }
      ])
      setRightSelected(null)
      return
    }

    // 执行搜索
    const result = await tinygrailStore.doSearch({
      keyword
    })
    if (result?.data?.State === 0) {
      const searchResults = result.data.Value.filter((item: { ICO: any }) => !item.ICO).map(
        (item: { Id: any; Name: any; Level: any }) => ({
          id: item.Id,
          name: item.Name,
          level: item.Level
        })
      )
      setSearch(searchResults)
      setRightSelected(null)
    }
  }, [rightText])

  // 左侧列表过滤
  const handleFilterLeft = useCallback((value: string) => {
    setLeftFilter(value)
  }, [])

  // 左侧项选择
  const handleSelectedLeft = useCallback(
    (item: PickItem) => {
      setLeftSelected(prev => {
        const isActive = prev?.id === item.id
        const newSelected = isActive ? null : item

        // 自动计算补充数量(仅星光碎片)
        setTimeout(() => {
          if (itemType.isStarDust && newSelected && rightSelected) {
            setAmount(Math.min(assets(newSelected), charge(rightSelected)))
          } else {
            setAmount(0)
          }
        }, 0)

        return newSelected
      })
    },
    [itemType.isStarDust, rightSelected]
  )

  // 左侧文本变化
  const handleChangeLeftText = useCallback((text: string) => {
    setLeftText(text)
  }, [])

  // 取消左侧选择
  const handleCancelLeft = useCallback(() => {
    setLeftSelected(null)
  }, [])

  // 右侧列表过滤
  const handleFilterRight = useCallback((value: string) => {
    setRightFilter(value)
  }, [])

  // 右侧项选择
  const handleSelectedRight = useCallback(
    (item: PickItem) => {
      setRightSelected(prev => {
        const isActive = prev?.id === item.id
        const newSelected = isActive ? null : item

        // 自动计算补充数量(仅星光碎片)
        setTimeout(() => {
          if (itemType.isStarDust && newSelected && leftSelected) {
            setAmount(Math.min(assets(leftSelected), charge(newSelected)))
          } else {
            setAmount(0)
          }
        }, 0)

        return newSelected
      })
    },
    [itemType.isStarDust, leftSelected]
  )

  // 右侧文本变化
  const handleChangeRightText = useCallback((text: string) => {
    const value = trim(text)
    setRightText(value)
    if (value === '') setSearch(null)
  }, [])

  // 取消右侧选择
  const handleCanceRight = useCallback(() => {
    setRightSelected(null)
  }, [])

  // 安卓返回键处理
  const handleBackAndroid = useCallback(() => {
    if (!visible) return false

    onClose()
    return true
  }, [onClose, visible])
  useBackHandler(handleBackAndroid)

  // 更新左侧列表数据
  const handleUpdateLeft = useCallback(() => {
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

    setLeft({ ...templeCopy, list: filteredList })
  }, [itemType.isGuidePost, itemType.isStarDust, isTemple, leftItem, leftText, rightItem])

  // 更新右侧列表数据
  const handleUpdateRight = useCallback(() => {
    if (!title || itemType.isChaos) return

    if (search) {
      setRight({
        list: [...search],
        pagination: { page: 1, pageTotal: 1 },
        _loaded: getTimestamp()
      })
      return
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

    setRight(rightData)
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

  // 提交表单
  const handleSubmit = useCallback(async () => {
    if (!memoCanSubmit || loading) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      if (itemType.isStarDust) setAmount(0)
    }, 1000)

    await onSubmit({
      title,
      monoId: leftSelected.id,
      toMonoId: rightSelected ? rightSelected.id : 0,
      amount,
      isTemple,
      leftItem: leftSelected,
      rightItem: rightSelected
    })
    if (itemType.isStarDust) handleUpdateLeft()
  }, [
    amount,
    handleUpdateLeft,
    isTemple,
    itemType.isStarDust,
    leftSelected,
    loading,
    memoCanSubmit,
    onSubmit,
    rightSelected,
    title
  ])

  // 请求数据
  const handleInitFetch = useCallback(
    async (refresh: boolean = false) => {
      const now = getTimestamp()
      const isStale = (loaded: Loaded) => (refresh ? true : !loaded || now - Number(loaded) > M2)
      await queue(
        [
          isStale(tinygrailStore.temple()._loaded) && (() => tinygrailStore.fetchTemple()),
          isStale(tinygrailStore.myCharaAssets.chara._loaded) &&
            (() => tinygrailStore.fetchMyCharaAssets()),
          isStale(tinygrailStore.msrc._loaded) && (() => tinygrailStore.fetchList('msrc')),
          isStale(tinygrailStore.star('1|100')._loaded) && (() => tinygrailStore.fetchStar(1, 100)),
          isStale(tinygrailStore.fantasy._loaded) && (() => tinygrailStore.fetchFantasyList())
        ].filter(Boolean) as (() => Promise<any>)[]
      )
      handleUpdateLeft()
      handleUpdateRight()
    },
    [handleUpdateLeft, handleUpdateRight]
  )

  // 下拉刷新
  // const handleHeaderRefresh = useCallback(() => {
  //   return handleInitFetch(true)
  // }, [handleInitFetch])

  // 设置右侧选中项
  const handleSetRightSelected = useCallback(
    (nextId: number) => {
      const id = nextId || rightItemId
      if (id && right.list?.length) {
        const foundItem = right.list.find(item => item.id == id)
        if (foundItem) {
          setRightSelected(foundItem)
          setRightFilter('')
        }
      }
    },
    [right.list, rightItemId]
  )

  // 初始化组件本地状态
  useMount(() => {
    const callback = async () => {
      try {
        const state = await getLocal()
        if (state?.leftFilter !== undefined) setLeftFilter(state.leftFilter)
        if (state?.leftSelected !== undefined) setLeftSelected(state.leftSelected)
        if (state?.leftText !== undefined) setLeftText(state.leftText)
        if (state?.rightFilter !== undefined) setRightFilter(state.rightFilter)
        if (state?.rightSelected !== undefined) setRightSelected(state.rightSelected)
        if (state?.rightText !== undefined) setRightText(state.rightText)
      } catch (error) {}
    }
    callback()
  })

  // 标题变化
  useEffect(() => {
    if (title && titleRef.current !== title) {
      titleRef.current = title
      setLoading(false)
      if (leftItem) setLeftFilter('')
      if (rightItem) setRightFilter('')
      setLeftSelected(leftItem || null)
      setRightSelected(rightItem || null)
      handleSetRightSelected(rightItemId)

      const initData = async () => {
        await handleInitFetch()
        handleSetRightSelected(rightItemId)
      }
      initData()
    }
  }, [handleInitFetch, handleSetRightSelected, leftItem, rightItem, rightItemId, title])

  // 左搜索框变化
  useEffect(() => {
    handleUpdateLeft()
  }, [leftText, handleUpdateLeft])

  // 右搜索框变化
  useEffect(() => {
    handleUpdateRight()
  }, [rightText, handleUpdateRight])

  return useObserver(() => (
    <Modal visible={visible} title={title} focus={focus} onClose={handleClose}>
      <Content>
        <Flex.Item>
          <LeftList
            source={left}
            filter={leftFilter}
            text={leftText}
            selected={leftSelected}
            isStarDust={itemType.isStarDust}
            isTemple={isTemple}
            onChangeText={handleChangeLeftText}
            onFilter={handleFilterLeft}
            onSelect={handleSelectedLeft}
          />
        </Flex.Item>
        <Flex.Item style={_.ml.md}>
          {itemType.isChaos ? (
            <Text type='tinygrailText' size={13} align='center'>
              随机目标
            </Text>
          ) : (
            <RightList
              source={right}
              filter={rightFilter}
              text={rightText}
              selected={rightSelected}
              isStarBreak={itemType.isStarBreak}
              onChangeText={handleChangeRightText}
              onFilter={handleFilterRight}
              onSelect={handleSelectedRight}
              onSubmitEditing={handleSearch}
            />
          )}
        </Flex.Item>
      </Content>
      <Information title={title} onClose={handleClose} />
      <Bottom
        leftSelected={leftSelected}
        rightSelected={rightSelected}
        amount={amount}
        loading={loading}
        canSubmit={memoCanSubmit}
        isChaos={itemType.isChaos}
        isFishEye={itemType.isFishEye}
        isGuidePost={itemType.isGuidePost}
        isStarBreak={itemType.isStarBreak}
        isStarDust={itemType.isStarDust}
        isTemple={isTemple}
        hasRight={!!right}
        onBlur={handleBlur}
        onCancelLeft={handleCancelLeft}
        onCancelRight={handleCanceRight}
        onChangeText={handleChangeAmount}
        onFocus={handleFocus}
        onSubmit={handleSubmit}
      />
    </Modal>
  ))
}

export default CharactersModal
