/*
 * 事件热力区域可视化
 *
 * @Author: czy0729
 * @Date: 2020-12-14 10:25:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-15 00:55:44
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import heatmapData from '@constants/json/heatmap.json'
import heatmapEventData from '@constants/json/heatmap-event.json'
import Text from './text'

function Heatmap({ right, bottom, transparent, id, data }) {
  const isPage = !(id.includes('.') && !id.includes('.查看')) // 是否页面
  const [page] = id.split('.') // 页面名称

  // 额外参数
  const key = Object.keys(data || {})[0] || ''
  const value = data[key]

  // 额外
  const countView = heatmapData[`${page}.查看`] || 0
  const countTo = heatmapData[`${page}.跳转`] || 0

  // 计算
  const count = key
    ? heatmapEventData[`${id}.${key}`][value] || 0
    : heatmapData[id] || 0
  const total = (isPage ? heatmapData.total : heatmapData[page]) - countView // 事件百分比需要排除[页面.查看]
  const percent = parseInt((count / (total || 1)) * 100)
  const percentStyle = Math.min((count / (heatmapData[page] || 1)) * 2, 1)

  // 样式
  const backgroundColor = `rgba(232, 8, 13, ${percentStyle})`
  const borderColor = `rgba(232, 8, 13, ${Math.min(percentStyle + 0.24, 1)})`
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
            {
              right,
              bottom
            }
          ]}
        >
          <Text size={10} bold align='right'>
            {isPage ? '总事件' : id.split('.')[1]}
            {value ? `.${value}` : ''}
          </Text>
          <Text size={9} bold align='right'>
            {formatNumber(count / 30, count >= 30 || count === 0 ? 0 : 1)}
            {` / ${percent}%`}
            {!!key && ` / ${parseInt((count / (heatmapData[id] || 1)) * 100)}%`}
          </Text>
          {isPage && !!countTo && (
            <>
              <Text style={_.mt.xs} size={10} bold align='right'>
                跳转
              </Text>
              <Text size={9} bold align='right'>
                {formatNumber(countTo / 30, 0)} /{' '}
                {parseInt((countTo / (heatmapData[page] || 1)) * 100)}%
              </Text>
            </>
          )}
          {isPage && !!countView && (
            <>
              <Text style={_.mt.xs} size={10} bold align='right'>
                *查看
              </Text>
              <Text size={9} bold align='right'>
                {formatNumber(countView / 30, 0)} /{' '}
                {parseInt((countView / (heatmapData[page] || 1)) * 100)}%
              </Text>
            </>
          )}
        </View>
      </View>
    </>
  )
}

Heatmap.defaultProps = {
  data: {},
  right: 1,
  bottom: 1
}

export default observer(Heatmap)

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    zIndex: 1000,
    top: 0,
    right: _.wind,
    left: 0,
    height: _.window.height - _._wind
  },
  position: {
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    bottom: 0
  },
  block: {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: _.radiusXs
  },
  text: {
    position: 'absolute',
    zIndex: 1001,
    padding: _.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: _.radiusXs
  }
})
