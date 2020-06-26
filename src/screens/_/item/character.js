/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:08:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 16:56:53
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import Tag from '../base/tag'
import Cover from '../base/cover'

const imgWidth = 56

function ItemCharacter(
  {
    event,
    index,
    type,
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
    actorCn
  },
  { navigation }
) {
  const styles = memoStyles()
  const isFirst = index === 0
  const onPress = () => {
    t(event.id, {
      to: 'Mono',
      monoId: `${type}/${id}`
    })
    navigation.push('Mono', {
      monoId: `${type}/${id}`,
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
          <Touchable onPress={onPress}>
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
                        <Text type='main' size={13} lineHeight={15}>
                          {' '}
                          {replies}
                        </Text>
                      )}
                    </Text>
                  </Flex.Item>
                  {!!position && <Tag style={_.ml.sm} value={position} />}
                </Flex>
                {!!info && (
                  <Text style={_.mt.sm} size={12}>
                    {HTMLDecode(info)}
                  </Text>
                )}
              </View>
            </Flex>
          </Touchable>
          {!!actorId && (
            <Touchable
              style={_.mt.md}
              onPress={() => {
                t(event.id, {
                  to: 'Mono',
                  monoId: `person/${actorId}`
                })

                navigation.push('Mono', {
                  monoId: `person/${actorId}`
                })
              }}
            >
              <Flex>
                <Cover src={actorCover} size={32} radius shadow />
                <Flex.Item style={_.ml.sm}>
                  <Text size={12} numberOfLines={1} bold lineHeight={13}>
                    {actor}
                  </Text>
                  {!!actorCn && (
                    <Text size={12} type='sub' numberOfLines={1}>
                      {actorCn}
                    </Text>
                  )}
                </Flex.Item>
              </Flex>
            </Touchable>
          )}
        </Flex.Item>
      </Flex>
    </View>
  )
}

ItemCharacter.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

ItemCharacter.defaultProps = {
  event: EVENT,
  type: 'character' // character | person
}

export default observer(ItemCharacter)

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
  }
}))
