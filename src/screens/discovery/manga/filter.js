/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-03 14:26:35
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { FilterSwitch } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { filterDS } from './ds'

function Filter(props, { $ }) {
  const styles = memoStyles()
  const { query, data, layout, expand } = $.state
  return (
    <View style={[styles.container, layout === 'grid' && _.mb.md]}>
      <FilterSwitch name='漫画' />
      {filterDS
        .filter(item => expand || item.always)
        .map(item => {
          const state = query[item.type]
          const multiple = item.title === '类型'
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
            <Flex
              key={item.title}
              style={styles.row}
              align={multiple ? 'start' : 'center'}
            >
              <View>
                <View>
                  <Text style={multiple && styles.multipleTitle} size={12} bold>
                    {item.title}
                  </Text>
                  {multiple && (
                    <Touchable
                      style={styles.how}
                      onPress={() => info('长按标签多选类型')}
                    >
                      <Text size={12} lineHeight={12} type='icon' bold>
                        多选
                      </Text>
                    </Touchable>
                  )}
                </View>
                <Heatmap
                  right={-16}
                  bottom={8}
                  id='Manga.选择'
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
                              onLongPress={() =>
                                $.onSelect(item.type, tag, true)
                              }
                            >
                              <Text size={11}>{tag}</Text>
                              <Heatmap
                                right={-1}
                                id='Manga.选择'
                                data={{
                                  value: tag
                                }}
                                mini
                              />
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
                          <Heatmap
                            right={-1}
                            id='Manga.选择'
                            data={{
                              value: i
                            }}
                            mini
                          />
                        </Touchable>
                      ))}
                    </>
                  )}
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
        {!!query.tags.length && ` · ${query.tags.join(' · ')}`}
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
  },
  how: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    bottom: 0,
    width: 34,
    marginBottom: -30
  }
}))
