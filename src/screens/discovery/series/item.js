/*
 * @Author: czy0729
 * @Date: 2022-04-16 05:40:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-19 02:50:00
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Loading } from '@components'
import { Cover, Rank, Stars, Tag } from '@_'
import { _ } from '@stores'
import { asc } from '@utils'
import { memo, obc } from '@utils/decorators'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { MODEL_COLLECTION_STATUS } from '@constants/model'

const defaultProps = {
  navigation: {},
  styles: {},
  id: 0,
  data: [],
  collections: {},
  subjects: {}
}

const Item = memo(({ navigation, styles, id, data, collections, subjects }) => {
  const subject = subjects[id]
  if (subject._loaded === 0) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Loading.Raw />
      </Flex>
    )
  }

  const collection = collections[subject.id]
  const name = subject.name_cn || subject.name
  const hasName = !!name
  const hasScore = !!subject.score

  const eps = []
  if (collection?.ep) {
    eps.push(`看到 ${collection.ep} 话`)
  } else if (collection) {
    eps.push('未观看')
  }
  if (subject?.eps) eps.push(`更新到 ${subject?.eps} 话`)
  if (subject?.total_episodes && subject?.total_episodes !== subject?.eps)
    eps.push(`共 ${subject?.total_episodes} 章节`)
  return (
    <View>
      <Flex style={styles.item} align='start'>
        <Cover
          src={subject.image}
          width={IMG_WIDTH}
          height={IMG_HEIGHT}
          radius
          onPress={() => {
            navigation.push('Subject', {
              subjectId: subject.id,
              _jp: subject.name,
              _cn: subject.name_cn,
              _image: subject.image
            })
          }}
        />
        <Flex.Item>
          <Flex style={styles.body} direction='column' justify='between' align='start'>
            <Text size={13} numberOfLines={2}>
              <Text size={13} bold>
                {name}
              </Text>
              {hasName && subject.name !== name && (
                <Text type='sub' size={11} lineHeight={15} bold>
                  {'  '}
                  {subject.name}
                </Text>
              )}
            </Text>
            <Text size={11} bold>
              {eps.join(' / ')}
            </Text>
            <Flex style={_.mt.sm}>
              {hasScore && (
                <>
                  <Rank value={subject.rank} />
                  <Stars style={_.mr.xs} value={subject.score} color='warning' simple />
                </>
              )}
              <Text size={11} type='sub'>
                {!!(subject.rank && subject.score) && ' · '}
                {subject.date}
              </Text>
            </Flex>
          </Flex>
        </Flex.Item>
        <View style={styles.tagWrap}>
          <Tag
            style={styles.tag}
            value={MODEL_COLLECTION_STATUS.getLabel(String(collection?.type))}
            size={11}
          />
        </View>
      </Flex>

      {!!data.length && (
        <View style={styles.sub}>
          {data
            .sort((a, b) =>
              asc(subjects[a]?.date || '9999-99-99', subjects[b]?.date || '9999-99-99')
            )
            .map(item => {
              const subject = subjects[item]
              if (subject._loaded === 0) {
                return (
                  <Flex style={styles.loading} justify='center'>
                    <Loading.Raw />
                  </Flex>
                )
              }

              const collection = collections[subject.id]
              const name = subject.name_cn || subject.name
              const hasName = !!name

              const eps = []
              if (collection?.ep) {
                eps.push(`看到 ${collection.ep} 话`)
              } else if (collection) {
                eps.push('未观看')
              }
              if (subject?.eps) eps.push(`更新到 ${subject?.eps} 话`)
              if (subject?.total_episodes && subject?.total_episodes !== subject?.eps)
                eps.push(`共 ${subject?.total_episodes} 章节`)

              return (
                <Flex key={subject.id} style={styles.subItem} align='start'>
                  <Cover
                    src={subject.image}
                    width={IMG_WIDTH}
                    height={IMG_HEIGHT}
                    radius
                    onPress={() => {
                      navigation.push('Subject', {
                        subjectId: subject.id,
                        _jp: subject.name,
                        _cn: subject.name_cn,
                        _image: subject.image
                      })
                    }}
                  />
                  <Flex.Item>
                    <Flex
                      style={styles.bodySm}
                      direction='column'
                      justify='between'
                      align='start'
                    >
                      <Text size={13} numberOfLines={2}>
                        <Text size={13} bold>
                          {name}
                        </Text>
                        {hasName && subject.name !== name && (
                          <Text type='sub' size={11} lineHeight={15} bold>
                            {'  '}
                            {subject.name}
                          </Text>
                        )}
                      </Text>
                      <Text size={11} bold>
                        {eps.join(' / ')}
                      </Text>
                      <Flex style={_.mt.sm}>
                        {hasScore && (
                          <>
                            <Rank value={subject.rank} />
                            <Stars
                              style={_.mr.xs}
                              value={subject.score}
                              color='warning'
                              simple
                            />
                          </>
                        )}
                        <Text size={11} type='sub'>
                          {!!(subject.rank && subject.score) && ' · '}
                          {subject.date}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex.Item>
                  <View style={styles.tagWrap}>
                    <Tag
                      style={styles.tag}
                      value={MODEL_COLLECTION_STATUS.getLabel(String(collection?.type))}
                      size={11}
                    />
                  </View>
                </Flex>
              )
            })}
        </View>
      )}
    </View>
  )
}, defaultProps)

export default obc(({ id, data }, { navigation, $ }) => {
  const ids = [id, ...data]
  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      id={id}
      data={data}
      subjects={$.subjects(ids)}
      collections={$.collections(ids)}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  loading: {
    height: 120
  },
  item: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md + 8
  },
  body: {
    height: IMG_HEIGHT,
    paddingLeft: _.md
  },
  bodySm: {
    height: IMG_HEIGHT,
    paddingLeft: _.md
  },
  sub: {
    marginTop: -_.sm,
    paddingRight: _.wind,
    paddingLeft: _.wind + 24,
    paddingBottom: _.md
  },
  subItem: {
    paddingVertical: _.md
  },
  tagWrap: {
    width: 40,
    marginTop: 2,
    marginLeft: _.sm
  },
  tag: {
    width: 40
  }
}))
