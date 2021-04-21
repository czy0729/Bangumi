/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 18:15:46
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import { Tag, Cover } from '../base'

const imgWidth = 56

export const ItemCharacter = obc(
  (
    {
      event = EVENT,
      index,
      type = 'character', // character | person
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
    },
    { navigation }
  ) => {
    const styles = memoStyles()
    const isFirst = index === 0
    const onPress = () => {
      const monoId = String(id).includes(type) ? id : `${type}/${id}`
      t(event.id, {
        to: 'Mono',
        monoId
      })
      navigation.push('Mono', {
        monoId,
        _name: nameCn,
        _jp: name,
        _image: cover
      })
    }
    return (
      <View style={styles.container}>
        <Flex
          align='start'
          style={[styles.wrap, !isFirst && !_.flat && styles.border]}
        >
          <View style={styles.imgContainer}>
            {!!cover && (
              <Cover
                style={styles.image}
                src={cover}
                width={imgWidth}
                height={imgWidth}
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
                  <Flex align='start' style={{ width: '100%' }}>
                    <Flex.Item>
                      <Text size={15} numberOfLines={2} bold>
                        {HTMLDecode(nameCn)}
                        {name !== nameCn && (
                          <Text type='sub' size={13} lineHeight={15} bold>
                            {' '}
                            {HTMLDecode(name)}
                          </Text>
                        )}
                        {!!replies && (
                          <Text type='main' size={12} lineHeight={15}>
                            {' '}
                            {replies}
                          </Text>
                        )}
                      </Text>
                    </Flex.Item>
                    {!!position && <Tag style={_.ml.sm} value={position} />}
                  </Flex>
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
                  <Cover src={actorCover} size={32} radius shadow />
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

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  imgContainer: {
    width: imgWidth
  },
  wrap: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  touch: {
    paddingLeft: _.xs,
    marginLeft: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touchActor: {
    marginTop: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
