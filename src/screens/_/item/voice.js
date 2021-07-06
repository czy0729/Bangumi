/*
 * @Author: czy0729
 * @Date: 2020-04-28 12:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-05 18:24:52
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Cover, Tag } from '../base'

const avatarSize = 40 * _.ratio
const coverWidth = 48 * _.ratio
const coverHeight = coverWidth * 1.4

export const ItemVoice = ob(
  ({
    style,
    navigation,
    event = EVENT,
    index,
    id,
    name,
    nameCn,
    cover,
    subject = [],
    children
  }) => {
    const styles = memoStyles()
    return (
      <View style={[styles.item, style]}>
        <Flex
          style={[styles.wrap, index !== 0 && !_.flat && styles.border]}
          align='start'
        >
          <Flex.Item flex={2}>
            <Flex align='start'>
              <Image
                size={avatarSize}
                src={cover}
                radius
                shadow
                onPress={() => {
                  t(event.id, {
                    ...event.data,
                    to: 'Mono',
                    monoId: id
                  })

                  navigation.push('Mono', {
                    monoId: `character/${id}`,
                    _jp: name,
                    _cn: nameCn,
                    _image: cover
                  })
                }}
              />
              <Flex.Item style={_.ml.sm}>
                <Text size={13} bold>
                  {name}
                </Text>
                {!!nameCn && nameCn !== name && (
                  <Text style={_.mt.xs} size={11} type='sub'>
                    {nameCn}
                  </Text>
                )}
              </Flex.Item>
            </Flex>
          </Flex.Item>
          <Flex.Item style={_.ml.sm} flex={3.2}>
            {subject.map((item, idx) => (
              <Flex key={item.id} style={idx !== 0 && _.mt.md} align='start'>
                <Flex.Item style={_.mr.sm}>
                  <Text align='right' size={13}>
                    {item.name}
                  </Text>
                  <Flex style={_.mt.xs} align='start'>
                    <Flex.Item>
                      <Text
                        size={11}
                        type='sub'
                        align='right'
                        lineHeight={14}
                        bold
                      >
                        {item.nameCn}
                      </Text>
                    </Flex.Item>
                    <Tag style={styles.tag} value={item.staff} />
                  </Flex>
                </Flex.Item>
                <Cover
                  size={coverWidth}
                  height={coverHeight}
                  src={item.cover}
                  radius
                  shadow
                  onPress={() => {
                    t(event.id, {
                      ...event.data,
                      to: 'Subject',
                      subjectId: item.id
                    })

                    navigation.push('Subject', {
                      subjectId: item.id,
                      _jp: item.name,
                      _cn: item.nameCn,
                      _image: item.cover
                    })
                  }}
                />
              </Flex>
            ))}
          </Flex.Item>
        </Flex>
        {children}
      </View>
    )
  }
)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  tag: {
    marginTop: 2,
    marginLeft: _.xs
  }
}))
