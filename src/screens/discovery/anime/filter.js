/*
 * @Author: czy0729
 * @Date: 2020-07-15 16:37:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-24 20:58:59
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import {
  ANIME_AREA,
  ANIME_TYPE,
  ANIME_FIRST,
  ANIME_YEAR,
  ANIME_BEGIN,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_OFFICIAL,
  ANIME_SORT
} from '@utils/anime'
import { info } from '@utils/ui'

// 类型分组
const ANIME_TAGS_GROUP = []
for (let i = 0, len = ANIME_TAGS.length; i < len; i += 15) {
  ANIME_TAGS_GROUP.push(ANIME_TAGS.slice(i, i + 15))
}
let tag = ANIME_TAGS_GROUP[0].pop()
ANIME_TAGS_GROUP[1] = [tag, ...ANIME_TAGS_GROUP[1]]
tag = ANIME_TAGS_GROUP[1].pop()
ANIME_TAGS_GROUP[2] = [tag, ...ANIME_TAGS_GROUP[2]]

// 制作分组
const ANIME_OFFICIAL_GROUP = []
for (
  let i = 0, len = ANIME_OFFICIAL.length;
  i < len;
  i += parseInt((ANIME_OFFICIAL.length + 1) / 2)
) {
  ANIME_OFFICIAL_GROUP.push(
    ANIME_OFFICIAL.slice(i, i + parseInt((ANIME_OFFICIAL.length + 1) / 2))
  )
}

const filterDS = [
  {
    title: '地区',
    type: 'area',
    data: ANIME_AREA
  },
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
    title: '制作',
    type: 'official',
    data: ANIME_OFFICIAL_GROUP
  },
  {
    title: '排序',
    type: 'sort',
    data: ANIME_SORT
  }
]

function Filter(props, { $ }) {
  const styles = memoStyles()
  const { query, data, layout } = $.state
  return (
    <View style={[styles.container, layout === 'grid' && _.mb.md]}>
      {filterDS.map(item => {
        const state = query[item.type]
        const multiple = ['类型', '制作'].includes(item.title)
        const multiSelect = item.title === '类型'
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
                id='Anime.选择'
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
                            onLongPress={
                              multiSelect
                                ? () => $.onSelect(item.type, tag, true)
                                : undefined
                            }
                          >
                            <Text size={11}>{tag}</Text>
                            <Heatmap
                              right={-1}
                              id='Anime.选择'
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
                          id='Anime.选择'
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
    marginBottom: -29
  }
}))
