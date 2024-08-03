/*
 * @Author: czy0729
 * @Date: 2019-06-01 19:28:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:45:58
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { ASSETS_MUSUMES } from '@constants'
import { Component } from '../component'
import { Image } from '../image'
import { COMPONENT } from './ds'
import { Props as MesumeProps } from './types'

export { MesumeProps }

/** Bangumi 看板娘 */
export const Mesume = observer(({ style, size = 96, index }: MesumeProps) => {
  r(COMPONENT)

  // 获取 1-7 之间的随机数
  const key = Math.floor(Math.random() * 7) + 1
  const currentIndex = index || key
  return (
    <Component id='component-mesume'>
      <Image
        style={style}
        src={ASSETS_MUSUMES[currentIndex]}
        resizeMode='contain'
        size={size}
        placeholder={false}
        fadeDuration={0}
      />
    </Component>
  )
})

export default Mesume
