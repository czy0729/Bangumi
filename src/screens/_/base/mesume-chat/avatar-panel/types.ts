/*
 * @Author: czy0729
 * @Date: 2026-08-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 10:00:00
 */
import type { PropsWithChildren } from 'react'
import type { MusumeKey } from '../types'

export type Props = PropsWithChildren<{
  /** 当前人格 key */
  current: MusumeKey

  /** 选择人格回调 */
  onSelect: (key: MusumeKey) => void
}>
