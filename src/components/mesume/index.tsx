/*
 * Bangumi 娘
 * @Author: czy0729
 * @Date: 2019-06-01 19:28:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 17:24:02
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ASSETS_MUSUMES } from '@constants'
import { Image } from '../image'
import { Props as MesumeProps } from './types'

export { MesumeProps }

export const Mesume = observer(({ style, size = 96, index }: MesumeProps) => {
  // 获取 1-7 之间的随机数
  const key = Math.floor(Math.random() * 7) + 1
  const currentIndex = index || key
  return (
    <Image
      style={style}
      src={ASSETS_MUSUMES[currentIndex]}
      resizeMode='contain'
      size={size}
      placeholder={false}
      fadeDuration={0}
    />
  )
})
