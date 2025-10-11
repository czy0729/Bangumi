/*
 * @Author: czy0729
 * @Date: 2024-11-01 23:25:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:19:42
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, BLURVIEW_TINT_DARK, Flex, Text } from '@components'
import { BlurView } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function User() {
  const { $ } = useStore<Ctx>()
  if (!$.users?.userId) return null

  const styles = memoStyles()
  const { userName, join, avatar, userStats } = $.users
  const top = userName

  let bottom: any = []
  if (userStats?.total) bottom.push(`${userStats.total} 收藏`)
  if (userStats?.collect) bottom.push(`${userStats.collect} 完成`)
  if (userStats?.percent) bottom.push(`完成率 ${userStats.percent}`)
  bottom = bottom.join(' · ')

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
            {!!bottom && bottom !== top && (
              <Text
                style={[_.mt.xs, styles.opacity]}
                type='__plain__'
                size={12}
                bold
                numberOfLines={1}
              >
                {bottom}
              </Text>
            )}
          </Flex>
        </Flex.Item>
      </Flex>
    </Component>
  )
}

export default ob(User, COMPONENT)
