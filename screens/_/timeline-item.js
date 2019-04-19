/*
 * @Author: czy0729
 * @Date: 2019-04-14 07:23:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-20 02:44:48
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Touchable } from '@components'
// import { appLocation } from '@utils/app'
import _, { wind, md, colorPlain, colorBorder } from '@styles'
import Stars from './stars'

const avatarWidth = 28

const TimelineItem = ({
  style,
  index,
  avatar,
  p1,
  p2,
  p3,
  p4,
  subject,
  subjectId,
  star,
  comment,
  reply,
  time,
  image,
  navigation
}) => {
  const isTop = index === 0

  let $p3
  if (p3.text.length > 1) {
    $p3 = []
    p3.text.forEach(item => {
      $p3.push(
        <Text key={item} type='main' size={12}>
          {item}
        </Text>,
        <Text key={`${item}.`} size={12}>
          、
        </Text>
      )
    })
    $p3.pop()
  } else {
    $p3 = (
      <Text type='main' size={12}>
        {p3.text}
      </Text>
    )
  }

  return (
    <Flex style={[styles.item, style]} align='start'>
      <View style={styles.image}>
        {!!avatar && (
          <Image src={avatar} size={avatarWidth} radius border={colorBorder} />
        )}
      </View>
      <Flex.Item style={[styles.content, !isTop && styles.border, _.ml.sm]}>
        <Flex align='start'>
          <Flex.Item>
            <Flex wrap='wrap'>
              {!!p1.text && (
                <Text style={_.mr.xs} type='main' size={12}>
                  {p1.text}
                </Text>
              )}
              <Text style={_.mr.xs} size={12}>
                {p2.text}
              </Text>
              {$p3}
              {!!p4.text && (
                <Text style={_.ml.xs} size={12}>
                  {p4.text}
                </Text>
              )}
            </Flex>
            {!!subject && (
              <Touchable
                style={_.mt.sm}
                onPress={() => {
                  navigation.push('Subject', {
                    subjectId
                  })
                }}
              >
                <Text>{subject}</Text>
              </Touchable>
            )}
            {!!(comment || reply.content) && (
              <Text style={_.mt.sm} lineHeight={20}>
                {comment || reply.content}
              </Text>
            )}
            {image.length > 1 && (
              <Flex style={_.mt.sm} justify='end'>
                {image.map(item => (
                  <Image
                    key={item}
                    style={_.ml.sm}
                    src={item}
                    size={48}
                    radius
                    border={colorBorder}
                  />
                ))}
              </Flex>
            )}
            <Flex style={_.mt.md} align='baseline'>
              {!!reply.count && (
                <Text type='primary' size={12}>
                  {reply.count}
                </Text>
              )}
              <Text style={_.mr.sm} type='sub' size={12}>
                {time}
              </Text>
              <Stars value={star} simple={false} />
            </Flex>
          </Flex.Item>
          {image.length === 1 && (
            <Image
              style={_.ml.sm}
              src={image[0]}
              size={48}
              radius
              border={colorBorder}
            />
          )}
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

TimelineItem.defaultProps = {
  p1: {},
  p2: {},
  p3: {
    text: [],
    url: []
  },
  p4: {},
  reply: {},
  image: []
}

export default observer(TimelineItem)

const styles = StyleSheet.create({
  item: {
    backgroundColor: colorPlain
  },
  image: {
    width: avatarWidth,
    marginTop: md,
    marginLeft: wind
  },
  content: {
    paddingVertical: md,
    paddingRight: wind
  },
  border: {
    borderTopColor: colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
