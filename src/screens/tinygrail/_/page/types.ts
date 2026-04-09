/*
 * @Author: czy0729
 * @Date: 2025-04-22 05:03:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:26:01
 */
import type { PropsWithChildren } from 'react'
import type { PageProps } from '@components'

export type Props = PropsWithChildren<{
  loading?: PageProps['loading']
  header?: boolean
}>
