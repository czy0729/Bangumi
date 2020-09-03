/* eslint-disable react/jsx-indent */
/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:21:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-03 10:53:19
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import {
  WENKU_FIRST,
  WENKU_UPDATE,
  WENKU_STATUS,
  WENKU_ANIME,
  WENKU_SORT
} from '@utils/wenku'

const filterDS = [
  {
    title: '首字　',
    type: 'first',
    data: WENKU_FIRST
  },
  {
    title: '更新　',
    type: 'year',
    data: WENKU_UPDATE
  },
  {
    title: '状态　',
    type: 'status',
    data: WENKU_STATUS
  },
  {
    title: '动画化',
    type: 'anime',
    data: WENKU_ANIME
  },
  {
    title: '排序　',
    type: 'sort',
    data: WENKU_SORT
  }
]

function Filter(props, { $ }) {
  const styles = memoStyles()
  const { query, data } = $.state
  return (
    <View style={styles.container}>
      {filterDS.map(item => {
        const state = query[item.type]
        const all = (
          <Touchable
            style={[
              styles.item,
              (typeof state === 'object' ? state.length === 0 : state === '') &&
                styles.itemActive
            ]}
            onPress={() => $.onSelect(item.type, '')}
          >
            <Text size={11}>{item.type === 'sort' ? '默认' : '全部'}</Text>
          </Touchable>
        )
        return (
          <Flex key={item.title} style={styles.row} align='center'>
            <Text size={12} bold>
              {item.title}
            </Text>
            <Flex.Item style={_.ml.md}>
              <ScrollView
                style={styles.contentContainerStyle}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {all}
                {item.data.map(i => (
                  <Touchable
                    key={i}
                    style={[
                      styles.item,
                      (typeof state === 'object'
                        ? state.includes(i)
                        : state === i) && styles.itemActive
                    ]}
                    onPress={() => $.onSelect(item.type, i)}
                  >
                    <Text size={11}>{i}</Text>
                  </Touchable>
                ))}
              </ScrollView>
            </Flex.Item>
          </Flex>
        )
      })}
      <Text style={[styles.row, _.mt.sm]} size={10} type='sub'>
        {data.list.length} 条记录
      </Text>
    </View>
  )
}

Filter.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Filter)

const vertical = 4
const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.sm
  },
  row: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  multiple: {
    marginVertical: -vertical
  },
  multipleTitle: {
    marginTop: 8
  },
  contentContainerStyle: {
    paddingVertical: vertical
  },
  item: {
    paddingVertical: vertical,
    paddingHorizontal: 12
  },
  itemActive: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 12
  }
}))
