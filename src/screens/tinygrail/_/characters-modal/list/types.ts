/*
 * @Author: czy0729
 * @Date: 2026-07-24 23:17:56
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 23:17:56
 */
import type { ListEmpty } from '@types'
import type { ReactElement } from 'react'

export type Props = {
  data?: ListEmpty
  renderItem: (info: { item: any }) => ReactElement
}
