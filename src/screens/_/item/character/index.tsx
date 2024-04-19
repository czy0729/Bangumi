/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 16:57:11
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { cnjp, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { Cover, InView, Tag } from '../../base'
import { COMPONENT, IMG_WIDTH, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCharacterProps } from './types'

export { ItemCharacterProps }

export const ItemCharacter = obc(
  (
    {
      event = EVENT,
      index,
      type = 'character',
      id,
      cover,
      name,
      nameCn,
      replies,
      info,
      actors = [],
      positions = [],
      position,
      children
    }: ItemCharacterProps,
    { navigation }
  ) => {
    const styles = memoStyles()
    const cn = HTMLDecode(cnjp(nameCn, name)).trim()
    const jp = HTMLDecode(cnjp(name, nameCn)).trim()
    const _positions = positions.length ? positions : [position]
    const onPress = () => {
      const monoId = String(id).includes(type) ? id : `${type}/${id}`
      t(event.id, {
        to: 'Mono',
        monoId
      })

      navigation.push('Mono', {
        monoId,
        _name: cn,
        _jp: jp,
        _image: cover
      })
    }
    const y = ITEM_HEIGHT * index + 1

    return (
      <Component id='item-character' data-key={id} style={styles.container}>
        <Flex style={styles.wrap} align='start'>
          <InView style={styles.inViewCover} y={y}>
            {!!cover && (
              <Touchable animate scale={0.9} onPress={onPress}>
                <Cover src={cover} width={IMG_WIDTH} height={IMG_WIDTH} radius shadow />
              </Touchable>
            )}
          </InView>
          <Flex.Item style={_.ml.wind}>
            <Touchable style={styles.touch} animate onPress={onPress}>
              <Flex direction='column' justify='between' align='start'>
                <View>
                  <Flex style={_.container.block} align='start'>
                    <Flex.Item style={_.mr.md}>
                      <Text size={15} numberOfLines={2} bold>
                        {cn}
                        {!!jp && jp !== cn && (
                          <Text type='sub' size={11} lineHeight={15} bold>
                            {' '}
                            {jp}
                          </Text>
                        )}
                        {!!replies && (
                          <Text type='main' size={11} lineHeight={15} bold>
                            {' '}
                            {replies.replace(/\(|\)/g, '')}
                          </Text>
                        )}
                      </Text>
                    </Flex.Item>
                  </Flex>
                  <Flex style={_.mt.sm} wrap='wrap'>
                    {_positions.map(item => (
                      <Tag key={item} style={styles.position} value={item} />
                    ))}
                  </Flex>
                  {!!info && (
                    <Text style={_.mt.xs} size={12}>
                      {HTMLDecode(info)}
                    </Text>
                  )}
                </View>
              </Flex>
            </Touchable>
            <Flex style={_.mt.sm} wrap='wrap'>
              {actors.map(item => {
                const cn = cnjp(item.nameCn, item.name)
                const jp = cnjp(item.name, item.nameCn)
                return (
                  <Touchable
                    key={item.id}
                    style={styles.touchActor}
                    animate
                    onPress={() => {
                      const monoId = String(item.id).includes('person')
                        ? item.id
                        : `person/${item.id}`
                      t(event.id, {
                        to: 'Mono',
                        monoId
                      })

                      navigation.push('Mono', {
                        monoId
                      })
                    }}
                  >
                    <Flex>
                      <InView style={styles.inViewAvatar} y={y}>
                        <Cover src={item.cover} size={_.r(32)} radius shadow />
                      </InView>
                      <Flex.Item style={_.ml.sm}>
                        <Text size={12} numberOfLines={1} bold lineHeight={13}>
                          {cn}
                        </Text>
                        {!!jp && jp !== cn && (
                          <Text size={11} type='sub' numberOfLines={1}>
                            {jp}
                          </Text>
                        )}
                      </Flex.Item>
                    </Flex>
                  </Touchable>
                )
              })}
            </Flex>
          </Flex.Item>
        </Flex>
        {children}
      </Component>
    )
  },
  COMPONENT
)
