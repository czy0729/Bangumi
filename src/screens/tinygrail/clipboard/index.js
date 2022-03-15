/*
 * @Author: czy0729
 * @Date: 2020-11-30 15:39:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 06:03:22
 */
import React from 'react'
import { Header, Page, Flex } from '@components'
import { IconHeader } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import StatusBarEvents from '../_/status-bar-events'
import List from './list'
import Btn from './btn'
import Store from './store'

export default
@inject(Store)
@obc
class TinygrailClipboard extends React.Component {
  async componentDidMount() {
    const { $, navigation } = this.context
    $.init(navigation)
  }

  render() {
    const { $ } = this.context
    return (
      <>
        <StatusBarEvents />
        <Header
          title='粘贴板'
          hm={['tinygrail/clipboard', 'TinygrailClipboard']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
          headerRight={() => (
            <Flex>
              <IconHeader
                style={_.mr.xs}
                name='md-refresh'
                color={_.colorTinygrailPlain}
                size={22}
                onPress={() => {
                  t('粘贴板.刷新')
                  $.init()
                }}
              />
              <IconHeader
                name='md-ios-share'
                color={_.colorTinygrailPlain}
                onPress={() => {
                  t('粘贴板.分享')
                  $.onShare()
                }}
              />
            </Flex>
          )}
        />
        <Page style={this.styles.container}>
          <List />
          <Btn />
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
  }
}))
