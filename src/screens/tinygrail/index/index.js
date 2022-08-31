/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 00:52:34
 */
import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'
import { UM } from '@components'
import { StatusBarPlaceholder } from '@_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { refreshControlProps } from '@tinygrail/styles'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import Auth from './auth'
import Menus from './menus'
import Footer from './footer'
import BonusModal from './bonus-modal'
import Store from './store'

const title = '小圣杯'

class Tinygrail extends React.Component {
  state = {
    refreshing: false
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm('tinygrail', 'Tinygrail')
  }

  onRefresh = () =>
    this.setState(
      {
        refreshing: true
      },
      async () => {
        const { $ } = this.context
        await $.refresh()

        setTimeout(() => {
          this.setState({
            refreshing: false
          })
        }, 1200)
      }
    )

  render() {
    const { $ } = this.context
    const { visible } = $.state
    const { refreshing } = this.state
    return (
      <>
        <ScrollView
          style={this.styles.container}
          contentContainerStyle={this.styles.contentContainerStyle}
          refreshControl={
            <RefreshControl
              {...refreshControlProps}
              colors={[_.colorMain]}
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
          {...SCROLL_VIEW_RESET_PROPS}
        >
          <UM screen={title} />
          <StatusBarEvents backgroundColor='transparent' />
          <StatusBarPlaceholder />
          <Auth />
          <Menus />
          <Footer />
        </ScrollView>
        <BonusModal visible={visible} />
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(Tinygrail))

const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingBottom: _.md
  }
}))
