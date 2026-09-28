/*
 * @Author: czy0729
 * @Date: 2025-10-09 05:23:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 */
import type { PropsWithChildren } from 'react'
import type { Props as ItemProps } from '../types'

export type Props = PropsWithChildren<Pick<ItemProps, 'subjectId'>>
