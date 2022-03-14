/*
 * 移动统计 + 页面埋点可视化
 *
 * @Author: czy0729
 * @Date: 2022-03-14 20:46:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-14 21:17:46
 */
import React from 'react'
import { _ } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { hm as utilsHM } from '@utils/fetch'
import { Heatmap } from '../heatmap'
import UM from './um'

export const Track = ({
  /* 页面标题 */
  title,

  /* 统计参数: [url地址, 对应页面key] */
  hm,

  /* 统计别名 */
  alias
}) => {
  useRunAfter(() => {
    if (Array.isArray(hm)) utilsHM(...hm)
  })

  return (
    <>
      {!!title && <UM title={title} />}
      {!!hm?.[1] && (
        <Heatmap id={alias || title} screen={hm[1]} bottom={_.bottom + _.sm} />
      )}
    </>
  )
}
