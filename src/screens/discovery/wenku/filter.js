/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:21:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-06-26 07:09:12
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { FilterSwitch } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { filterDS } from './ds'

function Filter(props, { $ }) {
  const styles = memoStyles()
  const { query, data, layout, expand } = $.state
  return (
    <View style={[styles.container, layout === 'grid' && _.mb.md]}>
      <FilterSwitch name='文库' />
      {filterDS
        .filter(item => expand || item.always)
        .map(item => {
          const state = query[item.type]
          const all = (
            <Touchable
              style={[
                styles.item,
                (typeof state === 'object'
                  ? state.length === 0
                  : state === '') && styles.itemActive
              ]}
              onPress={() => $.onSelect(item.type, '')}
            >
              <Text size={11}>{item.type === 'sort' ? '默认' : '全部'}</Text>
            </Touchable>
          )
          return (
            <Flex key={item.title} style={styles.row} align='center'>
              <View>
                <Text size={12} bold>
                  {item.title}
                </Text>
                <Heatmap
                  right={-16}
                  bottom={8}
                  id='游戏.选择'
                  data={{
                    type: item.type
                  }}
                  mini
                />
              </View>
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
                      <Heatmap
                        right={-1}
                        id='游戏.选择'
                        data={{
                          value: i
                        }}
                        mini
                      />
                    </Touchable>
                  ))}
                </ScrollView>
              </Flex.Item>
            </Flex>
          )
        })}
      <Touchable onPress={$.onExpand}>
        <Flex style={_.mt.sm} justify='center'>
          <Text size={11} lineHeight={12} type='icon' bold>
            {expand ? '收起' : '更多'}选项
          </Text>
        </Flex>
      </Touchable>
      <Text style={[styles.row, _.mt.md]} size={10} type='sub'>
        {data.list.length} 条记录
      </Text>
    </View>
  )
}

export default obc(Filter)

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
    paddingHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden'
  },
  itemActive: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  }
}))
