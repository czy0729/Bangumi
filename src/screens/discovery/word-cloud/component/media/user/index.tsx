/*
 * @Author: czy0729
 * @Date: 2024-11-01 23:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-29 17:53:34
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, BLURVIEW_TINT_DARK, Flex, Text } from '@components'
import { BlurView } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function User() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.users?.userId) return null

    const styles = memoStyles()
    const { userName, join, avatar, userStats } = $.users
    const top = userName

    const bottom: string[] = []
    if (userStats?.total) bottom.push(`${userStats.total} 收藏`)
    if (userStats?.collect) bottom.push(`${userStats.collect} 完成`)
    if (userStats?.percent) bottom.push(`完成率 ${userStats.percent}`)
    const bottomText = bottom.join(' · ')

    const Component = IOS ? BlurView : View
    const passProps: any = {
      style: styles.container
    }
    if (IOS) {
      passProps.tint = BLURVIEW_TINT_DARK
      passProps.intensity = 64
    }

    return (
      <Component {...passProps}>
        <Flex align='start'>
          <Avatar src={avatar} size={styles.body.height} radius={_.radiusMd - 2} />
          <Flex.Item>
            <Flex style={styles.body} direction='column' justify='between' align='start'>
              <Text type='__plain__' bold numberOfLines={2}>
                {top}
                {'  '}
                <Text style={styles.opacity} type='__plain__' size={12} lineHeight={14} bold>
                  {join}
                </Text>
              </Text>
              {!!bottomText && bottomText !== top && (
                <Text
                  style={[_.mt.xs, styles.opacity]}
                  type='__plain__'
                  size={12}
                  bold
                  numberOfLines={1}
                >
                  {bottomText}
                </Text>
              )}
            </Flex>
          </Flex.Item>
        </Flex>
      </Component>
    )
  })
}

export default User
