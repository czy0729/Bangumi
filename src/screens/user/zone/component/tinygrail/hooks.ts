/*
 * @Author: czy0729
 * @Date: 2026-06-17 18:38:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-17 19:03:56
 */
import { useCallback, useMemo, useState } from 'react'
import { Animated } from 'react-native'
import { tinygrailStore, useStore } from '@stores'
import { feedback, HTMLDecode, info } from '@utils'
import { t } from '@utils/fetch'
import { ANDROID, USE_NATIVE_DRIVER } from '@constants'
import { TAB_PAGE } from '../../ds'
import { COMPONENT, DEFAULT_AMOUNT, MAX_AMOUNT, MIN_AMOUNT, STEP_AMOUNT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

/** 红包相关状态和操作 */
export function useRedPacket() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const [showRedPacket, setShowRedPacket] = useState(false)
  const [amount, setAmount] = useState(String(DEFAULT_AMOUNT))
  const [message, setMessage] = useState('')

  const handleOpenRedPacket = useCallback(() => {
    setAmount(String(DEFAULT_AMOUNT))
    setMessage('')
    setShowRedPacket(true)
  }, [])

  const handleCloseRedPacket = useCallback(() => {
    setShowRedPacket(false)
  }, [])

  const handleStepMinus = useCallback(() => {
    const next = Math.max(MIN_AMOUNT, (parseInt(amount) || MIN_AMOUNT) - STEP_AMOUNT)
    setAmount(String(next))
    feedback(true)
  }, [amount])

  const handleStepPlus = useCallback(() => {
    const next = Math.min(MAX_AMOUNT, (parseInt(amount) || MIN_AMOUNT) + STEP_AMOUNT)
    setAmount(String(next))
    feedback(true)
  }, [amount])

  const handleChangeAmount = useCallback((text: string) => {
    const num = parseInt(text)
    if (isNaN(num)) {
      setAmount('')
    } else {
      setAmount(String(Math.min(MAX_AMOUNT, Math.max(0, num))))
    }
  }, [])

  const handleChangeMessage = useCallback((text: string) => {
    if (text.length <= 20) setMessage(text)
  }, [])

  const handleSendRedPacket = useCallback(async () => {
    const numAmount = parseInt(amount)
    if (isNaN(numAmount) || numAmount < MIN_AMOUNT || numAmount > MAX_AMOUNT) {
      info(`金额需在 ${MIN_AMOUNT}-${MAX_AMOUNT} 之间`)
      return
    }

    const userId = $.username
    if (!userId) {
      info('无法获取用户 ID')
      return
    }

    try {
      const data = await tinygrailStore.doSendRedPacket(userId, numAmount, message)
      if (data?.State === 0) {
        info(data.Value || '发送成功')
        setShowRedPacket(false)
      } else {
        info(data?.Message || '发送失败')
      }
    } catch {
      info('发送失败')
    }
  }, [amount, message, $])

  return {
    showRedPacket,
    amount,
    message,
    handleOpenRedPacket,
    handleCloseRedPacket,
    handleStepMinus,
    handleStepPlus,
    handleChangeAmount,
    handleChangeMessage,
    handleSendRedPacket
  }
}

/** 红包记录相关状态和操作 */
export function useRedPacketLog() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const [showLog, setShowLog] = useState(false)

  const handleOpenLog = useCallback(async () => {
    const userId = $.username
    if (!userId) {
      info('无法获取用户 ID')
      return
    }
    setShowLog(true)
    await tinygrailStore.fetchRedPacketLog(userId)
  }, [$])

  const handleCloseLog = useCallback(() => {
    setShowLog(false)
  }, [])

  const handlePressUser = useCallback(
    (userName: string) => {
      handleCloseLog()

      setTimeout(() => {
        navigation.push('Zone', {
          userId: userName
        })
      }, 400)
    },
    [navigation, handleCloseLog]
  )

  const redPacketLog = tinygrailStore.redPacketLog($.username)

  return {
    showLog,
    redPacketLog,
    handleOpenLog,
    handleCloseLog,
    handlePressUser
  }
}

/** 滚动和导航相关 */
export function useTinygrailScroll({ onScroll }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  /** iOS 才需要 scroll 同步 */
  const handleScrollEvent = useMemo(() => {
    if (ANDROID) return undefined

    return Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: $.scrollY
            }
          }
        }
      ],
      {
        useNativeDriver: USE_NATIVE_DRIVER,
        listener: onScroll
      }
    )
  }, [$, onScroll])

  /** iOS 才需要 ref 转发 */
  const handleRef = useCallback(
    (ref: any) => {
      if (ANDROID) return

      $.forwardRef(ref, TAB_PAGE.tinygrail)
    },
    [$]
  )

  const handlePress = useCallback(() => {
    navigation.push('TinygrailCharaAssets', {
      userId: $.username,
      userName: HTMLDecode($.usersInfo.nickname),
      from: 'tinygrail'
    })

    t('空间.跳转', {
      userId: $.userId,
      to: 'TinygrailCharaAssets'
    })
  }, [$, navigation])

  return {
    handleScrollEvent,
    handleRef,
    handlePress
  }
}
