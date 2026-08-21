/*
 * @Author: czy0729
 * @Date: 2019-06-16 04:41:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 00:56:04
 */
import React, { memo } from 'react'
import { r } from '@utils/dev'
import { Image } from '../image'
import { getBgmAssets } from './assets'
import { COMPONENT } from './ds'

import type { Props as BgmProps } from './types'
export type { BgmProps }

let bgm: Record<number, number>

/** BGM 表情 (渲染为图片) */
export const Bgm = memo(({ index = 1, size = 20, ...other }: BgmProps) => {
  r(COMPONENT)

  if (!bgm) bgm = getBgmAssets()

  return (
    <Image
      src={bgm[Number(index)] as number}
      resizeMode='contain'
      size={size}
      placeholder={false}
      {...other}
    />
  )
})

export default Bgm
