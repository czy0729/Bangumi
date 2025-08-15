/*
 * @Author: czy0729
 * @Date: 2024-09-27 19:27:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:19:35
 */
import React from 'react'
import { View } from 'react-native'
import { BLURVIEW_TINT_DARK, Cover, Flex, Text } from '@components'
import { BlurView } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Topic() {
  const { $ } = useStore<Ctx>()
  if (!$.topic?.title) return null

  const styles = memoStyles()
  const top = $.topic.title
  const bottom = [$.topic.time || $.topic.group, `${$.total} 回复`]
    .filter(item => !!item)
    .join(' · ')

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
        <Cover
          src={$.topic.avatar || $.topic.groupThumb}
          size={styles.body.height}
          radius={_.radiusMd - 2}
        />
        <Flex.Item>
          <Flex style={styles.body} direction='column' justify='between' align='start'>
            <Text type='__plain__' bold numberOfLines={2}>
              {top}
              {'  '}
              {!!$.topic.time && (
                <Text
                  style={styles.opacity}
                  type='__plain__'
                  size={12}
                  lineHeight={14}
                  bold
                  numberOfLines={2}
                >
                  {$.topic.group}
                </Text>
              )}
            </Text>
            <Text
              style={[_.mt.xs, styles.opacity]}
              type='__plain__'
              size={12}
              bold
              numberOfLines={2}
            >
              {bottom.replace(/ {2,}/g, ' ')}
            </Text>
          </Flex>
        </Flex.Item>
      </Flex>
    </Component>
  )
}

export default ob(Topic, COMPONENT)
