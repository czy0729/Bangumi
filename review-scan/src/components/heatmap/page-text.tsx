/*
 * @Author: czy0729
 * @Date: 2022-05-06 18:02:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-22 04:26:06
 */
import React from 'react'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import events from '@constants/events'
import { Text } from '../text'

const heatmapData = {
  total: 0
}
const heatmapEventData = {}

export function PageText({ page, screen }) {
  // 额外
  const countTo = heatmapData[`${page}.跳转`] || 0
  const countView = heatmapEventData['其他.查看.screen'][screen] || 0

  // 平均 (响应百分比在这个值以上, 可以认为这个事件价值较高)
  const { length } = Object.keys(events).filter(
    name => name.indexOf(`${page}.`) === 0 && name !== `${page}.查看`
  )

  const avg = 100 / (length || 1)
  return (
    <>
      {!!countTo && (
        <>
          <Text type='__plain__' style={_.mt.xs} size={10} bold align='right'>
            跳转
          </Text>
          <Text type='__plain__' size={9} bold align='right'>
            {formatNumber(countTo / 30, 0)} /{' '}
            {parseInt(String((countTo / (heatmapData[page] || 1)) * 100))}%
          </Text>
        </>
      )}
      {!!countView && (
        <>
          <Text type='__plain__' style={_.mt.xs} size={10} bold align='right'>
            [查看]
          </Text>
          <Text type='__plain__' size={9} bold align='right'>
            {formatNumber(countView / 30, 0)} /{' '}
            {parseInt(String((countView / heatmapEventData['其他.查看.screen'].total) * 100))}%
          </Text>
        </>
      )}
      {!!avg && avg !== 100 && (
        <>
          <Text style={_.mt.xs} type='__plain__' size={10} bold align='right'>
            [平均]
          </Text>
          <Text type='__plain__' size={9} bold align='right'>
            {toFixed(avg, 1)}%
          </Text>
        </>
      )}
    </>
  )
}
