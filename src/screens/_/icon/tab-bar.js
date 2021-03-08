/*
 * @Author: czy0729
 * @Date: 2019-05-19 19:28:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 19:52:28
 */
import React from 'react'
import { Iconfont } from '@components'
import { ob } from '@utils/decorators'

export const IconTabBar = ob(({ name, color }) => (
  <Iconfont size={22} name={name} color={color} />
))
