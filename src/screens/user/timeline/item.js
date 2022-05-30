/*
 * @Author: czy0729
 * @Date: 2022-03-26 15:28:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-29 12:44:04
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Cover, Stars, Tag } from '@_'
import { _ } from '@stores'
import { findSubjectCn } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IMG_WIDTH, IMG_HEIGHT } from '@constants'

const width = _.r(IMG_WIDTH / 1.1)
const height = _.r(IMG_HEIGHT / 1.1)

function Item({ subject, action }, { navigation }) {
  const styles = memoStyles()
  return (
    <Flex style={styles.subjects} align='start' wrap='wrap'>
      <View style={styles.nodeDay} />
      {subject.map(i => {
        const cn = findSubjectCn(i.name)
        let type = '动画'
        if (action.includes('读')) type = '书籍'
        if (action.includes('听')) type = '音乐'
        if (action.includes('玩')) type = '游戏'
        return (
          <Flex
            key={String(i.id)}
            style={subject.length > 1 ? styles.subjectHalf : styles.subject}
            align='start'
          >
            <View style={styles.cover}>
              <Cover
                src={i.cover}
                width={width}
                height={height}
                type={type}
                radius
                onPress={() => {
                  t('时间线.跳转', {
                    to: 'Suject',
                    subjectId: i.id
                  })

                  navigation.push('Subject', {
                    subjectId: i.id,
                    _cn: cn,
                    _jp: i.name,
                    _image: i.cover,
                    _type: type
                  })
                }}
              />
            </View>
            <Flex.Item style={_.ml.md}>
              <Flex>
                <Tag value={action.replace('了', '')} />
                {!!i.star && <Stars style={_.ml.xs} value={i.star} size={10} />}
              </Flex>
              <Text style={_.mt.sm} size={12} bold numberOfLines={3}>
                {cn}
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
        )
      })}
    </Flex>
  )
}

export default obc(Item)

const memoStyles = _.memoStyles(() => ({
  nodeDay: {
    position: 'absolute',
    zIndex: 3,
    top: _.r(8),
    left: 0,
    width: _.r(6),
    height: _.r(6),
    marginTop: _.r(-3),
    marginLeft: _.r(-12),
    backgroundColor: _.colorMain,
    borderRadius: _.r(3),
    transform: [
      {
        translateX: _.r(-3)
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
    maxWidth: _.r(160),
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
