/*
 * @Author: czy0729
 * @Date: 2023-04-05 15:47:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 15:49:07
 */
import React from 'react'
import { Logo, LogoProps } from './index'

export default {
  title: 'base/Logo',
  component: Logo
}

export const Component = (args: LogoProps) => <Logo {...args} />
