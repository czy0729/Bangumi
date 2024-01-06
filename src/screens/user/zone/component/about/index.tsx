/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 20:31:32
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS, STORYBOOK } from '@constants'
import { Fn } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function About(
  props: {
    ListHeaderComponent: any
    scrollEventThrottle: number
    onScroll: Fn
  },
  { $, navigation }: Ctx
) {
  const styles = memoStyles()
  const { onScroll } = props

  // 去除 APP 高清头像背景的代码
  const sign =
    String($.users.sign).replace(
      /<span style="font-size:0px; line-height:0px;">(.+?)<\/span>/g,
      ''
    ) || '(什么都没有)'

  return (
    <Animated.ScrollView
      ref={ref => {
        const index = TABS.findIndex(item => item.title === '关于TA')
        return $.connectRef(ref, index)
      }}
      contentContainerStyle={styles.contentContainerStyle}
      {...props}
      {...SCROLL_VIEW_RESET_PROPS}
      onScroll={
        STORYBOOK
          ? undefined
          : Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: $.scrollY
                    }
                  }
                }
              ],
              {
                useNativeDriver: true,
                listener: onScroll
              }
            )
      }
    >
      <View style={styles.page}>
        <RenderHtml
          style={_.mt.lg}
          html={sign}
          onLinkPress={href => {
            const event = {
              id: '空间.跳转',
              data: {
                from: '关于TA',
                userId: $.userId
              }
            } as const
            appNavigate(href, navigation, {}, event)
          }}
        />
      </View>
    </Animated.ScrollView>
  )
}

export default obc(About, COMPONENT)
