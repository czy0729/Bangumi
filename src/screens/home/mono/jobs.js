/*
 * @Author: czy0729
 * @Date: 2019-06-03 00:53:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-07 07:32:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Image, Text, Expand, Heatmap } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { appNavigate, getCoverMedium, cnjp } from '@utils/app'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

export const coverWidth = 64 * _.ratio
export const coverHeight = coverWidth * 1.28
const event = {
  id: '人物.跳转',
  data: {
    from: '出演'
  }
}
const defaultProps = {
  navigation: {},
  styles: {},
  style: {},
  jobs: []
}

const Jobs = memo(({ navigation, styles, style, jobs }) => {
  rerender('Mono.Jobs.Main')

  return (
    <Expand ratio={2.8}>
      <View style={[styles.container, style]}>
        <View>
          <SectionTitle>出演</SectionTitle>
          <Heatmap
            id='人物.跳转'
            data={{
              from: '出演'
            }}
          />
        </View>
        <View style={_.mt.md}>
          {jobs.map((item, index) => {
            const nameTop = cnjp(item.nameCn, item.name)
            const nameBottom = cnjp(item.name, item.nameCn)
            const type = MODEL_SUBJECT_TYPE.getTitle(item.type)
            const onPress = () =>
              appNavigate(
                item.href,
                navigation,
                {
                  _jp: item.name,
                  _cn: item.nameCn,
                  _image: item.cover,
                  _type: type
                },
                event
              )
            return (
              <Flex key={item.href} style={styles.item} align='start'>
                <Cover
                  src={item.cover}
                  type={type}
                  size={coverWidth}
                  height={coverHeight}
                  radius
                  shadow
                  onPress={onPress}
                />
                {!index && (
                  <Heatmap
                    right={-32}
                    id='人物.跳转'
                    data={{
                      to: 'Subject',
                      alias: '条目'
                    }}
                  />
                )}
                <Flex.Item style={styles.content}>
                  <Touchable onPress={onPress}>
                    <Flex align='start'>
                      <Flex.Item>
                        <Text size={12} bold numberOfLines={3}>
                          {nameTop}
                        </Text>
                      </Flex.Item>
                      <Tag style={styles.tag} value={item.staff} />
                    </Flex>
                    {!!nameBottom && nameBottom !== nameTop && (
                      <Text style={_.mt.xs} size={10} type='sub' bold>
                        {nameBottom}
                      </Text>
                    )}
                  </Touchable>
                  <Flex style={_.mt.md}>
                    <Touchable
                      onPress={() =>
                        appNavigate(
                          item.castHref,
                          navigation,
                          {
                            _name: item.cast,
                            _image: getCoverMedium(item.castCover)
                          },
                          event
                        )
                      }
                    >
                      <Flex>
                        {!!item.castCover && (
                          <Image
                            style={_.mr.xs}
                            size={24 * _.ratio}
                            src={item.castCover}
                            radius
                            shadow
                          />
                        )}
                        <Text size={11} bold>
                          {item.cast}
                          {!!item.castTag && (
                            <Text size={8} type='sub' lineHeight={11} bold>
                              {' '}
                              {item.castTag}
                            </Text>
                          )}
                        </Text>
                      </Flex>
                      {!index && (
                        <Heatmap
                          id='人物.跳转'
                          data={{
                            to: 'Mono',
                            alias: '人物'
                          }}
                        />
                      )}
                    </Touchable>

                    {!!item?.cast2?.castCover && (
                      <Touchable
                        style={[_.ml.md, _.mr.xs]}
                        onPress={() =>
                          appNavigate(
                            item?.cast2?.castHref,
                            navigation,
                            {
                              _name: item?.cast2?.cast,
                              _image: getCoverMedium(item?.cast2?.castCover)
                            },
                            event
                          )
                        }
                      >
                        <Flex>
                          <Image
                            style={_.mr.xs}
                            size={24 * _.ratio}
                            src={item?.cast2?.castCover}
                            radius
                            shadow
                          />
                          <Text size={11} bold>
                            {item?.cast2?.cast}
                            {!!item?.cast2?.castTag && (
                              <Text size={8} type='sub' lineHeight={11} bold>
                                {' '}
                                {item?.cast2?.castTag}
                              </Text>
                            )}
                          </Text>
                        </Flex>
                      </Touchable>
                    )}
                  </Flex>
                </Flex.Item>
              </Flex>
            )
          })}
        </View>
      </View>
    </Expand>
  )
}, defaultProps)

export default obc(({ style }, { $, navigation }) => {
  rerender('Mono.Jobs')

  if (!$.jobs.length) return null

  return (
    <Jobs styles={memoStyles()} navigation={navigation} style={style} jobs={$.jobs} />
  )
})

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    paddingBottom: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    paddingTop: 2,
    paddingLeft: _.sm + 4
  },
  tag: {
    marginLeft: _.sm
  }
}))
