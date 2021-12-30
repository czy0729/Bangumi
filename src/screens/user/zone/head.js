/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-30 08:03:56
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Image, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { t } from '@utils/fetch'
// import User from './user'

const avatarSize = 88 * _.ratio

function Head({ style }, { $, navigation }) {
  const styles = memoStyles()
  const { _id, _name } = $.params
  const { originUid } = $.state
  const { nickname, id, username } = $.usersInfo
  const { join, percent, disconnectUrl } = $.users
  const userId = id || _id
  const isRename = username != userId
  const isFriend = !!disconnectUrl
  const userName = HTMLDecode(nickname || _name)
  return (
    <Flex style={style} direction='column'>
      <View>
        <Image
          style={styles.avatar}
          size={avatarSize}
          radius={avatarSize / 2}
          border={_.__colorPlain__}
          borderWidth={2}
          shadow
          src={$.src}
        />
        <Text style={styles.l1} type={_.select('plain', 'title')} size={11}>
          {join || '- 加入'}
        </Text>
        <Text style={styles.l2} type={_.select('plain', 'title')} size={11}>
          同步率 {isNaN(percent) ? '-' : percent}%
        </Text>
        <View style={styles.l3}>
          <Touchable
            onPress={() => {
              t('空间.历史', {
                userId: $.userId
              })

              $.openUsedModal()
            }}
          >
            <Text type={_.select('plain', 'title')} size={11}>
              历史
            </Text>
          </Touchable>
          <Heatmap id='空间.历史' />
        </View>
        <View style={styles.r1}>
          <Touchable
            onPress={() => {
              t('空间.跳转', {
                userId: $.userId,
                to: 'Character'
              })

              navigation.push('Character', {
                userName: $.userId
              })
            }}
          >
            <Text type={_.select('plain', 'title')} size={11}>
              人物
            </Text>
          </Touchable>
          <Heatmap
            right={-84}
            bottom={-8}
            id='空间.跳转'
            data={{
              to: 'Character',
              alias: '人物'
            }}
          />
        </View>
        <View style={styles.r2}>
          <Touchable
            onPress={() => {
              t('空间.跳转', {
                userId: $.userId,
                to: 'Blogs'
              })

              navigation.push('Blogs', {
                userId: $.userId
              })
            }}
          >
            <Text type={_.select('plain', 'title')} size={11}>
              日志
            </Text>
          </Touchable>
          <Heatmap
            right={-74}
            bottom={-8}
            id='空间.跳转'
            data={{
              to: 'Blogs',
              alias: '日志'
            }}
          />
        </View>
        <View style={styles.r3}>
          <Touchable
            onPress={() => {
              t('空间.跳转', {
                userId: $.userId,
                to: 'Catalogs'
              })

              navigation.push('Catalogs', {
                userId: $.userId
              })
            }}
          >
            <Text type={_.select('plain', 'title')} size={11}>
              目录
            </Text>
          </Touchable>
          <Heatmap
            right={-76}
            bottom={-8}
            id='空间.跳转'
            data={{
              to: 'Catalogs',
              alias: '目录'
            }}
          />
        </View>
      </View>
      <View style={_.mt.md}>
        <Flex>
          <Text type={_.select('plain', 'title')} bold>
            {userName}
          </Text>
          {!!(username || userId) && (
            <Text style={_.ml.xs} type={_.select('plain', 'title')} bold>
              @{originUid ? userId : username || userId}
            </Text>
          )}
        </Flex>
        <Flex style={styles.icons}>
          {isRename && (
            <Touchable style={styles.icon}>
              <Iconfont
                name='md-compare-arrows'
                size={17}
                color={_.__colorPlain__}
                onPress={$.toggleOriginUid}
              />
            </Touchable>
          )}
          {isFriend && (
            <Touchable style={styles.icon} onPress={$.logFriendStatus}>
              <Iconfont name='md-face' size={14} color={_.__colorPlain__} />
            </Touchable>
          )}
        </Flex>
      </View>
      {/* <User style={styles.r0} /> */}
    </Flex>
  )
}

export default obc(Head)

const lStyle = (top, right) => ({
  position: 'absolute',
  zIndex: 1,
  top: (top - _.xs) * _.ratio,
  right: (right - _.sm) * _.ratio,
  paddingVertical: _.xs,
  paddingHorizontal: _.sm,
  borderRadius: _.radiusSm,
  overflow: 'hidden',
  opacity: 0.8
})

const rStyle = (top, left) => ({
  position: 'absolute',
  zIndex: 1,
  top: (top - _.xs) * _.ratio,
  left: (left - _.sm) * _.ratio,
  paddingVertical: _.xs,
  paddingHorizontal: _.sm,
  borderRadius: _.radiusSm,
  overflow: 'hidden',
  opacity: 0.8
})

const memoStyles = _.memoStyles(() => ({
  avatar: {
    marginTop: 14,
    backgroundColor: _.__colorPlain__,
    overflow: 'hidden'
  },
  icons: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -52,
    width: 48,
    height: 18
  },
  icon: {
    paddingHorizontal: _.xs,
    opacity: 0.64
  },
  l1: lStyle(16, 100),
  l2: lStyle(52, 116),
  l3: lStyle(88, 100),
  r0: {
    position: 'absolute',
    zIndex: 1,
    top: 140,
    right: _.wind,
    opacity: 0.88
  },
  r1: rStyle(16, 100),
  r2: rStyle(52, 116),
  r3: rStyle(88, 100),
  friend: {
    opacity: 0.88
  }
}))
