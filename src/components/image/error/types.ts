/*
 * @Author: czy0729
 * @Date: 2026-05-09 18:12:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:24:03
 */
import type { WithViewStyles } from '@types'
import type { Props as ParentProps } from '../types'

export type Props = WithViewStyles<Pick<ParentProps, 'size'>>
