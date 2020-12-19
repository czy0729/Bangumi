/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-18 11:33:08
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import List from './list'
import Store from './store'

const title = '找文库'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['wenku', 'Wenku']
})
@observer
class Wenku extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <View
          style={{
            marginRight: -8
          }}
        >
          <IconHeader
            style={{
              transform: [
                {
                  rotate: '90deg'
                }
              ]
            }}
            size={22}
            name='arrow-left'
            onPress={$.scrollToTop}
          />
          <Heatmap id='文库.到顶' />
        </View>
      )
    })

    hm('discovery/wenku', 'Wenku')
  }

  componentWillUnmount() {
    const { $ } = this.context
    $.scrollToOffset = null
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>{!_loaded ? <Loading /> : <List />}</View>
    )
  }
}
