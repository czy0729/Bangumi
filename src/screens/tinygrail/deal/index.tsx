/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:19:30
 */
import React from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { Flex, Page } from '@components'
import { StatusBarPlaceholder } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { refreshControlProps } from '@tinygrail/styles'
import Depth from './depth'
import Form from './form'
import Header from './header'
import Logs from './logs'
import Records from './records'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

class TinygrailDeal extends React.Component {
  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()

    hm(`tinygrail/deal/${$.monoId}`, 'TinygrailDeal')
  }

  onRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      async () => {
        const { $ } = this.context as Ctx
        await $.refresh()

        setTimeout(() => {
          this.setState({
            refreshing: false
          })
        }, 1200)
      }
    )
  }

  render() {
    const { refreshing } = this.state
    return (
      <Page style={[_.container.flex, this.styles.dark]}>
        <StatusBarPlaceholder style={this.styles.dark} />
        <Header />
        <ScrollView
          style={[_.container.flex, this.styles.dark]}
          refreshControl={
            <RefreshControl
              {...refreshControlProps}
              progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
              colors={[_.colorMain]}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          {...SCROLL_VIEW_RESET_PROPS}
        >
          <Flex style={this.styles.form} align='start'>
            <Flex.Item>
              <Form />
            </Flex.Item>
            <View style={this.styles.depth}>
              <Depth />
            </View>
          </Flex>
          <Logs />
          <Records />
        </ScrollView>
      </Page>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(TinygrailDeal))
