/*
 * @Author: czy0729
 * @Date: 2021-03-07 20:26:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:46:36
 */
import React from 'react'
import { Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Stars({ value = 0, size = 11 }) {
  if (!value) return null

  const style = {
    lineHeight: _.fontSize(12).lineHeight
  }
  const sun = Math.floor(value / 25)
  const moon = Math.floor((value - sun * 25) / 5)
  const star = value - sun * 25 - moon * 5
  return (
    <>
      {!!sun &&
        new Array(sun)
          .fill('')
          .map((_item, index) => (
            <Iconfont key={index} style={style} name='sunny' size={size} color='#ffc107' />
          ))}
      {!!moon &&
        new Array(moon)
          .fill('')
          .map((_item, index) => (
            <Iconfont key={index} style={style} name='moon' size={size} color='#ffc107' />
          ))}
      {!!star &&
        new Array(star)
          .fill('')
          .map((_item, index) => (
            <Iconfont key={index} style={style} name='md-star' size={size} color='#ffc107' />
          ))}
    </>
  )
}

export default ob(Stars)
