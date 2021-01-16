/*
 * 事件热力区域可视化
 *
 * @Author: czy0729
 * @Date: 2020-12-14 10:25:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-16 18:03:24
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { formatNumber, toFixed } from '@utils'
import events from '@constants/events'
import heatmapData from '@constants/json/heatmap.json'
import heatmapEventData from '@constants/json/heatmap-event.json'
import Text from './text'

const totalWithoutView = heatmapData.total - heatmapData['其他.查看']

function Heatmap({ right, bottom, transparent, id, data, screen, mini }) {
  const { enabled, grid, text, sum, mini: devEventMini } = systemStore.devEvent
  if (!enabled || (!grid && !text && !sum && !devEventMini)) {
    return null
  }

  const styles = memoStyles()
  const isPage = !id.includes('.') // 是否页面
  const page = id.split('.')[0] // 页面名称

  // 额外参数
  const key = Object.keys(data || {})[0] || ''
  const value = data[key]

  // 计算
  const count = key
    ? heatmapEventData[`${id}.${key}`][value] || 0
    : heatmapData[id] || 0 // 事件数量
  const total =
    (isPage ? totalWithoutView : heatmapData[page]) -
    (heatmapData[`${page}.查看`] || 0) // 事件百分比需要排除[页面.查看]
  const percentStyle = Math.min(count / (heatmapData[page] || 1), 0.56) // 红色背景透明度百分比
  let percent = (count / (total || 1)) * 100
  percent = percent < 1 ? toFixed(percent, 1) : parseInt(percent) // 百分比
  const percentTo = !!key && parseInt((count / (heatmapData[id] || 1)) * 100) // 跳转事件百分比

  // 样式
  const backgroundColor = `rgba(232, 8, 13, ${percentStyle})`
  const borderColor = `rgba(232, 8, 13, ${Math.min(percentStyle + 0.24, 1)})`
  const gridStyle = [
    styles.block,
    {
      borderColor
    }
  ]
  const textStyle = [
    styles.text,
    {
      right,
      bottom
    },
    key === 'to' && styles.textTo,
    key === 'from' && styles.textFrom
  ]

  if (devEventMini || mini) {
    return (
      <View style={gridStyle} pointerEvents='none'>
        <View style={textStyle}>
          <Text
            style={styles.textMini}
            type='__plain__'
            size={8}
            bold
            align='right'
          >
            {formatNumber(count, 0)}
          </Text>
        </View>
      </View>
    )
  }

  const eventName = isPage
    ? `${id}(日)`
    : id.includes('跳转.')
    ? key
    : id.split('.')[1]
  const eventDetail = value ? `.${data.alias || value}` : ''
  const eventCount = formatNumber(
    count / 30,
    count >= 30 || count === 0 ? 0 : 1
  )
  const eventAppPercent = count !== 0 ? ` / ${percent}%` : ''
  const eventPagePercent =
    percentTo && percentTo !== percent ? ` (${percentTo}%)` : ''
  return (
    <>
      {!!grid && !isPage && !transparent && (
        <View
          style={[
            gridStyle,
            {
              backgroundColor
            }
          ]}
          pointerEvents='none'
        />
      )}
      {!!text && (
        <View
          style={isPage ? styles.page : styles.position}
          pointerEvents='none'
        >
          <View style={textStyle}>
            <Text type='__plain__' size={10} bold align='right'>
              {eventName}
              {eventDetail}
            </Text>
            <Text type='__plain__' size={9} bold align='right'>
              {sum
                ? formatNumber(count, 0)
                : `${eventCount}${eventAppPercent}${eventPagePercent}`}
            </Text>
            {isPage && <PageText page={page} screen={screen} />}
          </View>
        </View>
      )}
    </>
  )
}

function PageText({ page, screen }) {
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
            {parseInt((countTo / (heatmapData[page] || 1)) * 100)}%
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
            {parseInt(
              (countView / heatmapEventData['其他.查看.screen'].total) * 100
            )}
            %
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

Heatmap.defaultProps = {
  id: '',
  data: {},
  right: 1,
  bottom: 1
}

Heatmap.Control = observer(() => {
  const { enabled, grid, text, sum, mini } = systemStore.devEvent
  if (!enabled) {
    return null
  }

  const styles = memoStyles()
  return (
    <View style={styles.control}>
      <Text
        style={styles.controlItem}
        type={grid ? 'warning' : '__plain__'}
        size={10}
        bold
        align='center'
        onPress={() => systemStore.toggleDevEvent('grid')}
      >
        Grid
      </Text>
      <Text
        style={styles.controlItem}
        type={text ? 'warning' : '__plain__'}
        size={10}
        bold
        align='right'
        onPress={() => systemStore.toggleDevEvent('text')}
      >
        Text
      </Text>
      <Text
        style={styles.controlItem}
        type={sum ? 'warning' : '__plain__'}
        size={10}
        bold
        align='right'
        onPress={() => systemStore.toggleDevEvent('sum')}
      >
        Sum
      </Text>
      <Text
        style={styles.controlItem}
        type={mini ? 'warning' : '__plain__'}
        size={10}
        bold
        align='right'
        onPress={() => systemStore.toggleDevEvent('mini')}
      >
        Mini
      </Text>
      <Text
        style={styles.controlItem}
        type={_.select('__plain__', 'warning')}
        size={10}
        bold
        align='center'
        onPress={() => _.toggleMode()}
      >
        Dark
      </Text>
      <Text
        style={styles.controlItem}
        type={systemStore.dev ? 'warning' : '__plain__'}
        size={10}
        bold
        align='center'
        onPress={systemStore.toggleDev}
      >
        Dev
      </Text>
    </View>
  )
})

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
    borderWidth: 1
  },
  text: {
    position: 'absolute',
    zIndex: 10001,
    padding: _.xs,
    backgroundColor: _.select('rgba(0, 0, 0, 0.64)', 'rgba(0, 0, 0, 0.7)')
  },
  textTo: {
    backgroundColor: 'rgba(15, 61, 67, 0.88)'
  },
  textFrom: {
    backgroundColor: 'rgba(62, 84, 108, 0.88)'
  },
  textMini: {
    width: '120%'
  },
  control: {
    position: 'absolute',
    zIndex: 10001,
    top: _.window.height / 1.5,
    right: 0,
    backgroundColor: _.select('rgba(0, 0, 0, 0.64)', 'rgba(0, 0, 0, 0.7)')
  },
  controlItem: {
    paddingVertical: 8,
    paddingHorizontal: 4
  }
}))
