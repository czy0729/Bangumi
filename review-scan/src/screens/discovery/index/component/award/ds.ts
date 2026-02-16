/*
 * @Author: czy0729
 * @Date: 2023-12-26 07:10:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 14:26:48
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Award')

export const YEARS_LEFT = [2022] as const

export const YEARS_RIGHT = [2021, 2020, 2019, 2018] as const
