/*
 * @Author: czy0729
 * @Date: 2026-05-02 10:06:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 18:34:52
 */
import React, { useCallback, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Avatar, Flex, Popover, Text } from '@components'
import { systemStore, timelineStore } from '@stores'
import { lastDate, stl } from '@utils'
import { useNavigation } from '@utils/hooks'
import { TEXT_MENU_MANAGE_TRACK, withSplit } from '@constants'
import { ClientTrack } from '../../client-track'
import { ANIM_DURATION_PER_AVATAR, AVATAR_SIZE, MOVE_DISTANCE, PAUSE_RATIO } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function TimelineAvatars({ subjectId, index, sort, isSide }: Props) {
  const navigation = useNavigation()

  const styles = memoStyles()

  // 数据源
  const userIds = systemStore.setting.collectionTimelines || []
  const timelines = timelineStore.collectionTimelines(userIds, subjectId)
  const users = useMemo(
    () =>
      (Array.isArray(timelines) ? timelines : []).filter(
        t => t && (t.sort?.eps === sort || t.sort?.eps === index + 1)
      ),
    [timelines, sort, index]
  )

  const count = users.length
  const progress = useSharedValue(0)

  // 动画配置
  useEffect(() => {
    // 重置进度
    progress.value = 0

    if (count <= 1) return

    // 启动循环
    progress.value = withRepeat(
      withTiming(1, {
        duration: count * ANIM_DURATION_PER_AVATAR,
        easing: Easing.linear
      }),
      -1,
      false
    )

    return () => cancelAnimation(progress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, subjectId, sort]) // 注意：progress 不要放进依赖，防止重复触发

  // 阶梯插值样式
  const animatedStyle = useAnimatedStyle(() => {
    if (count <= 1) return { transform: [{ translateX: 0 }] }

    const inputArray = [0]
    const outputArray = [0]

    for (let i = 1; i <= count; i++) {
      const step = i / count
      // 停顿结束点
      const moveStartPoint = step - (1 / count) * (1 - PAUSE_RATIO)

      inputArray.push(moveStartPoint)
      outputArray.push(-(i - 1) * MOVE_DISTANCE)

      // 移动结束点
      inputArray.push(step)
      outputArray.push(-i * MOVE_DISTANCE)
    }

    return {
      flexDirection: 'row',
      transform: [
        {
          translateX: interpolate(progress.value, inputArray, outputArray)
        }
      ]
    }
  })

  const memoData = useMemo(
    () => [
      ...users.map(item => `${item.name}${withSplit(lastDate(item.sort.lasttouch))}`),
      TEXT_MENU_MANAGE_TRACK
    ],
    [users]
  )

  const handleSelect = useCallback(
    (label: string, index: number) => {
      if (!navigation) return

      if (label === TEXT_MENU_MANAGE_TRACK) {
        navigation.push('Setting', {
          open: 'Track'
        })
        return
      }

      const user = users?.[index]
      if (user) {
        navigation.push('Zone', {
          userId: user.userId,
          _name: user.name,
          _image: user.avatar
        })
      }
    },
    [navigation, users]
  )

  if (count === 0) return null

  return (
    <View style={stl(styles.collectionTimelines, isSide && styles.side)}>
      <Popover data={memoData} onSelect={handleSelect}>
        <Flex style={styles.container} wrap='nowrap'>
          <View style={styles.avatarContainer}>
            <Animated.View style={animatedStyle}>
              {users.map(u => (
                <View key={u.userId} style={styles.avatarWrapper}>
                  <Avatar src={u.avatar} size={AVATAR_SIZE} placeholder={false} skeleton={false} />
                  <ClientTrack id='collectionTimelines' userId={u.userId} subjectId={subjectId} />
                </View>
              ))}

              {/* 镜像补位 */}
              <View key='mirror' style={styles.avatarWrapper}>
                <Avatar
                  src={users[0]?.avatar}
                  size={AVATAR_SIZE}
                  placeholder={false}
                  skeleton={false}
                />
              </View>
            </Animated.View>
          </View>

          {count > 1 && (
            <View style={styles.countBadge}>
              <Text type='sub' size={10} bold>
                {count}
              </Text>
            </View>
          )}
        </Flex>
      </Popover>
    </View>
  )
}

export default observer(TimelineAvatars)
