/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-10 01:09:09
 */
import React from 'react'
import { View, Animated } from 'react-native'
import { RenderHtml } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { tabs, H_BG } from './store'

function About(props, { $, navigation }) {
  // 去除APP内高清头像背景的代码
  const sign =
    String($.users.sign).replace(
      /<span style="font-size:0px; line-height:0px;">(.+?)<\/span>/g,
      ''
    ) || '(什么都没有)'
  return (
    <Animated.ScrollView
      ref={ref => {
        const index = tabs.findIndex(item => item.title === '关于TA')
        return $.connectRef(ref, index)
      }}
      contentContainerStyle={styles.contentContainerStyle}
      {...props}
    >
      <View style={styles.page}>
        <RenderHtml
          style={_.mt.lg}
          html={sign}
          onLinkPress={href =>
            appNavigate(
              href,
              navigation,
              {},
              {
                id: '空间.跳转',
                data: {
                  from: '关于TA',
                  userId: $.userId
                }
              }
            )
          }
        />
      </View>
    </Animated.ScrollView>
  )
}

export default obc(About)

const styles = _.create({
  contentContainerStyle: {
    paddingTop: H_BG + _.space * 2,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + H_BG - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - H_BG
  }
})
