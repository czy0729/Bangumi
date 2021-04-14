/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-10 00:42:31
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Image } from '@components'
import { _, systemStore } from '@stores'
import { Avatar } from '@screens/_'
import { formatNumber } from '@utils'
import { HTMLDecode } from '@utils/html'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import Rank from './rank'

const imageWidth = _.window.contentWidth * 0.28
const imageHeight = imageWidth * 1.28
const imageResizeWidth = imageWidth * 1.2
const imageResizeHeight = imageHeight * 1.2
const marginLeft = (_.window.contentWidth - 3 * imageWidth) / 4

function ItemTemple(
  {
    style,
    id,
    assets,
    avatar,
    cover,
    event,
    level,
    name,
    rank,
    nickname,
    sacrifices,
    type,
    userId,
    onPress
  },
  { navigation }
) {
  const styles = memoStyles()
  const { avatarRound } = systemStore.setting
  const { id: eventId, data: eventData } = event
  const isView = type === 'view' // 后来加的最近圣殿
  const _name = HTMLDecode(nickname || name)

  let colorLevel
  if (level === 3) {
    colorLevel = '#b169ff'
  } else if (level === 2) {
    colorLevel = '#ffc107'
  }

  const text = [formatNumber(assets, 0)]
  if (assets !== sacrifices) {
    text.push(formatNumber(sacrifices, 0))
  }
  return (
    <View style={[styles.item, style]}>
      <View
        style={[
          styles.wrap,
          {
            borderColor: colorLevel,
            borderWidth: colorLevel ? _.tSelect(2, 3) : 0
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
            style={_.mt.xs}
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
          <Flex style={_.mt.xs}>
            <Rank value={rank} />
            <Text type='tinygrailPlain' size={11} bold numberOfLines={1}>
              {_name}
            </Text>
          </Flex>
          <Text style={_.mt.xs} type='tinygrailText' size={10} bold>
            {text.join(' / ')}
          </Text>
        </View>
      )}
    </View>
  )
}

export default obc(ItemTemple, {
  event: EVENT
})

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
