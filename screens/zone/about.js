/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 22:41:52
 */
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { RenderHtml } from '@components'
import { appNavigate } from '@utils/app'
import _ from '@styles'
import { height } from './store'

const About = (props, { $, navigation }) => (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.contentContainerStyle}
    {...props}
  >
    <RenderHtml
      style={_.mt.lg}
      html={$.users}
      onLinkPress={href => appNavigate(href, navigation)}
    />
  </ScrollView>
)

About.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(About)

const styles = StyleSheet.create({
  container: {
    backgroundColor: _.colorPlain
  },
  contentContainerStyle: {
    paddingTop: height + _.wind * 2,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
})
