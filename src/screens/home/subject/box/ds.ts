/*
 * @Author: czy0729
 * @Date: 2022-07-10 03:33:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-10 04:04:23
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType } from '../types'
import { memoStyles } from './styles'

export const RATE = [1, 2, 3, 4, 5] as const

type Props = Pick<
  StoreType,
  'collection' | 'isLogin' | 'status' | 'showManageModel' | 'toRating'
> & {
  styles: ReturnType<typeof memoStyles>
  navigation: Navigation
  collectionStatus: StoreType['params']['_collection']
  showCount: typeof systemStore.setting.showCount
}

export const DEFAULT_PROPS: Props = {
  styles: {} as any,
  navigation: {},
  collection: {},
  collectionStatus: '未收藏',
  isLogin: false,
  status: [],
  showCount: true,
  showManageModel: () => {},
  toRating: () => {}
}
