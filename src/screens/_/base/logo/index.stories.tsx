/*
 * @Author: czy0729
 * @Date: 2023-04-05 15:47:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:10:03
 */
import React from 'react'
import { Logo as Component } from './index'

import type { LogoProps as Props } from './index'

export default {
  title: 'base/Logo',
  component: Component
}

export const Logo = (args: Props) => <Component {...args} />
