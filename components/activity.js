/*
 * @Author: czy0729
 * @Date: 2019-03-18 09:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 01:03:06
 */
import React from 'react'
import Image from './image'

const Activity = ({ style, size, ...other }) => {
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

Activity.defaultProps = {
  style: undefined,
  size: 'sm'
}

export default Activity
