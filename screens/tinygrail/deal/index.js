/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-10 20:57:04
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { StatusBarEvents } from '@components'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import Store from './store'

const backgroundColor = 'rgb(19, 30, 47)'

export default
@inject(Store)
@observer
class Deal extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $ } = this.context
    await $.init()

    hm(`tinygrail/deal?id=${$.monoId}`)
  }

  render() {
    return (
      <View style={[_.container.flex, styles.dark]}>
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor={backgroundColor}
        />
        <ScrollView
          style={_.container.screen}
          contentContainerStyle={_.container.bottom}
        >
          {/* */}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor
  }
})
