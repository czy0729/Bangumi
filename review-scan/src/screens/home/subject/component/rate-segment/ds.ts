/*
 * @Author: czy0729
 * @Date: 2024-01-02 21:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-02 21:30:28
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'RateSegement')

export const SCORES_DS = ['全部', '9-10', '7-8', '4-6', '1-3'] as const
