/*
 * 事件热力区域可视化
 *
 * @Author: czy0729
 * @Date: 2020-12-14 10:25:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-17 17:56:44
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import events from '@constants/events'
import heatmapData from '@constants/json/heatmap.json'
import heatmapEventData from '@constants/json/heatmap-event.json'
import Text from './text'

const totalWithoutView = heatmapData.total - heatmapData['其他.查看']

function Heatmap({ right, bottom, transparent, id, data, screen }) {
  const styles = memoStyles()
  const isPage = !id.includes('.') // 是否页面
  const page = id.split('.')[0] // 页面名称

  // 额外参数
  const key = Object.keys(data || {})[0] || ''
  const value = data[key]

  // 额外
  const countTo = heatmapData[`${page}.跳转`] || 0
  const countView = heatmapEventData['其他.查看.screen'][screen] || 0

  // 计算
  const count = key
    ? heatmapEventData[`${id}.${key}`][value] || 0
    : heatmapData[id] || 0
  const total =
    (isPage ? totalWithoutView : heatmapData[page]) -
    (heatmapData[`${page}.查看`] || 0) // 事件百分比需要排除[页面.查看]
  const percentStyle = Math.min((count / (heatmapData[page] || 1)) * 2, 0.64)
  let percent = (count / (total || 1)) * 100
  percent = percent < 1 ? toFixed(percent, 1) : parseInt(percent)
  const percentTo = !!key && parseInt((count / (heatmapData[id] || 1)) * 100)

  // 样式
  const backgroundColor = `rgba(232, 8, 13, ${percentStyle})`
  const borderColor = `rgba(232, 8, 13, ${Math.min(percentStyle + 0.24, 1)})`

  // 平均 (响应百分比在这个值以上, 可以认为这个事件价值较高)
  let avg
  if (isPage) {
    const { length } = Object.keys(events).filter(
      name => name.indexOf(`${page}.`) === 0 && name !== `${page}.查看`
    )
    avg = 100 / length
  }
  return (
    <>
      {!isPage && (
        <View
          style={[
            styles.block,
            !transparent && {
              backgroundColor,
              borderColor,
              borderWidth: 1
            }
          ]}
          pointerEvents='none'
        />
      )}
      <View style={isPage ? styles.page : styles.position} pointerEvents='none'>
        <View
          style={[
            styles.text,
            id.includes('.跳转') && styles.textSpec,
            {
              right,
              bottom
            }
          ]}
        >
          <Text type='__plain__' size={10} bold align='right'>
            {isPage ? '总事件(日)' : id.split('.')[1]}
            {value ? `.${data.alias || value}` : ''}
          </Text>
          <Text type='__plain__' size={9} bold align='right'>
            {formatNumber(count / 30, count >= 30 || count === 0 ? 0 : 1)}
            {count !== 0 && ` / ${percent}%`}
            {percentTo && percentTo !== percent && ` (${percentTo}%)`}
          </Text>
          {isPage && !!countTo && (
            <>
              <Text
                type='__plain__'
                style={_.mt.xs}
                size={10}
                bold
                align='right'
              >
                跳转
              </Text>
              <Text type='__plain__' size={9} bold align='right'>
                {formatNumber(countTo / 30, 0)} /{' '}
                {parseInt((countTo / (heatmapData[page] || 1)) * 100)}%
              </Text>
            </>
          )}
          {isPage && !!countView && (
            <>
              <Text
                type='__plain__'
                style={_.mt.xs}
                size={10}
                bold
                align='right'
              >
                [查看]
              </Text>
              <Text type='__plain__' size={9} bold align='right'>
                {formatNumber(countView / 30, 0)} /{' '}
                {parseInt(
                  (countView / heatmapEventData['其他.查看.screen'].total) * 100
                )}
                %
              </Text>
            </>
          )}
          {isPage && !!avg && (
            <>
              <Text
                style={_.mt.xs}
                type='__plain__'
                size={10}
                bold
                align='right'
              >
                [平均]
              </Text>
              <Text type='__plain__' size={9} bold align='right'>
                {toFixed(avg, 1)}%
              </Text>
            </>
          )}
        </View>
      </View>
    </>
  )
}

Heatmap.defaultProps = {
  id: '',
  data: {},
  right: 1,
  bottom: 1
}

export default observer(Heatmap)

const memoStyles = _.memoStyles(_ => ({
  page: {
    position: 'absolute',
    zIndex: 10000,
    top: 0,
    right: _.wind,
    left: 0,
    height: _.window.height - _._wind
  },
  position: {
    position: 'absolute',
    zIndex: 10000,
    right: 0,
    bottom: 0
  },
  block: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: _.radiusXs
  },
  text: {
    position: 'absolute',
    zIndex: 10001,
    padding: _.xs,
    backgroundColor: _.select('rgba(0, 0, 0, 0.64)', 'rgba(0, 0, 0, 0.7)'),
    borderRadius: _.radiusXs
  },
  textSpec: {
    backgroundColor: 'rgba(15, 61, 67, 0.88)'
  }
}))
