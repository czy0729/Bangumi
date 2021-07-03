/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 05:18:55
 */
import React from 'react'
import { Loading } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import Type from './type'
import IconLayout from './icon-layout'
import List from './list'
import Store from './store'

const title = '每日放送'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['calendar', 'Calendar']
})
@obc
class Calendar extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <>
          <Type $={$} />
          <IconLayout $={$} />
        </>
      )
    })
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.calendar
    if (!_loaded) {
      return <Loading style={_.container.plain} />
    }

    return <List />
  }
}
