/*
 * Bangumi娘
 * @Author: czy0729
 * @Date: 2019-06-01 19:28:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-07 17:56:47
 */
import React from 'react'
import { observer } from 'mobx-react'
import Image from './image'

const musume = {
  1: require('@assets/images/musume1.png'),
  2: require('@assets/images/musume2.png'),
  3: require('@assets/images/musume3.png'),
  4: require('@assets/images/musume4.png'),
  5: require('@assets/images/musume5.png'),
  6: require('@assets/images/musume6.png'),
  7: require('@assets/images/musume7.png')
}

function Mesume({ style, size, index }) {
  // 获取1-7之间的随机数
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
}

Mesume.defaultProps = {
  style: undefined,
  size: 96,
  index: undefined
}

export default observer(Mesume)
