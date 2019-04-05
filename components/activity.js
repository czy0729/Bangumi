/*
 * @Author: czy0729
 * @Date: 2019-03-18 09:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-02 21:08:04
 */
import React from 'react'
import Image from './image'

const Icon = ({ style, size = 'sm', ...other }) => {
  let _size
  if (size === 'xs') {
    _size = 20
  } else {
    _size = 32
  }
  return (
    <Image
      style={style}
      size={_size}
      source={require('@assets/components/activity/loading.gif')}
      placeholder={false}
      {...other}
    />
  )
}

export default Icon
