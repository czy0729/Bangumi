/*
 * @Author: czy0729
 * @Date: 2024-09-27 19:27:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 22:18:12
 */
import React from 'react'
import { BLURVIEW_TINT_DARK, Cover, Flex, Text } from '@components'
import { BlurView } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { memoStyles } from './styles'

function Topic(_props, { $ }: Ctx) {
  if (!$.topic?.title) return null

  const styles = memoStyles()
  const top = $.topic.title
  const bottom = [$.topic.time || $.topic.group, `${$.total} 回复`]
    .filter(item => !!item)
    .join(' · ')
  return (
    <BlurView
      style={styles.container}
      // @ts-ignore
      tint={BLURVIEW_TINT_DARK}
      intensity={64}
    >
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
              {!!$.topic.time && (
                <Text
                  style={styles.opacity}
                  type='__plain__'
                  size={12}
                  lineHeight={14}
                  bold
                  numberOfLines={2}
                >
                  {'  '}
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
              {bottom}
            </Text>
          </Flex>
        </Flex.Item>
      </Flex>
    </BlurView>
  )
}

export default obc(Topic)
