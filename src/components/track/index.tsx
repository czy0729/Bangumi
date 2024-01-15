/*
 * @Author: czy0729
 * @Date: 2022-03-14 20:46:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:45:14
 */
import React from 'react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { hm as utilsHM } from '@utils/fetch'
import { useDomTitle, useRunAfter } from '@utils/hooks'
import { EventKeys } from '@constants/events'
import { Heatmap } from '../heatmap'
import { UM } from './um'
import { COMPONENT } from './ds'
import { Props as TrackProps } from './types'

export { TrackProps }

/** 移动统计, 页面埋点可视化 */
export const Track = ({ title, domTitle, hm, alias }: TrackProps) => {
  r(COMPONENT)

  useRunAfter(() => {
    if (Array.isArray(hm)) utilsHM(...hm, domTitle || title)
  })

  useDomTitle(domTitle || title)

  return (
    <>
      {!!title && <UM title={title} />}
      {!!hm?.[1] && (
        <Heatmap id={(alias || title) as EventKeys} screen={hm[1]} bottom={_.bottom + _.sm} />
      )}
    </>
  )
}
