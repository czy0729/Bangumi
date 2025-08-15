/*
 * @Author: czy0729
 * @Date: 2021-03-07 20:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-29 04:49:11
 */
import React from 'react'
import { Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Stars({ value = 0, size = 11 }) {
  if (!value) return null

  const passProps = {
    style: {
      color: '#ffc107',
      lineHeight: _.fontSize(11).lineHeight
    },
    size
  } as const
  const sun = Math.floor(value / 25)
  const moon = Math.floor((value - sun * 25) / 5)
  const star = value - sun * 25 - moon * 5
  return (
    <>
      {!!sun &&
        new Array(sun)
          .fill('')
          .map((_item, index) => <Iconfont key={index} {...passProps} name='sunny' />)}
      {!!moon &&
        new Array(moon)
          .fill('')
          .map((_item, index) => <Iconfont key={index} {...passProps} name='moon' />)}
      {!!star &&
        new Array(star)
          .fill('')
          .map((_item, index) => <Iconfont key={index} {...passProps} name='star' />)}
    </>
  )
}

export default ob(Stars)
