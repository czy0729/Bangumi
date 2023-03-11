/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 15:54:24
 */
import React from 'react'
import { View } from 'react-native'
import {
  Touchable,
  Flex,
  Image,
  Text,
  Iconfont,
  Heatmap,
  getUserStatus
} from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { memoStyles } from './styles'
import { Ctx } from '../types'

const AVATAR_SIZE = _.r(88)

function Head({ style }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { _id, _name } = $.params
  const { originUid } = $.state
  const { avatar, nickname, id, username } = $.usersInfo
  const { join, percent } = $.users
  const userId = id || _id
  const isRename = !!username && !/d+/.test(username) && username != userId
  const userName = HTMLDecode(nickname || _name)
  const textType = _.select('plain', 'title')
  const fallback =
    typeof $.src === 'string' && !$.src.includes('//lain.bgm.tv/pic/user/l/')
  const userStatus = getUserStatus(username)

  let activeText = '历史'
  if ($.usersTimeline.list.length && $.usersTimeline.list?.[0]?.time) {
    activeText = `${$.usersTimeline.list[0]?.time.split(' ·')?.[0]}活跃`
  }
  return (
    <Flex style={style} direction='column'>
      <View>
        <View>
          <Image
            style={styles.avatar}
            src={$.src}
            size={AVATAR_SIZE}
            radius={AVATAR_SIZE / 2}
            border={_.__colorPlain__}
            borderWidth={2}
            shadow
            fallback={fallback}
            fallbackSrc={avatar?.large}
          />
          {!!userStatus && (
            <Flex style={styles.status} justify='center'>
              <View style={[styles.online, styles[`online${userStatus}`]]} />
            </Flex>
          )}
        </View>
        <Text style={styles.l1} type={textType} size={11} bold>
          {join || '- 加入'}
        </Text>
        <Text style={styles.l2} type={textType} size={11} bold>
          同步率 {isNaN(percent) ? '-' : percent}%
        </Text>
        <View style={styles.l3}>
          <Touchable
            animate
            scale={0.9}
            onPress={() => {
              t('空间.历史', {
                userId: $.userId
              })

              $.openUsedModal()
            }}
          >
            <Text type={textType} size={11} bold>
              {activeText}
            </Text>
          </Touchable>
          <Heatmap id='空间.历史' />
        </View>
        <View style={styles.r1}>
          <Touchable
            animate
            scale={0.8}
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
            <Text type={textType} size={11} bold>
              人物
            </Text>
          </Touchable>
          <Heatmap right={-84} bottom={-8} id='空间.跳转' to='Character' alias='人物' />
        </View>
        <View style={styles.r2}>
          <Touchable
            animate
            scale={0.8}
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
            <Text type={textType} size={11} bold>
              日志
            </Text>
          </Touchable>
          <Heatmap right={-74} bottom={-8} id='空间.跳转' to='Blogs' alias='日志' />
        </View>
        <View style={styles.r3}>
          <Touchable
            animate
            scale={0.8}
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
            <Text type={textType} size={11} bold>
              目录
            </Text>
          </Touchable>
          <Heatmap right={-76} bottom={-8} id='空间.跳转' to='Catalogs' alias='目录' />
        </View>
      </View>
      <View style={_.mt.md}>
        <Flex>
          <Text type={textType} bold>
            {userName}
          </Text>
          {!!(username || userId) && (
            <Text style={_.ml.xs} type={textType} bold>
              @{originUid ? userId : username || userId}
            </Text>
          )}
        </Flex>
        <Flex style={styles.icons}>
          {isRename && (
            <Touchable style={styles.icon} onPress={$.toggleOriginUid}>
              <Iconfont name='md-compare-arrows' size={17} color={_.__colorPlain__} />
            </Touchable>
          )}
        </Flex>
      </View>
    </Flex>
  )
}

export default obc(Head)
