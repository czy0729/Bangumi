/*
 * @Author: czy0729
 * @Date: 2020-07-21 13:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 22:28:35
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { Cover, Stars, Tag } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { findSubjectCn } from '@utils/app'
import { t } from '@utils/fetch'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'

const width = parseInt(IMG_WIDTH / 1.4)
const height = parseInt(IMG_HEIGHT / 1.4)

function List(props, { $, navigation }) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      {$.yearsTimeline.map((item, index) => (
        <View key={item.title}>
          <View>
            <View style={styles.lineBottom} />
            <View style={styles.nodeYear} />
            <Flex>
              <Text size={18} lineHeight={48} type='title' bold>
                {item.title}年{' '}
              </Text>
              {index === 0 && (
                <Text style={_.ml.sm} size={12} bold>
                  加入Bangumi
                  <Text type='main' size={12} bold>
                    {' '}
                    {$.days}{' '}
                  </Text>
                  天
                </Text>
              )}
            </Flex>
            <Heatmap id='时间线.跳转' />
          </View>
          {item.data.map(item => (
            <View key={item.title}>
              <View>
                <View style={styles.line} />
                <View style={styles.nodeMonth} />
                <Text size={16} lineHeight={32} type='title' bold>
                  {parseInt(item.title.slice(5, 7))}月
                </Text>
                <Flex>
                  {!!item.actions['看过'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      看过{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['看过']}{' '}
                      </Text>
                    </Text>
                  )}
                  {!!item.actions['在看'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      在看{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['在看']}{' '}
                      </Text>
                    </Text>
                  )}
                  {!!item.actions['想看'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      想看{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['想看']}{' '}
                      </Text>
                    </Text>
                  )}
                  {!!item.actions['搁置'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      搁置{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['搁置']}{' '}
                      </Text>
                    </Text>
                  )}
                  {!!item.actions['抛弃'] && (
                    <Text style={_.mr.sm} size={12} lineHeight={24} type='sub'>
                      抛弃{' '}
                      <Text size={12} lineHeight={24} type='main' bold>
                        {item.actions['抛弃']}{' '}
                      </Text>
                    </Text>
                  )}
                </Flex>
              </View>
              <View>
                {item.data.map(item => {
                  const splits = item.title.split('-')
                  const label = `${splits[1]}月${splits[2]}日`
                  return (
                    <View key={item.title}>
                      <View>
                        <View style={styles.line} />
                        <Text size={10} lineHeight={28} type='sub'>
                          {label}
                        </Text>
                      </View>
                      <View>
                        <View style={styles.line} />
                        {item.data.map(item => (
                          <Flex
                            key={item.id}
                            style={styles.subjects}
                            align='start'
                            wrap='wrap'
                          >
                            <View style={styles.nodeDay} />
                            {item.subject.map(i => (
                              <Flex
                                key={String(i.id)}
                                style={
                                  item.subject.length > 1
                                    ? styles.subjectHalf
                                    : styles.subject
                                }
                                align='start'
                              >
                                <View style={styles.cover}>
                                  <Cover
                                    src={i.cover}
                                    width={width}
                                    height={height}
                                    radius
                                    onPress={() => {
                                      t('时间线.跳转', {
                                        to: 'Suject',
                                        subjectId: i.id
                                      })

                                      navigation.push('Subject', {
                                        subjectId: i.id
                                      })
                                    }}
                                  />
                                </View>
                                <Flex.Item style={_.ml.sm}>
                                  <Flex>
                                    <Tag
                                      value={item.action.replace('了', '')}
                                    />
                                    {!!i.star && (
                                      <Stars
                                        style={_.ml.xs}
                                        value={i.star}
                                        size={10}
                                      />
                                    )}
                                  </Flex>
                                  <Text
                                    style={_.mt.sm}
                                    size={12}
                                    bold
                                    numberOfLines={2}
                                  >
                                    {findSubjectCn(i.name)}
                                  </Text>
                                  {!!i.comment && (
                                    <Flex style={_.mt.sm}>
                                      <Text style={styles.comment} size={12}>
                                        {i.comment}
                                      </Text>
                                    </Flex>
                                  )}
                                </Flex.Item>
                              </Flex>
                            ))}
                          </Flex>
                        ))}
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}

export default obc(List)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: 32,
    marginHorizontal: _.wind - _._wind
  },
  line: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: '100%',
    marginLeft: -12,
    backgroundColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    transform: [
      {
        translateX: -0.5
      }
    ]
  },
  lineBottom: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: 0,
    width: 1,
    height: '100%',
    marginLeft: -12,
    backgroundColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    transform: [
      {
        translateX: -0.5
      }
    ]
  },
  nodeYear: {
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: 0,
    width: 4,
    height: 4,
    marginTop: -2,
    marginLeft: -12,
    backgroundColor: _.colorTitle,
    borderRadius: 2,
    transform: [
      {
        translateX: -2
      }
    ]
  },
  nodeMonth: {
    position: 'absolute',
    zIndex: 2,
    top: 22,
    left: 0,
    width: 8,
    height: 8,
    marginTop: -4,
    marginLeft: -4,
    backgroundColor: _.colorPlain,
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    borderRadius: 4,
    transform: [
      {
        translateX: -12
      }
    ]
  },
  nodeDay: {
    position: 'absolute',
    zIndex: 3,
    top: 8,
    left: 0,
    width: 6,
    height: 6,
    marginTop: -3,
    marginLeft: -12,
    backgroundColor: _.colorMain,
    borderRadius: 3,
    transform: [
      {
        translateX: -3
      }
    ]
  },
  subjects: {
    marginBottom: _.sm
  },
  cover: {
    width
  },
  subject: {
    marginRight: _.sm,
    marginBottom: _.md
  },
  subjectHalf: {
    maxWidth: 160,
    marginRight: _.sm,
    marginBottom: _.md
  },
  comment: {
    paddingVertical: _.xs,
    paddingHorizontal: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
