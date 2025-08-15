/*
 * @Author: czy0729
 * @Date: 2024-08-04 16:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-04 16:19:49
 */
import { ComponentType, lazy } from 'react'
import { Props } from './types'

export default lazy<ComponentType<Props>>(() => import('./index'))
