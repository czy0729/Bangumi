/*
 * @Author: czy0729
 * @Date: 2020-04-28 12:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 22:51:04
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { EVENT } from '@constants'
import { Cover, Tag } from '../../base'
import { AVATAR_SIZE, COVER_WIDTH, COVER_HEIGHT } from './ds'
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
                <Text size={13} bold>
                  {HTMLDecode(name)}
                </Text>
                {!!nameCn && nameCn !== name && (
                  <Text style={_.mt.xs} size={11} type='sub'>
                    {HTMLDecode(nameCn)}
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
                    {HTMLDecode(item.name)}
                  </Text>
                  <Flex style={_.mt.xs} align='start'>
                    <Flex.Item>
                      <Text size={11} type='sub' align='right' lineHeight={14} bold>
                        {HTMLDecode(item.nameCn)}
                      </Text>
                    </Flex.Item>
                    <Tag style={styles.tag} value={item.staff} />
                  </Flex>
                </Flex.Item>
                <Cover
                  size={COVER_WIDTH}
                  height={COVER_HEIGHT}
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
