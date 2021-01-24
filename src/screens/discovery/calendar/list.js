/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:53:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 01:52:34
 */
import React from 'react'
import { View } from 'react-native'
import { ListView, Flex, Text, Iconfont, Heatmap } from '@components'
import { SectionHeader } from '@screens/_'
import { _ } from '@stores'
import { date, getTimestamp } from '@utils'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import Item from './item'
import ItemLine from './item-line'
import { marginLeft } from './store'

let day = new Date().getDay()
if (day === 0) {
  day = 7
}

function Line() {
  const styles = memoStyles()
  return (
    <Flex>
      <Flex.Item style={styles.line} />
      <Iconfont name='time' color={_.colorMain} size={13} />
      <Text style={_.ml.xs} type='main' size={12} bold>
        {date('H:i', getTimestamp())}
      </Text>
      <Flex.Item style={styles.line} />
      <Heatmap id='每日放送.跳转' />
    </Flex>
  )
}

function List(props, { $ }) {
  const styles = memoStyles()
  const { layout } = $.state
  return (
    <ListView
      key={layout}
      style={_.container.plain}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      sections={$.sections}
      numColumns={$.isList ? undefined : 4}
      scrollToTop
      renderSectionHeader={renderSectionHeader}
      renderItem={({ item, title, section = {} }) => {
        const { items } = item
        let renderLine = false
        const current = parseInt(date('Hi', getTimestamp()))
        return (
          <Flex key={title} wrap='wrap' align='start'>
            {items.map((i, idx) => {
              let { timeCN } = i
              if (idx > 0 && items[idx - 1].timeCN === timeCN) {
                timeCN = ''
              }

              let { air } = i
              if (i.air_weekday !== day && air !== 0) {
                air = parseInt(air) + 1
              }

              const itemProps = {
                key: i.id,
                subjectId: i.id,
                images: i.images,
                name: i.name_cn || i.name,
                score: i.rating && i.rating.score,
                air,
                timeCN
              }

              if ($.isList) {
                // 当前时间在番组播放之前
                if (
                  section.index === 0 &&
                  !renderLine &&
                  parseInt(timeCN) > current
                ) {
                  renderLine = true
                  return (
                    <View key={i.id} style={styles.row}>
                      <Line />
                      <ItemLine {...itemProps} />
                    </View>
                  )
                }

                // 当前时间之后已没有未播放番组
                if (
                  section.index === 0 &&
                  !renderLine &&
                  idx === items.length - 1
                ) {
                  return (
                    <View key={i.id} style={styles.row}>
                      <ItemLine {...itemProps} />
                      <Line />
                    </View>
                  )
                }

                return <ItemLine {...itemProps} />
              }

              return <Item {...itemProps} />
            })}
          </Flex>
        )
      }}
    />
  )
}

export default obc(List)

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind - _._wind
  },
  row: {
    width: '100%'
  },
  line: {
    height: 1,
    marginVertical: _.md,
    marginHorizontal: _._wind,
    backgroundColor: _.colorMain
  }
}))

function renderSectionHeader({ section: { title } }) {
  return (
    <SectionHeader
      style={[
        _.container.plain,
        {
          paddingVertical: _.sm + 2,
          paddingLeft: marginLeft
        }
      ]}
      size={14}
    >
      {title}
    </SectionHeader>
  )
}
