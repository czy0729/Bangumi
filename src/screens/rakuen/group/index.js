/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 03:19:50
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Heatmap } from '@components'
import { Pagination, NavigationBarEvents } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withTransitionHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { HOST } from '@constants'
import HeaderTitle from './header-title'
import Info from './info'
import List from './list'
import Store from './store'

const title = '小组'
const heatmaps = {
  prev: '小组.上一页',
  next: '小组.下一页',
  search: '小组.页码跳转'
}

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  barStyle: 'dark-content',
  HeaderTitle
})
@obc
class RakuenGroup extends React.Component {
  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    const { title: _title } = $.groupInfo
    withTransitionHeader.setTitle(navigation, _title)
    this.updatePopover()

    hm(`group/${$.groupId}`, 'Group')
  }

  updatePopover = () => {
    const { $, navigation } = this.context
    const { joinUrl, byeUrl } = $.groupInfo
    const data = ['浏览器查看', '小组成员']
    if (joinUrl) data.push('加入小组')
    if (byeUrl) data.push('退出小组')
    navigation.setParams({
      heatmap: '小组.右上角菜单',
      popover: {
        data,
        onSelect: async key => {
          t('小组.右上角菜单', {
            key,
            groupId: $.groupId
          })

          switch (key) {
            case '浏览器查看':
              open(`${HOST}/group/${$.groupId}`)
              break
            case '小组成员':
              open(`${HOST}/group/${$.groupId}/members`)
              break
            case '加入小组':
              await $.doJoin()
              this.updatePopover()
              break
            case '退出小组':
              await $.doBye()
              this.updatePopover()
              break
            default:
              break
          }
        }
      }
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

  renderPagination() {
    const { $ } = this.context
    const { ipt } = $.state
    return (
      <Pagination
        input={ipt}
        heatmaps={heatmaps}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { show, _loaded } = $.state
    if (!_loaded) {
      return (
        <View style={_.container.content}>
          <NavigationBarEvents />
          <View style={_.container.flex} />
        </View>
      )
    }

    return (
      <View style={_.container.plain}>
        <NavigationBarEvents />
        <ScrollView
          contentContainerStyle={_.container.bottom}
          scrollEventThrottle={16}
          scrollToTop
          onScroll={this.onScroll}
          {...withTransitionHeader.listViewProps}
        >
          <Info />
          {show && (
            <>
              <View
                style={[
                  {
                    minHeight: _.window.height
                  },
                  _.mt.md
                ]}
              >
                <List />
              </View>
              <View style={_.mt.md}>{this.renderPagination()}</View>
            </>
          )}
        </ScrollView>
        <Heatmap id='小组' screen='Group' />
        <Heatmap right={72} bottom={_.bottom} id='小组.加入' />
        <Heatmap right={72} bottom={_.bottom - 34} id='小组.退出' />
      </View>
    )
  }
}
