/*
 * @Author: czy0729
 * @Date: 2019-09-01 00:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-04 21:52:05
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from '@components'
import { StatusBarPlaceholder, StatusBarEvents } from '@screens/_'
import { open } from '@utils'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import Store from './store'
import Header from './header'
import KLine from './k-line'
import DepthMap from './depth-map'
import DepthList from './depth-list'

// const title = '小圣杯交易'

export default
@inject(Store)
@observer
class TinygrailTrade extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`tinygrail/trade?id=${$.monoId}`)
  }

  jump = () => {
    const { $ } = this.context
    open(`https://bgm.tv/character/${$.monoId}`)
  }

  render() {
    return (
      <View style={[_.container.flex, styles.dark]}>
        <ScrollView
          style={[
            _.container.flex,
            styles.dark,
            {
              marginBottom: 56
            }
          ]}
        >
          <StatusBarEvents barStyle='light-content' />
          <StatusBarPlaceholder style={styles.dark} />
          <Header />
          <View style={styles.kline}>
            <KLine />
          </View>
          <DepthMap />
          <DepthList style={_.mt.md} />
        </ScrollView>
        <View style={styles.fixed}>
          <Button style={styles.btn} type='main' onPress={this.jump}>
            交易
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dark: {
    backgroundColor: 'rgb(19, 30, 47)'
  },
  kline: {
    backgroundColor: '#0F1923'
  },
  fixed: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: _.sm,
    backgroundColor: 'rgb(19, 30, 46)'
  },
  btn: {
    backgroundColor: 'rgb(0, 173, 146)',
    borderWidth: 0,
    borderRadius: 0
  }
})
