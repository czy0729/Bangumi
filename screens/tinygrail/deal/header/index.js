/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:58:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-11 10:18:17
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from '@utils/decorators'
import _ from '@styles'

function Header(props, { $, navigation }) {
  return <View style={styles.container}></View>
}

Header.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Header)

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    paddingTop: _.wind,
    paddingHorizontal: _.wind,
    paddingBottom: _.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(25, 36, 53)'
  },
  bar: {
    paddingLeft: 2
  }
})
