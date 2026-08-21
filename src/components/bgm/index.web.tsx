/*
 * @Author: czy0729
 * @Date: 2023-06-08 23:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:13:41
 */
import React, { memo } from 'react'
import { r } from '@utils/dev'
import { Component } from '../component'
import { Image } from '../image'
import { getBgmMap } from './utils'
import { COMPONENT } from './ds'
import './index.scss'

import type { Props as BgmProps } from './types'
export type { BgmProps }

let bgm: Record<string, string>

/** BGM 表情 */
export const Bgm = memo(({ index = 1, size = 20, ...other }: BgmProps) => {
  r(COMPONENT)

  if (!bgm) bgm = getBgmMap()

  return (
    <Component id='component-bgm'>
      <Image
        src={bgm[String(index)]}
        resizeMode='contain'
        size={size}
        placeholder={false}
        {...other}
      />
    </Component>
  )
})

export default Bgm
