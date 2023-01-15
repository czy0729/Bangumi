/*
 * Bangumi 娘
 * @Author: czy0729
 * @Date: 2019-06-01 19:28:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-15 10:37:17
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Source } from '@types'
import { Image } from '../image'
import { Props as MesumeProps } from './types'

export { MesumeProps }

let musume: {
  [x: string]: Source
}

function init() {
  musume = {
    1: require('@assets/images/musume/musume1.png'),
    2: require('@assets/images/musume/musume2.png'),
    3: require('@assets/images/musume/musume3.png'),
    4: require('@assets/images/musume/musume4.png'),
    5: require('@assets/images/musume/musume5.png'),
    6: require('@assets/images/musume/musume6.png'),
    7: require('@assets/images/musume/musume7.png')
  }
}

export const Mesume = observer(({ style, size = 96, index }: MesumeProps) => {
  if (!musume) init()

  // 获取 1-7 之间的随机数
  const key = Math.floor(Math.random() * 7) + 1
  return (
    <Image
      style={style}
      src={musume[index || key]}
      resizeMode='contain'
      size={size}
      placeholder={false}
      fadeDuration={0}
    />
  )
})
