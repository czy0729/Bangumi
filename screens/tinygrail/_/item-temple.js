/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-25 11:17:54
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Image } from '@components'
import { _ } from '@stores'
import { Avatar } from '@screens/_'
import { HTMLDecode } from '@utils/html'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'

const imageWidth = _.window.width * 0.28
const marginLeft = (_.window.width - 3 * imageWidth) / 4

function ItemTemple(
  {
    id,
    userId,
    cover,
    avatar,
    name,
    nickname,
    sacrifices,
    event,
    type,
    level,
    count,
    onPress
  },
  { navigation }
) {
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
  return (
    <View style={styles.item}>
      <Image
        size={imageWidth}
        height={imageWidth * 1.28}
        src={tinygrailOSS(cover)}
        radius
        imageViewer={!onPress}
        imageViewerSrc={tinygrailOSS(cover, 480)}
        border={colorLevel}
        borderWidth={3}
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
            style={{
              color: _.colorTinygrailPlain
            }}
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
            style={[
              {
                color: _.colorTinygrailText
              },
              _.mt.xs
            ]}
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
                style={_.mr.sm}
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
                style={{
                  color: _.colorTinygrailPlain
                }}
                size={isFormCharaAssets ? 16 : 14}
                numberOfLines={1}
              >
                {sacrifices}
              </Text>
              <Text
                style={{
                  marginTop: 2,
                  color: _.colorTinygrailText
                }}
                size={isFormCharaAssets ? 12 : 10}
                numberOfLines={1}
              >
                {_name}
              </Text>
            </Flex.Item>
            {count > 1 && (
              <Text style={_.ml.xs} type='warning'>
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

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginTop: 24,
    marginLeft
  }
})
