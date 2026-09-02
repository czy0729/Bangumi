/*
 * @Author: czy0729
 * @Date: 2019-06-01 19:28:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 05:36:16
 */
import React, { memo } from 'react'
import { r } from '@utils/dev'
import { ASSETS_MUSUMES } from '@constants'
import { Component } from '../component'
import { Image } from '../image'
import { randomMesumeIndex } from './utils'
import { COMPONENT } from './ds'

import type { Props as MesumeProps } from './types'
export type { MesumeProps }

/** Bangumi 看板娘 */
export const Mesume = memo(({ style, size = 96, index }: MesumeProps) => {
  r(COMPONENT)

  const currentIndex = index || randomMesumeIndex()

  return (
    <Component id='component-mesume'>
      <Image
        style={style}
        src={ASSETS_MUSUMES[currentIndex] as string | number}
        resizeMode='contain'
        size={size}
        placeholder={false}
        fadeDuration={0}
      />
    </Component>
  )
})

export default Mesume
