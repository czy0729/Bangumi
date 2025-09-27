/*
 * @Author: czy0729
 * @Date: 2022-03-14 20:46:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:24:46
 */
import React from 'react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { hm as utilsHM } from '@utils/fetch'
import { useDomTitle, useRunAfter } from '@utils/hooks'
import { EventKeys } from '@constants/events'
import { Heatmap } from '../heatmap'
import { COMPONENT } from './ds'
import { Props as TrackProps } from './types'

export { TrackProps }

/** 移动统计, 页面埋点可视化 */
export const Track = ({ title, domTitle, hm, alias }: TrackProps) => {
  r(COMPONENT)

  useRunAfter(() => {
    if (Array.isArray(hm)) utilsHM(...hm, domTitle || title)
  }, COMPONENT)

  useDomTitle(domTitle || title)

  return (
    <>
      {!!hm?.[1] && (
        <Heatmap id={(alias || title) as EventKeys} screen={hm[1]} bottom={_.bottom + _.sm} />
      )}
    </>
  )
}

export default Track
