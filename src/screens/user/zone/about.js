/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-27 05:16:43
 */
import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import { H_BG } from './store'

function About(props, { $, navigation }) {
  // 去除APP内高清头像背景的代码
  const sign =
    String($.users.sign).replace(
      /<span style="font-size:0px; line-height:0px;">(.+?)<\/span>/g,
      ''
    ) || '(什么都没有)'
  return (
    <Animated.ScrollView
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

About.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(About)

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: H_BG + _.space * 2,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + H_BG - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - H_BG
  }
})
