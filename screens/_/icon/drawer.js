/*
 * @Author: czy0729
 * @Date: 2019-05-10 19:35:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-07 16:57:33
 */
import React from 'react'
import { Iconfont } from '@components'
import _ from '@styles'

function IconDrawer({ name, color }) {
  return <Iconfont size={20} name={name} color={color} />
}

IconDrawer.defaultProps = {
  color: _.colorTitle
}

export default IconDrawer
