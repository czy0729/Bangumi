/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 14:06:26
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import Tabs from './tabs'
import Store from './store'

const title = '用户目录'

export default
@inject(Store)
@withHeader({
  screen: title
})
@obc
class Catelogs extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`user/${$.userId}/index`, 'Catelogs')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>
        {!!_loaded && <Tabs />}
        <Heatmap bottom={_.bottom} id='用户目录' screen='Catelogs' />
      </View>
    )
  }
}
