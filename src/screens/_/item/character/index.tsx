/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:02:32
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import { Tag, Cover } from '../../base'
import { IMG_WIDTH } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCharacterProps } from './types'
import { cnjp } from '@utils'

export { ItemCharacterProps }

export const ItemCharacter = obc(
  (
    {
      event = EVENT,
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
    return (
      <View style={styles.container}>
        <Flex style={styles.wrap} align='start'>
          <View style={styles.imgContainer}>
            {!!cover && (
              <Touchable animate scale={0.9} onPress={onPress}>
                <Cover src={cover} width={IMG_WIDTH} height={IMG_WIDTH} radius shadow />
              </Touchable>
            )}
          </View>
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
                      <Cover src={item.cover} size={_.r(32)} radius shadow />
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
      </View>
    )
  }
)
