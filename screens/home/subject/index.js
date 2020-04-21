/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-21 12:09:01
 */
import React from 'react'
import { InteractionManager, View } from 'react-native'
import PropTypes from 'prop-types'
import { _ } from '@stores'
import { open, copy } from '@utils'
import { inject, withTransitionHeader, observer } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
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
  colorStart: _.colorPlainRaw
})
@observer
class Subject extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    showBlurView: true,
    rendered: false
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      setTimeout(() => {
        this.rendered()
      }, 300)

      const { $, navigation } = this.context
      $.init()
      withTransitionHeader.setTitle(navigation, $.cn)
      this.updateNavigation()

      hm(`subject/${$.params.subjectId}`, 'Subject')
    })
  }

  /**
   * 右上角头部按钮
   */
  updateNavigation = () => {
    const { $, navigation } = this.context
    navigation.setParams({
      headerTransitionTitle: $.cn,
      popover: {
        data: ['Bangumi', '复制链接'],
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
      return
    }

    if (!showBlurView && y <= showBlurViewOffset) {
      this.setState({
        showBlurView: true
      })
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
      <View style={_.select(_.container.screen, _.container.content)}>
        <Bg show={showBlurView} />
        <List rendered={rendered} onScroll={this.onScroll} />
        <Modal />
      </View>
    )
  }
}
