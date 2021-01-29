/*
 * @Author: czy0729
 * @Date: 2020-11-19 10:51:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 15:20:51
 */
import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Flex, Text } from '@components'
import { Cover, Avatar } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'

const imageWidth = _.window.width * 0.34 * 0.5625
const imageHeight = imageWidth * 1.38
const linearColor = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.4)',
  'rgba(0, 0, 0, 0.9)'
]

function CoverXs({ title, avatar, data }, { navigation }) {
  const styles = memoStyles()
  const { avatarRound } = systemStore.setting
  return (
    <View>
      <View style={styles.item}>
        <Cover
          src={data.cover}
          width={imageWidth}
          height={imageHeight}
          radius
          placeholder={false}
          onPress={() => {
            t('发现.跳转', {
              to: 'Subject',
              from: title,
              type: 'xs',
              subjectId: data.id
            })

            navigation.push('Subject', {
              subjectId: data.id,
              _jp: data.name,
              _image: data.cover
            })
          }}
        />
        <LinearGradient
          style={styles.linear}
          colors={linearColor}
          pointerEvents='none'
        />
        <Text
          style={styles.desc}
          size={8}
          type={_.select('plain', 'title')}
          numberOfLines={2}
          bold
          pointerEvents='none'
        >
          {data.name}
        </Text>
      </View>
      {!!avatar && (
        <Flex
          style={[
            styles.fixed,
            {
              borderRadius: avatarRound ? 28 : _.radiusSm
            }
          ]}
          justify='center'
        >
          <Avatar
            style={styles.avatar}
            navigation={navigation}
            size={24}
            src={avatar}
            userId={data.userId}
            name={data.userName}
            borderColor='transparent'
          />
        </Flex>
      )}
    </View>
  )
}

export default obc(CoverXs)

const memoStyles = _.memoStyles(_ => ({
  item: {
    marginRight: _._wind + 2,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  linear: {
    position: 'absolute',
    zIndex: 1,
    height: 64,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5,
    borderBottomRightRadius: _.radiusSm,
    borderBottomLeftRadius: _.radiusSm
  },
  desc: {
    position: 'absolute',
    zIndex: 2,
    right: 2,
    bottom: 4,
    left: 26,
    opacity: 0.92
  },
  fixed: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    left: 0,
    width: 28,
    height: 28,
    marginLeft: -6,
    marginBottom: -2,
    backgroundColor: _.select(_.colorPlain, _.colorBg)
  },
  avatar: {
    backgroundColor: _.select(_.colorPlain, _.colorBg)
  }
}))
