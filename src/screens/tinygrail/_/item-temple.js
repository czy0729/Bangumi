/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-27 01:38:31
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Image } from '@components'
import { _, systemStore } from '@stores'
import { Avatar } from '@screens/_'
import { HTMLDecode } from '@utils/html'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'

const imageWidth = _.window.contentWidth * 0.28
const imageHeight = imageWidth * 1.28
const imageResizeWidth = imageWidth * 1.2
const imageResizeHeight = imageHeight * 1.2
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
    // count,
    onPress
  },
  { navigation }
) {
  const styles = memoStyles()
  const { avatarRound } = systemStore.setting
  const { id: eventId, data: eventData } = event
  const isView = type === 'view' // 后来加的最近圣殿
  // const isFormCharaAssets = !!onPress
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
      <View
        style={[
          styles.wrap,
          {
            borderColor: colorLevel,
            borderWidth: colorLevel ? 3 : 0
          }
        ]}
      >
        <Image
          style={styles.image}
          size={imageResizeWidth}
          height={imageResizeHeight}
          src={tinygrailOSS(cover)}
          imageViewer={!onPress}
          imageViewerSrc={tinygrailOSS(cover, 480)}
          resizeMode={
            // 高度远小于宽度的图不能contain, 会留白
            imageResizeHeight * 1.2 >= imageResizeWidth ? 'cover' : 'contain'
          }
          event={{
            id: eventId,
            data: {
              name,
              ...eventData
            }
          }}
          onPress={onPress}
        />
      </View>
      {isView ? (
        <View style={_.mt.sm}>
          {!!avatar && (
            <Flex
              style={[
                styles.fixed,
                {
                  borderRadius: avatarRound ? 36 : _.radiusSm
                }
              ]}
              justify='center'
            >
              <Avatar
                style={styles.avatar}
                navigation={navigation}
                size={31}
                src={avatar}
                userId={userId}
                name={_name}
                borderColor='transparent'
                event={event}
              />
            </Flex>
          )}
          <Text
            type='tinygrailPlain'
            size={11}
            bold
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
        </View>
      ) : (
        <View style={_.mt.sm}>
          {!!avatar && (
            <Flex
              style={[
                styles.fixed,
                {
                  borderRadius: avatarRound ? 36 : _.radiusSm
                }
              ]}
              justify='center'
            >
              <Avatar
                style={styles.avatar}
                navigation={navigation}
                size={31}
                src={avatar}
                userId={name}
                name={_name}
                borderColor='transparent'
                event={event}
              />
            </Flex>
          )}
          <Text
            style={styles.name}
            type='tinygrailPlain'
            size={11}
            bold
            numberOfLines={1}
          >
            {numText}
            <Text
              type='tinygrailText'
              size={10}
              lineHeight={11}
              numberOfLines={1}
            >
              {' '}
              {_name}
            </Text>
          </Text>
        </View>
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
    marginTop: _.sm,
    marginBottom: _.sm + 2,
    marginLeft
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  wrap: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  image: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    marginLeft: -(imageResizeWidth - imageWidth) / 2,
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  name: {
    marginTop: 1
  },
  fixed: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: 36,
    height: 36,
    marginTop: -36,
    marginLeft: -6,
    backgroundColor: _.colorTinygrailContainer
  }
}))
