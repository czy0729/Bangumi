/*
 * @Author: czy0729
 * @Date: 2020-04-28 12:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-14 10:03:29
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import Cover from '../base/cover'
import Tag from '../base/tag'

function ItemVoice({
  style,
  navigation,
  event,
  index,
  id,
  name,
  nameCn,
  cover,
  subject
}) {
  const styles = memoStyles()
  return (
    <View style={[styles.item, style]}>
      <Flex style={[styles.wrap, index !== 0 && styles.border]} align='start'>
        <Flex.Item flex={2}>
          <Flex align='start'>
            <Image
              size={40}
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
              <Text bold>{name}</Text>
              {!!nameCn && (
                <Text style={_.mt.xs} size={13} type='sub'>
                  {nameCn}
                </Text>
              )}
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item style={_.ml.sm} flex={3.2}>
          {subject.map((item, idx) => (
            <Flex key={item.id} style={idx !== 0 && _.mt.md} align='start'>
              <Flex.Item>
                <Text align='right'>{item.name}</Text>
                <Flex style={_.mt.xs} align='start'>
                  <Flex.Item>
                    <Text
                      size={13}
                      type='sub'
                      align='right'
                      lineHeight={14}
                      bold
                    >
                      {item.nameCn}
                    </Text>
                  </Flex.Item>
                  <Tag style={_.ml.xs} value={item.staff} />
                </Flex>
              </Flex.Item>
              <Cover
                style={_.ml.sm}
                size={40}
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
    </View>
  )
}

ItemVoice.defaultProps = {
  event: EVENT,
  subject: []
}

export default observer(ItemVoice)

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
  }
}))
