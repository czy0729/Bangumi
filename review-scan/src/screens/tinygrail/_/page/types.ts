/*
 * @Author: czy0729
 * @Date: 2025-04-22 05:03:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:03:57
 */
import { PropsWithChildren } from 'react'
import { PageProps } from '@components'

export type Props = PropsWithChildren<{
  loading?: PageProps['loading']
  header?: boolean
}>
