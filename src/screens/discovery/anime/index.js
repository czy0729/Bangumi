/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-15 20:53:18
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import List from './list'
import Store from './store'

const title = '找番剧'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['anime', 'Anime']
})
@observer
class Anime extends React.Component {
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
        </View>
      )
    })

    hm('discovery/anime', 'Anime')
  }

  componentWillUnmount() {
    const { $ } = this.context
    $.scrollToOffset = null
  }

  render() {
    return (
      <View style={_.container.plain}>
        <List />
      </View>
    )
  }
}
