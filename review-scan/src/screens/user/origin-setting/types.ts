/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:13:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-19 07:13:07
 */
import { WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Keys = 'anime' | 'hanime' | 'manga' | 'wenku' | 'music' | 'game' | 'real'
