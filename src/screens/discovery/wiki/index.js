/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-06 07:36:46
 */
import React from 'react'
import { View } from 'react-native'
import { Loading } from '@components'
import { _ } from '@stores'
import { inject, obc, withHeader } from '@utils/decorators'
import Counts from './counts'
import Cate from './cate'
import List from './list'
import Store from './store'

const title = '维基人'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['wiki', 'Wiki']
})
@obc
class Wiki extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return <Loading style={_.container.plain} />
    }

    return (
      <View style={_.container.plain}>
        <Counts />
        <View style={styles.list}>
          <Cate />
          <List />
        </View>
      </View>
    )
  }
}

const styles = _.create({
  list: {
    flex: 1,
    paddingTop: _.sm
  }
})
