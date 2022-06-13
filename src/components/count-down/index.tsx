/* eslint-disable no-bitwise */
/*
 * @Author: czy0729
 * @Date: 2019-12-11 14:50:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 11:04:02
 */
import React, { useState, useEffect } from 'react'
import { TextProps } from 'react-native'
import { getTimestamp } from '@utils'
import { Override } from '@types'
import { Text } from '../text'

type Props = Override<
  TextProps,
  {
    end: number
  }
>

export const CountDown = ({ end, ...other }: Props) => {
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
      {!!d && `${d}天`}
      {!!h && `${h}时`}
      {!!m && `${m}分`}
      {!!s && `${s}秒`}
    </Text>
  )
}
