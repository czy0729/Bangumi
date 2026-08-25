/*
 * @Author: czy0729
 * @Date: 2026-08-25 19:45:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 19:45:40
 */
import { useEffect } from 'react'
import { _ } from '@stores'
import { postTask } from '@utils'
import { WSA } from '@constants'
import useDimensions from './useDimensions'

/** WSA 子系统窗口是可以随意改变大小的, 每次变化后重新计算布局 */
export default function useWSALayout() {
  const { window } = useDimensions()

  useEffect(() => {
    if (!WSA) return

    postTask(() => {
      _.updateLayout()
    })
  }, [window])
}
