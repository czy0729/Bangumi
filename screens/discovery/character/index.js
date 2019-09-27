/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-26 16:40:10
 */
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Text } from '@components'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import Store from './store'

export default
@inject(Store)
@withHeader()
@observer
class Character extends React.Component {
  static navigationOptions = {
    title: '角色'
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $ } = this.context
    await $.init()

    hm('character')
  }

  render() {
    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
      >
        <Text>123</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({})
