/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-12 12:14:59
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { StatusBarEvents, Flex } from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import Header from './header'
import Form from './form'
import Depth from './depth'
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
          style={[
            _.container.flex,
            styles.dark,
            {
              marginBottom: 56
            }
          ]}
        >
          <StatusBarPlaceholder style={styles.dark} />
          <Header />
          <Flex align='start'>
            <Flex.Item flex={3}>
              <Form />
            </Flex.Item>
            <Flex.Item style={_.ml.wind} flex={2}>
              <Depth />
            </Flex.Item>
          </Flex>
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
