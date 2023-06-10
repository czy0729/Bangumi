/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:42:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-10 23:57:29
 */
import { SubjectId } from '@types'
import { CollectionsItem } from './types'

export const NAMESPACE = 'ScreenLike'

export const EXCLUDE_STATE = {
  collections: [] as CollectionsItem[],
  subjects: {} as Record<
    SubjectId,
    {
      name: string
      image: string
      rate: number
      relates: SubjectId[]
    }
  >,

  fetching: false,
  message: '',
  current: 0,
  total: 0
}

export const STATE = {
  relates: {} as Record<SubjectId, CollectionsItem>,
  type: 'anime',
  list: {
    anime: [],
    book: [],
    game: [],
    music: [],
    real: []
  },
  ...EXCLUDE_STATE,
  _loaded: false
}

export const HOST_API_V0 = 'https://api.bgm.tv/v0'

export const LIMIT = 100
