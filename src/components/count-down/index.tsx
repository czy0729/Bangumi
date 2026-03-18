/*
 * @Author: czy0729
 * @Date: 2019-12-11 14:50:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:44:19
 */
import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { getTimestamp } from '@utils'
import { r } from '@utils/dev'
import { Text } from '../text'
import { COMPONENT } from './ds'

import type { Props as CountDownProps } from './types'
export type { CountDownProps }

/** 倒数 */
export const CountDown = observer(({ end, ...other }: CountDownProps) => {
  r(COMPONENT)

  const [now, setNow] = useState(getTimestamp())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getTimestamp())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const distance = end - now
  if (!distance) return null

  const d = (distance / 86400) | 0
  const h = ((distance - d * 86400) / 3600) | 0
  const m = ((distance - d * 86400 - h * 3600) / 60) | 0
  const s = (distance - d * 86400 - h * 3600 - m * 60) | 0

  return (
    <Text {...other}>
      {[d && `${d}天`, h && `${h}时`, m && `${m}分`, s && `${s}秒`].filter(Boolean).join('')}
    </Text>
  )
})

export default CountDown
