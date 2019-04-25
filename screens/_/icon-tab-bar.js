/*
 * @Author: czy0729
 * @Date: 2019-04-24 15:20:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 21:10:17
 */
import React from 'react'
import { Icon } from '@components'

const IconTabBar = ({ name, tintColor }) => (
  <Icon name={name} size={22} style={{ color: tintColor }} />
)

export default IconTabBar
