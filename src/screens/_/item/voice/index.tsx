/*
 * @Author: czy0729
 * @Date: 2020-04-28 12:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 11:47:26
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT, IMG_WIDTH, IMG_HEIGHT } from '@constants'
import { Cover, Tag } from '../../base'
import { AVATAR_SIZE } from './ds'
import { memoStyles } from './styles'
import { Props as ItemVoiceProps } from './types'

export { ItemVoiceProps }

export const ItemVoice = ob(
  ({
    style,
    navigation,
    event = EVENT,
    id,
    name,
    nameCn,
    cover,
    subject = [],
    children
  }: ItemVoiceProps) => {
    const styles = memoStyles()
    return (
      <View style={[styles.item, style]}>
        <Flex style={styles.wrap} align='start'>
          <Flex.Item flex={2}>
            <Flex align='start'>
              <Image
                size={AVATAR_SIZE}
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
                <Text size={12} bold>
                  {HTMLDecode(name)}
                </Text>
                {!!nameCn && nameCn !== name && (
                  <Text style={_.mt.xs} size={11} type='sub' lineHeight={12} bold>
                    {HTMLDecode(nameCn)}
                  </Text>
                )}
              </Flex.Item>
            </Flex>
          </Flex.Item>
          <Flex.Item style={_.ml.sm} flex={3.2}>
            {subject.map((item, idx) => (
              <Flex key={item.id} style={idx !== 0 && _.mt.md} align='start'>
                <Flex.Item style={_.mr.md}>
                  <Text align='right' size={12} bold>
                    {HTMLDecode(item.name)}
                  </Text>
                  <Text
                    style={_.mt.xs}
                    size={11}
                    type='sub'
                    align='right'
                    lineHeight={12}
                    bold
                  >
                    {HTMLDecode(item.nameCn)}
                  </Text>
                  <Flex style={_.mt.sm} justify='end'>
                    <Tag value={item.staff} />
                  </Flex>
                </Flex.Item>
                <Cover
                  size={IMG_WIDTH}
                  height={IMG_HEIGHT}
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
