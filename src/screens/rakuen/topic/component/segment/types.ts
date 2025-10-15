/*
 * @Author: czy0729
 * @Date: 2024-10-02 06:07:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 17:30:19
 */
import {
  FILTER_ALL,
  FILTER_FOLLOW,
  FILTER_FRIENDS,
  FILTER_LIKES,
  FILTER_ME,
  FILTER_POST
} from './ds'

export type Data = (
  | typeof FILTER_ALL
  | `${typeof FILTER_FOLLOW} ${number}`
  | `${typeof FILTER_FRIENDS} ${number}`
  | `${typeof FILTER_LIKES} ${number}`
  | `${typeof FILTER_ME} ${number}`
  | typeof FILTER_POST
)[]
