/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:49:22
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Image } from '@components'
import { _, systemStore } from '@stores'
import { Avatar } from '@_'
import { formatNumber, HTMLDecode, stl, tinygrailOSS } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import { ColorValue, Navigation } from '@types'
import Rank from '../rank'
import { memoStyles } from './styles'

function ItemTemple(
  {
    style = undefined,
    id = undefined,
    assets,
    avatar,
    cover,
    event,
    level,
    name,
    rank = undefined,
    nickname,
    sacrifices,
    type = undefined,
    userId = undefined,
    onPress = undefined
  },
  {
    navigation
  }: {
    navigation: Navigation
  }
) {
  const styles = memoStyles()
  const { avatarRound, coverRadius } = systemStore.setting
  const { id: eventId, data: eventData } = event || EVENT
  const isView = type === 'view' // 后来加的最近圣殿
  const _name = HTMLDecode(nickname || name)

  let colorLevel: ColorValue
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
    <View style={stl(styles.item, style)}>
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
          size={styles.imageResize.width}
          height={styles.imageResize.height}
          src={tinygrailOSS(cover)}
          imageViewer={!onPress}
          imageViewerSrc={tinygrailOSS(cover, 480)}
          resizeMode={
            // 高度远小于宽度的图不能contain, 会留白
            styles.imageResize.height * 1.2 >= styles.imageResize.width
              ? 'cover'
              : 'contain'
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
                  borderRadius: avatarRound ? 36 : coverRadius + 2
                }
              ]}
              justify='center'
            >
              <Avatar
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
            numberOfLines={2}
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
                  borderRadius: avatarRound ? 36 : coverRadius + 2
                }
              ]}
              justify='center'
            >
              <Avatar
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
            <Text type='tinygrailPlain' size={11} bold numberOfLines={2}>
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

export default obc(ItemTemple)
