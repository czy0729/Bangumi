/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:55:10
 */
import React from 'react'
import { Header, Page, Flex } from '@components'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import StatusBarEvents from '../_/status-bar-events'
import SearchBar from './search-bar'
import History from './history'
import Result from './result'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

class TinygrailSearch extends React.Component {
  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()
  }

  render() {
    const { $ }: Ctx = this.context
    const { list } = $.state
    return (
      <>
        <StatusBarEvents />
        <Header
          title='人物直达'
          hm={['tinygrail/search', 'TinygrailSearch']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
        />
        <Page style={_.container.tinygrail}>
          <Flex style={this.styles.searchBar}>
            <SearchBar />
          </Flex>
          {list.length ? <Result style={_.mt.sm} /> : <History style={_.mt.sm} />}
        </Page>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(TinygrailSearch))
