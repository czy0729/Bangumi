/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 05:37:42
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

export default
@inject(Store)
@obc
class TinygrailSearch extends React.Component {
  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
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
        <Page style={this.styles.container}>
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

const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  searchBar: {
    paddingTop: _.xs,
    paddingBottom: _.sm,
    paddingHorizontal: _.wind
  }
}))
