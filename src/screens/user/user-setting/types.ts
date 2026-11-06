/*
 * @Author: czy0729
 * @Date: 2022-08-14 10:22:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * 页面 Ctx
 */
import type { WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
