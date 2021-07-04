/*
 * @Author: czy0729
 * @Date: 2021-04-15 19:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 08:09:41
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import List from './list'
import Store from './store'

const title = '新番'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['user/lilyurey/index', 'Staff']
})
@obc
class Staff extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>
        {!!_loaded && <List />}
        <Heatmap bottom={_.bottom} id={title} screen='Staff' />
      </View>
    )
  }
}
