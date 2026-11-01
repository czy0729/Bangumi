/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 安卓返回键: 弹窗打开时先关弹窗
 */
import { useEffect, useRef } from 'react'
import { BackHandler } from 'react-native'
import { FROZEN_FN } from '@constants'

/**
 * 安卓返回键: 打开时先关弹窗
 * 只注册一次, 用 ref 读取最新状态
 */
export function useBackClose({
  visible = false,
  onClose = FROZEN_FN
}: {
  visible?: boolean
  onClose?: () => void
}) {
  const visibleRef = useRef(visible)
  const onCloseRef = useRef(onClose)
  visibleRef.current = visible
  onCloseRef.current = onClose

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!visibleRef.current) return false

      onCloseRef.current()
      return true
    })

    return () => subscription.remove()
  }, [])
}
