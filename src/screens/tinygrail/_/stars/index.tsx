/*
 * @Author: czy0729
 * @Date: 2021-03-07 20:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 08:10:34
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Iconfont } from '@components'
import { _ } from '@stores'

function Stars({ value = 0, size = 11 }) {
  if (!value || value <= 0) return null

  const passProps = {
    style: {
      color: '#ffc107',
      lineHeight: _.fontSize11.lineHeight
    },
    size
  } as const

  const crown = Math.floor(value / 125)
  const sun = Math.floor((value - crown * 125) / 25)
  const moon = Math.floor((value - crown * 125 - sun * 25) / 5)
  const star = value % 5 // 余数即为星星数

  return (
    <>
      {!!crown &&
        new Array(crown)
          .fill('')
          .map((_, index) => <Iconfont key={`crown-${index}`} {...passProps} name='crown' />)}
      {!!sun &&
        new Array(sun)
          .fill('')
          .map((_, index) => <Iconfont key={`sun-${index}`} {...passProps} name='sunny' />)}
      {!!moon &&
        new Array(moon)
          .fill('')
          .map((_, index) => <Iconfont key={`moon-${index}`} {...passProps} name='moon' />)}
      {!!star &&
        new Array(star)
          .fill('')
          .map((_, index) => <Iconfont key={`star-${index}`} {...passProps} name='star' />)}
    </>
  )
}

export default observer(Stars)
