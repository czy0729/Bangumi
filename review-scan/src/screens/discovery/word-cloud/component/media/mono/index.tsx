/*
 * @Author: czy0729
 * @Date: 2024-09-28 16:51:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:19:22
 */
import React from 'react'
import { View } from 'react-native'
import { BLURVIEW_TINT_DARK, Cover, Flex, Text } from '@components'
import { BlurView } from '@_'
import { _, useStore } from '@stores'
import { getMonoCoverSmall } from '@utils'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Mono() {
  const { $ } = useStore<Ctx>()
  if (!$.mono?.name) return null

  const styles = memoStyles()
  const top = $.mono.nameCn || $.mono.name

  let bottom: any = []
  if ($.mono?.jobs?.length) {
    const item = $.mono.jobs?.[0] || {}
    bottom.push(item.nameCn || item.name, item.staff)
  } else if ($.mono.detail) {
    bottom.push($.mono.detail.split('\n')?.[0])
  }
  bottom = bottom.filter((item: any) => !!item).join(' · ')

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
          src={getMonoCoverSmall($.mono.cover)}
          size={styles.body.height}
          radius={_.radiusMd - 2}
        />
        <Flex.Item>
          <Flex style={styles.body} direction='column' justify='between' align='start'>
            <Text type='__plain__' bold numberOfLines={2}>
              {top}{' '}
              <Text style={styles.opacity} type='__plain__' size={12} lineHeight={14} bold>
                +{$.monoComments.list.length}
              </Text>
            </Text>
            {!!bottom && bottom !== top && (
              <Text
                style={[_.mt.xs, styles.opacity]}
                type='__plain__'
                size={12}
                bold
                numberOfLines={2}
              >
                {bottom.replace(/ {2,}/g, ' ')}
              </Text>
            )}
          </Flex>
        </Flex.Item>
      </Flex>
    </Component>
  )
}

export default ob(Mono, COMPONENT)
