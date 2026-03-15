/*
 * @Author: czy0729
 * @Date: 2021-11-30 03:41:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-13 22:26:29
 */
import { logger, rc } from '@utils/dev'
import { DEV } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ListView')

export const REFRESH_STATE = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
} as const

export const SCROLL_CALLBACK = () => {
  if (DEV) logger.info('LIST_VIEW: no scroll event bind')
}

export const DEFAULT_MAX_TO_RENDER_PER_BATCH = 40

export const DEFAULT_UPDATE_CELLS_BATCHING_PERIOD = 40

export const DEFAULT_WINDOW_SIZE = 20
