/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-25 01:45:09
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import {
  MANGA_FIRST,
  MANGA_YEAR,
  MANGA_STATUS,
  MANGA_TAGS,
  MANGA_HD,
  MANGA_SORT
} from '@utils/manga'
import { info } from '@utils/ui'

// 数组分组并弄好看
const MANGA_TAGS_GROUP = []
for (let i = 0, len = MANGA_TAGS.length; i < len; i += 15) {
  MANGA_TAGS_GROUP.push(MANGA_TAGS.slice(i, i + 15))
}
let tag = MANGA_TAGS_GROUP[0].pop()
MANGA_TAGS_GROUP[1] = [tag, ...MANGA_TAGS_GROUP[1]]
tag = MANGA_TAGS_GROUP[1].pop()
MANGA_TAGS_GROUP[2] = [tag, ...MANGA_TAGS_GROUP[2]]

const filterDS = [
  {
    title: '首字',
    type: 'first',
    data: MANGA_FIRST
  },
  {
    title: '年份',
    type: 'year',
    data: MANGA_YEAR
  },
  {
    title: '状态',
    type: 'status',
    data: MANGA_STATUS
  },
  {
    title: '类型',
    type: 'tags',
    data: MANGA_TAGS_GROUP
  },
  {
    title: '源头',
    type: 'hd',
    data: MANGA_HD
  },
  {
    title: '排序',
    type: 'sort',
    data: MANGA_SORT
  }
]

function Filter(props, { $ }) {
  const styles = memoStyles()
  const { query, data, layout } = $.state
  return (
    <View style={[styles.container, layout === 'grid' && _.mb.md]}>
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
                            onLongPress={() => $.onSelect(item.type, tag, true)}
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
