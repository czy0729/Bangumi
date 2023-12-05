/*
 * @Author: czy0729
 * @Date: 2023-06-08 23:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-05 03:21:26
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image } from '../image'
import { Props as BgmProps } from './types'

export { BgmProps }

/** bgm.tv 表情 */
export const Bgm = observer(({ index = 1, size = 20, ...other }: BgmProps) => {
  if (!bgm) init()

  return (
    <Image
      src={bgm[index]}
      resizeMode='contain'
      size={size}
      placeholder={false}
      {...other}
    />
  )
})

let bgm: {
  [x: string]: string
}

function init() {
  bgm = {}
  for (let i = 1; i <= 102; i++) {
    bgm[i.toString()] = `https://bgm.tv/img/smiles/tv/${i
      .toString()
      .padStart(2, '0')}.gif`
  }
  return bgm
}
