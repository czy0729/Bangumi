/*
 * @Author: czy0729
 * @Date: 2019-04-24 17:06:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 21:02:02
 */
import React from 'react'
import { Icon } from '@components'

const IconDrawer = ({ name, size = 20, tintColor }) => (
  <Icon name={name} size={size} style={{ color: tintColor }} />
)

export default IconDrawer
