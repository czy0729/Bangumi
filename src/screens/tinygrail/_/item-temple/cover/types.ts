/*
 * @Author: czy0729
 * @Date: 2025-08-21 15:19:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 15:20:36
 */
import { Props } from '../type'

export type CoverProps = Pick<
  Props,
  'cover' | 'coverSize' | 'level' | 'refine' | 'name' | 'event' | 'onPress'
>
