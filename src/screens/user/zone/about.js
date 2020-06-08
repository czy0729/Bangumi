/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 20:14:09
 */
import React from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import { height } from './store'

function About(props, { $, navigation }) {
  return (
    <Animated.ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      {...props}
    >
      <View style={styles.page}>
        <RenderHtml
          style={_.mt.lg}
          html={$.users.sign || '(什么都没有)'}
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
    paddingTop: height + _.space * 2,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + height - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - height
  }
})
