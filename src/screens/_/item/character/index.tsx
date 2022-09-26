/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 12:01:09
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
      position,
      info,
      actorId,
      actorCover,
      actor,
      actorCn,
      children
    }: ItemCharacterProps,
    { navigation }
  ) => {
    const styles = memoStyles()
    const _nameCn = String(nameCn || name).trim()
    const onPress = () => {
      const monoId = String(id).includes(type) ? id : `${type}/${id}`
      t(event.id, {
        to: 'Mono',
        monoId
      })
      navigation.push('Mono', {
        monoId,
        _name: _nameCn,
        _jp: name,
        _image: cover
      })
    }
    return (
      <View style={styles.container}>
        <Flex align='start' style={styles.wrap}>
          <View style={styles.imgContainer}>
            {!!cover && (
              <Cover
                src={cover}
                width={IMG_WIDTH}
                height={IMG_WIDTH}
                radius
                shadow
                onPress={onPress}
              />
            )}
          </View>
          <Flex.Item style={_.ml.wind}>
            <Touchable style={styles.touch} onPress={onPress}>
              <Flex direction='column' justify='between' align='start'>
                <View>
                  <Flex style={_.container.block} align='start'>
                    <Flex.Item>
                      <Text size={15} numberOfLines={2} bold>
                        {HTMLDecode(_nameCn)}
                        {name !== _nameCn && (
                          <Text type='sub' size={13} lineHeight={15} bold>
                            {' '}
                            {HTMLDecode(name)}
                          </Text>
                        )}
                        {!!replies && (
                          <Text type='main' size={12} lineHeight={15} bold>
                            {' '}
                            {replies.replace(/\(|\)/g, '')}
                          </Text>
                        )}
                      </Text>
                    </Flex.Item>
                    {!!position && position.length <= 16 && (
                      <Tag style={_.ml.sm} value={position} />
                    )}
                  </Flex>
                  {!!position && position.length > 16 && (
                    <Flex style={_.mt.sm}>
                      <Tag value={position} align='left' />
                    </Flex>
                  )}
                  {!!info && (
                    <Text style={_.mt.xs} size={12}>
                      {HTMLDecode(info)}
                    </Text>
                  )}
                </View>
              </Flex>
            </Touchable>
            {!!actorId && (
              <Touchable
                style={styles.touchActor}
                onPress={() => {
                  const monoId = String(actorId).includes('person')
                    ? actorId
                    : `person/${actorId}`
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
                  <Cover src={actorCover} size={_.r(32)} radius shadow />
                  <Flex.Item style={_.ml.sm}>
                    <Text size={12} numberOfLines={1} bold lineHeight={13}>
                      {actor}
                    </Text>
                    {!!actorCn && actorCn !== actor && (
                      <Text size={11} type='sub' numberOfLines={1}>
                        {actorCn}
                      </Text>
                    )}
                  </Flex.Item>
                </Flex>
              </Touchable>
            )}
          </Flex.Item>
        </Flex>
        {children}
      </View>
    )
  }
)
