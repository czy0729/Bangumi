/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-06 05:53:53
 */
import React from 'react'
import { InteractionManager, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { open, copy } from '@utils'
import { inject, withTransitionHeader } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST } from '@constants'
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
    InteractionManager.runAfterInteractions(async () => {
      setTimeout(() => {
        this.rendered()
      }, 300)

      const { $, navigation } = this.context
      withTransitionHeader.setTitle(navigation, $.cn)

      // 右上角头部按钮
      const data = await $.init()
      if (data) {
        const url = String(data.url).replace('http://', 'https://')
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
                  copy(`${HOST}/subject/${$.params.subjectId}`)
                  info('已复制')
                  break
                default:
                  open(url)
                  break
              }
            }
          }
        })
      }

      hm(`subject/${$.params.subjectId}`, 'Subject')
    })
  }

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

  rendered = () => {
    const { rendered } = this.state
    if (!rendered) {
      this.setState({
        rendered: true
      })
    }
  }

  render() {
    const { $ } = this.context
    const { images = {} } = $.subject
    const { showBlurView, rendered } = this.state
    return (
      <View style={_.select(_.container.screen, _.container.content)}>
        <Bg show={showBlurView} image={images.common} />
        <List rendered={rendered} onScroll={this.onScroll} />
        <Modal />
      </View>
    )
  }
}
