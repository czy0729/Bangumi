/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-24 03:27:22
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { NavigationBarEvents, ItemPost } from '@screens/_'
import { _ } from '@stores'
import { open, copy } from '@utils'
import { cnjp } from '@utils/app'
import { inject, withTransitionHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
import HeaderTitle from './header-title'
import List from './list'
import Extra from './extra'
// import Heatmaps from './heatmaps'
import Store from './store'

const title = '人物'
const event = {
  id: '人物.跳转',
  data: {
    from: '吐槽'
  }
}

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  barStyle: 'dark-content',
  HeaderTitle
})
@obc
class Mono extends React.Component {
  async componentDidMount() {
    const { $ } = this.context
    if ($.mono._loaded && $.chara._loaded) {
      this.updateNavigation()
    }

    await $.init()
    this.updateNavigation()

    hm($.monoId, 'Mono')
  }

  updateNavigation = () => {
    const { $, navigation } = this.context
    const { name } = $.mono
    withTransitionHeader.setTitle(navigation, name)

    navigation.setParams({
      heatmap: '人物.右上角菜单',
      popover: {
        data: ['浏览器查看', '复制链接', '复制分享'],
        onSelect: key => {
          t('人物.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open($.url)
              break

            case '复制链接':
              copy($.url)
              info('已复制链接')
              break

            case '复制分享':
              copy(`【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`)
              info('已复制分享文案')
              break

            default:
              break
          }
        }
      },
      extra: <Extra $={$} navigation={navigation} />
    })
  }

  onScroll = e => {
    const { $ } = this.context
    const { onScroll } = this.props
    onScroll(e)

    const { showHeaderTitle } = $.state
    const { nativeEvent } = e
    const { y } = nativeEvent.contentOffset
    const headerTranstion = 48
    if (!showHeaderTitle && y > headerTranstion) {
      $.updateShowHeaderTitle(true)
      return
    }

    if (showHeaderTitle && y <= headerTranstion) {
      $.updateShowHeaderTitle(false)
    }
  }

  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    // <Heatmaps index={index} />
    return (
      <ItemPost
        navigation={navigation}
        contentStyle={this.styles.contentStyle}
        index={index}
        event={event}
        matchLink={false}
        {...item}
      />
    )
  }

  render() {
    return (
      <Page>
        <NavigationBarEvents />
        <List renderItem={this.renderItem} onScroll={this.onScroll} />
        <Heatmap id='人物' screen='Mono' />
      </Page>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(() => ({
  contentStyle: {
    paddingRight: _.wind - _.sm
  }
}))
