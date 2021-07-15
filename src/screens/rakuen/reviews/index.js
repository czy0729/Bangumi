/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-15 18:06:53
 */
import React from 'react'
import { Loading, ScrollView } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import List from './list'
import Store from './store'

const title = '影评'

export default
@inject(Store)
@withHeader({
  title: ({ name } = {}) => (name ? `${name}的${title}` : title),
  screen: title
})
@obc
class Reviews extends React.Component {
  async componentDidMount() {
    const { $ } = this.context
    await $.init()

    hm(`subject/${$.subjectId}/reviews`, 'Reviews')
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.reviews
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
