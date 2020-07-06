/* eslint-disable no-bitwise */
/*
 * @Author: czy0729
 * @Date: 2019-12-11 14:50:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-06 15:18:31
 */
import React, { useState, useEffect } from 'react'
import { getTimestamp } from '@utils'
import Text from './text'

function CountDown({ end, ...other }) {
  const [now, setNow] = useState(getTimestamp())
  const distance = end - now
  if (!distance) {
    return null
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(getTimestamp())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
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

export default CountDown
