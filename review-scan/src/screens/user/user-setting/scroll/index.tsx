/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 05:29:51
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { fixedRemote } from '@utils/user-setting'
import { FROZEN_FN, IOS } from '@constants'
import Avatars from '../component/avatars'
import Bgs from '../component/bgs'
import Form from '../component/form'
import Preview from '../component/preview'
import Refresh from '../component/refresh'
import Segmented from '../component/segmented'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

class Scroll extends React.Component<Ctx> {
  state = {
    expand: false,
    more: false
  }

  scrollTo: any = FROZEN_FN

  onViewOrigin = (item: string, index: number) => {
    t('个人设置.查看原图', {
      index
    })
    open(item.replace('small', 'origin'))
  }

  onExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  onMore = () => {
    this.setState({
      more: true
    })
  }

  onRefresh = async () => {
    if (IOS) {
      this.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    }

    const { $ } = this.props
    $.onRefresh()
  }

  onForwardRef = scrollTo => {
    this.scrollTo = scrollTo
  }

  get avatar() {
    const { $ } = this.props
    return $.usersInfo.avatar?.large
  }

  get previewAvatarSrc() {
    const { $ } = this.props
    if (!$.state.avatar) return $.usersInfo.avatar?.large

    return fixedRemote($.state.avatar, true) || $.usersInfo.avatar?.large
  }

  get previewBgSrc() {
    const { $ } = this.props
    if (!$.state.bg) return this.previewAvatarSrc

    return fixedRemote($.state.bg) || fixedRemote($.state.avatar, true) || $.usersInfo.avatar?.large
  }

  get blurRadius() {
    const { $ } = this.props
    if ($.state.bg) return 0

    return IOS ? ($.state.bg === '' && $.state.avatar ? 48 : 10) : 8
  }

  render() {
    r(COMPONENT)

    const { $ } = this.props
    const { selectedIndex } = $.state
    const { expand } = this.state
    const elPreview = (
      <Preview bg={this.previewBgSrc} avatar={this.previewAvatarSrc} blurRadius={this.blurRadius} />
    )

    return (
      <View style={[_.container.header, _.container.plain]}>
        <View style={this.styles.preview}>{!expand && elPreview}</View>
        <ScrollView
          forwardRef={this.onForwardRef}
          contentContainerStyle={this.styles.contentContainerStyle}
          keyboardDismissMode='on-drag'
          onScroll={$.onScroll}
        >
          {expand && elPreview}
          <Form expand={this.state.expand} onExpand={this.onExpand} />
          <Segmented />
          {selectedIndex === 0 && (
            <Bgs
              avatar={this.previewAvatarSrc}
              more={this.state.more}
              onViewOrigin={this.onViewOrigin}
              onMore={this.onMore}
            />
          )}
          {selectedIndex === 1 && <Avatars avatar={this.avatar} />}
        </ScrollView>
        <Refresh onRefresh={this.onRefresh} />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default ob(Scroll)
