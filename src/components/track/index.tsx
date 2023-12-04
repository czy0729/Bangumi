/*
 * @Author: czy0729
 * @Date: 2022-03-14 20:46:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 22:57:56
 */
import React from 'react'
import { _ } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { hm as utilsHM } from '@utils/fetch'
import { EventKeys } from '@constants/events'
import { Heatmap } from '../heatmap'
import { UM } from './um'
import { Props as TrackProps } from './types'

export { TrackProps }

/** 移动统计, 页面埋点可视化 */
export const Track = ({ title, hm, alias }: TrackProps) => {
  useRunAfter(() => {
    if (Array.isArray(hm)) utilsHM(...hm, title)
  })

  return (
    <>
      {!!title && <UM title={title} />}
      {!!hm?.[1] && (
        <Heatmap
          id={(alias || title) as EventKeys}
          screen={hm[1]}
          bottom={_.bottom + _.sm}
        />
      )}
    </>
  )
}
