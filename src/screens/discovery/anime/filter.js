/* eslint-disable react/jsx-indent */
/*
 * @Author: czy0729
 * @Date: 2020-07-15 16:37:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-16 17:28:16
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import {
  ANIME_TYPE,
  ANIME_FIRST,
  ANIME_YEAR,
  ANIME_BEGIN,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_SORT
} from '@utils/anime'

// 数组分组并弄好看
const ANIME_TAGS_GROUP = []
for (let i = 0, len = ANIME_TAGS.length; i < len; i += 16) {
  ANIME_TAGS_GROUP.push(ANIME_TAGS.slice(i, i + 16))
}
let tag = ANIME_TAGS_GROUP[0].pop()
ANIME_TAGS_GROUP[1] = [tag, ...ANIME_TAGS_GROUP[1]]
tag = ANIME_TAGS_GROUP[1].pop()
ANIME_TAGS_GROUP[2] = [tag, ...ANIME_TAGS_GROUP[2]]

const filterDS = [
  {
    title: '版本',
    type: 'type',
    data: ANIME_TYPE
  },
  {
    title: '首字',
    type: 'first',
    data: ANIME_FIRST
  },
  {
    title: '年份',
    type: 'year',
    data: ANIME_YEAR
  },
  {
    title: '季度',
    type: 'begin',
    data: ANIME_BEGIN
  },
  {
    title: '状态',
    type: 'status',
    data: ANIME_STATUS
  },
  {
    title: '类型',
    type: 'tags',
    data: ANIME_TAGS_GROUP
  },
  {
    title: '排序',
    type: 'sort',
    data: ANIME_SORT
  }
]

function Filter(props, { $ }) {
  const styles = memoStyles()
  const { query, data } = $.state
  return (
    <View style={styles.container}>
      {filterDS.map(item => {
        const state = query[item.type]
        const multiple = item.title === '类型'
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
          <Flex
            key={item.title}
            style={styles.row}
            align={multiple ? 'start' : 'center'}
          >
            <Text style={multiple && styles.multipleTitle} size={12} bold>
              {item.title}
            </Text>
            <Flex.Item style={_.ml.md}>
              <ScrollView
                style={styles.contentContainerStyle}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {multiple ? (
                  <Flex
                    style={styles.multiple}
                    direction='column'
                    align='start'
                  >
                    {item.data.map((i, idx) => (
                      <Flex
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        style={styles.contentContainerStyle}
                      >
                        {idx === 0 && all}
                        {i.map(tag => (
                          <Touchable
                            key={tag}
                            style={[
                              styles.item,
                              (typeof state === 'object'
                                ? state.includes(tag)
                                : state === tag) && styles.itemActive
                            ]}
                            onPress={() => $.onSelect(item.type, tag)}
                          >
                            <Text size={11}>{tag}</Text>
                          </Touchable>
                        ))}
                      </Flex>
                    ))}
                  </Flex>
                ) : (
                  <>
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
                  </>
                )}
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
