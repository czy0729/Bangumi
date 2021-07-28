/*
 * @Author: czy0729
 * @Date: 2020-07-15 16:37:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-27 19:53:39
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { info } from '@utils/ui'
import { FilterSwitch } from './filter-switch'

const hitSlop = {
  top: _.device(6, 4),
  right: _.device(2, 4),
  bottom: _.device(6, 4),
  left: _.device(2, 4)
}

export const Filter = obc(
  ({ filterDS = [], title = '频道', name = '番剧', type = 'Anime' }, { $ }) => {
    const styles = memoStyles()
    const { query, data, layout, expand } = $.state
    return (
      <View style={[styles.container, layout === 'grid' && _.mb.md]}>
        <FilterSwitch title={title} name={name} />
        {filterDS
          .filter(item => expand || item.always)
          .map(item => {
            const state = query[item.type]
            const multiple = ['类型', '制作'].includes(item.title)
            const multiSelect = item.title === '类型'
            return (
              <Flex
                key={item.title}
                style={styles.row}
                align={multiple ? 'start' : 'center'}
              >
                <View>
                  <View>
                    <Text
                      style={multiple && styles.multipleTitle}
                      size={12}
                      bold
                    >
                      {item.title}
                    </Text>
                    {multiSelect && (
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
                    id={`${type}.选择`}
                    data={{
                      type: item.type
                    }}
                    mini
                  />
                </View>
                <Flex.Item style={_.ml.md}>
                  <Flex align={multiple ? 'start' : 'center'}>
                    <Touchable
                      style={[
                        styles.item,
                        (typeof state === 'object'
                          ? state.length === 0
                          : state === '') && styles.itemActive,
                        multiple && {
                          marginTop: 4 * _.ratio
                        }
                      ]}
                      hitSlop={hitSlop}
                      onPress={() => $.onSelect(item.type, '')}
                    >
                      <Text size={11}>
                        {item.type === 'sort' ? '默认' : '全部'}
                      </Text>
                    </Touchable>
                    <ScrollView
                      ref={scrollView =>
                        scrollToX(scrollView, item.data, state)
                      }
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
                              {i.map(tag => (
                                <Touchable
                                  key={tag}
                                  style={[
                                    styles.item,
                                    (typeof state === 'object'
                                      ? state.includes(tag)
                                      : state === tag) && styles.itemActive
                                  ]}
                                  hitSlop={hitSlop}
                                  onPress={() => $.onSelect(item.type, tag)}
                                  onLongPress={
                                    multiSelect
                                      ? () => $.onSelect(item.type, tag, true)
                                      : undefined
                                  }
                                >
                                  <Text size={11}>{tag}</Text>
                                  <Heatmap
                                    right={-1}
                                    id={`${type}.选择`}
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
                          {item.login && !$.isLogin ? (
                            <Text
                              style={_.ml.sm}
                              size={11}
                              type='sub'
                              lineHeight={16}
                            >
                              登录后显示
                            </Text>
                          ) : (
                            item.data.map(i => (
                              <Touchable
                                key={i}
                                style={[
                                  styles.item,
                                  (typeof state === 'object'
                                    ? state.includes(i)
                                    : state === i) && styles.itemActive
                                ]}
                                hitSlop={hitSlop}
                                onPress={() => $.onSelect(item.type, i)}
                              >
                                <Text size={11}>{i}</Text>
                                <Heatmap
                                  right={-1}
                                  id={`${type}.选择`}
                                  data={{
                                    value: i
                                  }}
                                  mini
                                />
                              </Touchable>
                            ))
                          )}
                        </>
                      )}
                    </ScrollView>
                  </Flex>
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
          {!!query?.tags?.length && ` · ${query?.tags?.join(' · ')}`}
        </Text>
      </View>
    )
  }
)

const vertical = 4
const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingVertical: _.sm * _.ratio
  },
  row: {
    paddingLeft: _.wind
  },
  multiple: {
    marginVertical: -vertical * _.ratio
  },
  multipleTitle: {
    marginTop: 8 * _.ratio
  },
  contentContainerStyle: {
    paddingVertical: vertical * _.ratio
  },
  item: {
    paddingVertical: vertical,
    paddingHorizontal: 12 * _.ratio,
    borderRadius: 12 * _.ratio,
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
    width: 34 * _.ratio,
    marginBottom: -29 * _.ratio
  }
}))

function scrollToX(scrollView, data, value, width = 50) {
  if (scrollView && value) {
    const index = data.findIndex(i => i == value)
    if (index >= 4) {
      setTimeout(() => {
        scrollView.scrollTo(
          {
            x: (index - 2) * width,
            y: 0,
            animated: true
          },
          1
        )
      }, 80)
    }
  }
}
