/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-13 22:54:58
 */
import React from 'react'
import { Loading, ScrollView } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import List from './list'
import Store from './store'

const title = '讨论版'

export default
@inject(Store)
@withHeader({
  title: ({ name } = {}) => (name ? `${name}的${title}` : title),
  screen: title
})
@obc
class Board extends React.Component {
  async componentDidMount() {
    const { $ } = this.context
    await $.init()

    hm(`subject/${$.subjectId}/board`, 'Board')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.board
    if (!_loaded) {
      return <Loading style={_.container.plain} />
    }

    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        scrollToTop
      >
        <List />
      </ScrollView>
    )
  }
}
