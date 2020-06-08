/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 22:13:52
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { Avatar } from '@screens/_'
import { HTMLDecode } from '@utils/html'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'

const imageWidth = _.window.contentWidth * 0.28
const marginLeft = (_.window.contentWidth - 3 * imageWidth) / 4

function ItemTemple(
  {
    style,
    id,
    userId,
    cover,
    avatar,
    name,
    nickname,
    assets,
    sacrifices,
    event,
    type,
    level,
    count,
    onPress
  },
  { navigation }
) {
  const styles = memoStyles()
  const { id: eventId, data: eventData } = event
  const isView = type === 'view' // 后来加的最近圣殿
  const isFormCharaAssets = !!onPress
  const _name = HTMLDecode(nickname || name)

  let colorLevel
  if (level === 3) {
    colorLevel = _.colorDanger
  } else if (level === 2) {
    colorLevel = _.colorWarning
  }

  const numText = assets
    ? assets === sacrifices
      ? assets
      : `${assets} / ${sacrifices}`
    : sacrifices
  return (
    <View style={[styles.item, style]}>
      <Image
        style={styles.image}
        size={imageWidth}
        height={imageWidth * 1.28}
        src={tinygrailOSS(cover)}
        radius
        imageViewer={!onPress}
        imageViewerSrc={tinygrailOSS(cover, 480)}
        border={colorLevel}
        borderWidth={_.tSelect(3, 2)}
        event={{
          id: eventId,
          data: {
            name,
            ...eventData
          }
        }}
        onPress={onPress}
      />
      {isView ? (
        <View style={_.mt.sm}>
          <Text
            type='tinygrailPlain'
            numberOfLines={1}
            onPress={() => {
              t(eventId, {
                to: 'TinygrailSacrifice',
                monoId: id,
                ...eventData
              })

              navigation.push('TinygrailSacrifice', {
                monoId: `character/${id}`
              })
            }}
          >
            {HTMLDecode(name)}
          </Text>
          <Text
            style={_.mt.xs}
            type='tinygrailText'
            size={12}
            numberOfLines={1}
            onPress={() => {
              t(eventId, {
                to: 'Zone',
                userId,
                ...eventData
              })

              navigation.push('Zone', {
                userId,
                from: 'tinygrail',
                _id: userId,
                _name: nickname
              })
            }}
          >
            {HTMLDecode(nickname)}
          </Text>
        </View>
      ) : (
        <Touchable style={_.mt.sm} withoutFeedback onPress={onPress}>
          <Flex>
            {!!avatar && (
              <Avatar
                style={[styles.avatar, _.mr.sm]}
                navigation={navigation}
                size={28}
                src={avatar}
                userId={name}
                name={_name}
                borderColor='transparent'
                event={event}
              />
            )}
            <Flex.Item>
              <Text
                type='tinygrailPlain'
                size={isFormCharaAssets ? 14 : 12}
                numberOfLines={1}
              >
                {numText}
              </Text>
              <Text
                style={styles.name}
                type='tinygrailText'
                size={isFormCharaAssets ? 12 : 10}
                numberOfLines={1}
              >
                {_name}
              </Text>
            </Flex.Item>
            {count > 1 && (
              <Text style={_.ml.xs} type='warning' size={12}>
                x{count}
              </Text>
            )}
          </Flex>
        </Touchable>
      )}
    </View>
  )
}

ItemTemple.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

ItemTemple.defaultProps = {
  event: EVENT
}

export default observer(ItemTemple)

const memoStyles = _.memoStyles(_ => ({
  item: {
    width: imageWidth,
    marginTop: 24,
    marginLeft
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg),
    ..._.tSelect(undefined, _.shadow)
  },
  name: {
    marginTop: 1
  }
}))
