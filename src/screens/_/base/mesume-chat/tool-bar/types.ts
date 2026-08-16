/*
 * @Author: czy0729
 * @Date: 2026-08-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import type { Props as MesumeChatProps } from '../types'

export type Props = Pick<MesumeChatProps, 'time' | 'loading' | 'onBefore' | 'onNext' | 'onRefresh'>
