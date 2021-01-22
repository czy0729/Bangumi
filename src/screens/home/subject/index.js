/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-22 11:36:51
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { _ } from '@stores'
import { open, copy, runAfter } from '@utils'
import { inject, withTransitionHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { DEV, TITLE } from '@constants'
import HeaderTitle from './header-title'
import Bg from './bg'
import List from './list'
import Modal from './modal'
import Store from './store'

const title = '条目'
const showBlurViewOffset = 200

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  colorStart: _.colorPlainRaw,
  HeaderTitle
})
@obc
class Subject extends React.Component {
  state = {
    showBlurView: true,
    rendered: DEV
  }

  componentDidMount() {
    runAfter(async () => {
      requestAnimationFrame(() => {
        this.rendered()
      })

      const { $ } = this.context
      const res = $.init()
      this.updateNavigation()
      hm(`subject/${$.params.subjectId}`, 'Subject')

      await res
      t('条目.查看', {
        subjectId: $.subjectId,
        type: $.type
      })
    })
  }

  /**
   * 右上角头部按钮
   */
  updateNavigation = () => {
    const { $, navigation } = this.context
    navigation.setParams({
      headerTitle: <HeaderTitle />,
      routeName: 'Subject',
      heatmap: '条目.右上角菜单',
      popover: {
        data: [TITLE, '复制链接'],
        onSelect: key => {
          t('条目.右上角菜单', {
            subjectId: $.subjectId,
            key
          })
          switch (key) {
            case '复制链接':
              copy($.url)
              info('已复制')
              break
            default:
              open($.url)
              break
          }
        }
      }
    })
  }

  /**
   * - 滚动判断是否显示头部毛玻璃背景
   * - 滚动过马上设置成能渲染底部块
   */
  onScroll = e => {
    const { $ } = this.context
    const { onScroll } = this.props
    onScroll(e)
    this.rendered()

    const { nativeEvent } = e
    const { y } = nativeEvent.contentOffset
    const { showBlurView } = this.state
    if (showBlurView && y > showBlurViewOffset) {
      this.setState({
        showBlurView: false
      })
      $.updateShowHeaderTitle(true)
      return
    }

    if (!showBlurView && y <= showBlurViewOffset) {
      this.setState({
        showBlurView: true
      })
      $.updateShowHeaderTitle(false)
    }
  }

  /**
   * 用于延迟底部块渲染
   * 优化条目页面进入渲染时, 同时渲染过多块导致掉帧的问题
   */
  rendered = () => {
    const { rendered } = this.state
    if (!rendered) {
      this.setState({
        rendered: true
      })
    }
  }

  render() {
    const { showBlurView, rendered = [] } = this.state
    return (
      <View style={_.container.plain}>
        <Bg show={showBlurView} />
        <List rendered={rendered} onScroll={this.onScroll} />
        {rendered && (
          <>
            <Modal />
            <Heatmap id={title} screen='Subject' />
          </>
        )}
      </View>
    )
  }
}
