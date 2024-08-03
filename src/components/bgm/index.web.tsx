/*
 * @Author: czy0729
 * @Date: 2023-06-08 23:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 21:37:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { Image } from '../image'
import { COMPONENT } from './ds'
import { Props as BgmProps } from './types'

export { BgmProps }

/** bgm.tv 表情 */
export const Bgm = observer(({ index = 1, size = 20, ...other }: BgmProps) => {
  r(COMPONENT)

  if (!bgm) init()

  return <Image src={bgm[index]} resizeMode='contain' size={size} placeholder={false} {...other} />
})

export default Bgm

let bgm: {
  [x: string]: string
}

function init() {
  bgm = {}
  for (let i = 1; i <= 102; i += 1) {
    bgm[i.toString()] = `https://bgm.tv/img/smiles/tv/${i.toString().padStart(2, '0')}.gif`
  }
  return bgm
}
