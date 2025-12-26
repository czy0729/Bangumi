/*
 * @Author: czy0729
 * @Date: 2024-09-28 16:51:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:57:52
 */
import React from 'react'
import { View } from 'react-native'
import { BLURVIEW_TINT_DARK, Cover, Flex, Text } from '@components'
import { BlurView } from '@_'
import { _, useStore } from '@stores'
import { getMonoCoverSmall } from '@utils'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'

function Mono() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.mono?.name) return null

    const styles = memoStyles()
    const top = $.mono.nameCn || $.mono.name

    const bottom: string[] = []
    if ($.mono?.jobs?.length) {
      const item = $.mono.jobs?.[0]
      bottom.push(item?.nameCn || item?.name || '', item.staff || '')
    } else if ($.mono.detail) {
      bottom.push($.mono.detail.split('\n')?.[0])
    }
    const bottomText = bottom.filter(item => !!item).join(' · ')

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
              {!!bottomText && bottomText !== top && (
                <Text
                  style={[_.mt.xs, styles.opacity]}
                  type='__plain__'
                  size={12}
                  bold
                  numberOfLines={2}
                >
                  {bottomText.replace(/ {2,}/g, ' ')}
                </Text>
              )}
            </Flex>
          </Flex.Item>
        </Flex>
      </Component>
    )
  })
}

export default Mono
