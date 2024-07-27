/*
 * @Author: czy0729
 * @Date: 2024-07-27 16:31:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-27 16:35:26
 */
import { RatingStatus } from '@types'
import { Action } from '../types'

export type Props = {
  status: '' | RatingStatus
  action: Action
  onSelect: (status: RatingStatus) => any
}
