/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-20 16:57:45
 */
import React from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { open, copy, runAfter } from '@utils'
import { inject, withTransitionHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { info, androidKeyboardAdjust } from '@utils/ui'
import { cnjp } from '@utils/app'
import { TITLE } from '@constants'
import HeaderTitle from './header-title'
import Bg from './bg'
import List from './list'
import Modal from './modal'
import IconShare from './icon/share'
import Store from './store'

const title = '条目'
const showBlurViewOffset = 200

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  colorStart: _.colorPlainRaw,
  HeaderTitle,
  defaultExtra: <IconShare />
})
@obc
class Subject extends React.Component {
  state = {
    showBlurView: true
  }

  componentDidMount() {
    runAfter(async () => {
      const { $ } = this.context
      setTimeout(() => {
        $.rendered()
      }, 400)

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
      extra: <IconShare $={$} navigation={navigation} />,
      popover: {
        data: [TITLE, '复制链接', '复制分享', '重置布局'],
        onSelect: key => {
          t('条目.右上角菜单', {
            subjectId: $.subjectId,
            key
          })

          setTimeout(() => {
            switch (key) {
              case '复制链接':
                copy($.url)
                info('已复制链接')
                break

              case '复制分享':
                copy(`【链接】${cnjp($.cn, $.jp)} | Bangumi番组计划\n${$.url}`)
                info('已复制分享文案')
                break

              case '重置布局':
                systemStore.resetSubjectLayout()
                info('已重置')
                break

              default:
                open($.url)
                break
            }
          }, 0)
        }
      }
    })
  }

  onDidFocus = () => {
    androidKeyboardAdjust('setAdjustPan')
  }

  onDidBlur = () => {
    androidKeyboardAdjust('setAdjustResize')
  }

  /**
   * - 滚动判断是否显示头部毛玻璃背景
   * - 滚动过马上设置成能渲染底部块
   */
  onScroll = e => {
    const { $ } = this.context
    const { onScroll } = this.props
    onScroll(e)

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

  render() {
    const { showBlurView } = this.state
    return (
      <View style={_.container.plain}>
        <Bg show={showBlurView} />
        <List onScroll={this.onScroll} />
        <NavigationEvents onDidFocus={this.onDidFocus} onDidBlur={this.onDidBlur} />
        <Modal />
        <Heatmap id={title} screen='Subject' />
      </View>
    )
  }
}
