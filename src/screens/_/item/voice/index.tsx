/*
 * @Author: czy0729
 * @Date: 2020-04-28 12:02:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-11 19:39:13
 */
import React from 'react'
import { Expand, Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { cnjp } from '@utils'
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
    const cn = cnjp(nameCn, name)
    const jp = cnjp(name, nameCn)
    return (
      <Expand style={[styles.item, style]} ratio={2.2}>
        <Flex style={styles.wrap} align='start'>
          <Flex.Item flex={1.8}>
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
                  {cn}
                </Text>
                {!!jp && jp !== cn && (
                  <Text style={_.mt.xs} size={11} type='sub' lineHeight={12} bold>
                    {jp}
                  </Text>
                )}
              </Flex.Item>
            </Flex>
          </Flex.Item>
          <Flex.Item style={_.ml.sm} flex={3.2}>
            {subject.map((item, idx) => {
              const cn = cnjp(item.nameCn, item.name)
              const jp = cnjp(item.name, item.nameCn)
              return (
                <Flex key={item.id} style={idx !== 0 && _.mt.md} align='start'>
                  <Flex.Item style={_.mr.md}>
                    <Text align='right' size={12} bold>
                      {cn}
                    </Text>
                    <Text
                      style={_.mt.xs}
                      size={11}
                      type='sub'
                      align='right'
                      lineHeight={12}
                      bold
                    >
                      {jp}
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
              )
            })}
          </Flex.Item>
        </Flex>
        {children}
      </Expand>
    )
  }
)
