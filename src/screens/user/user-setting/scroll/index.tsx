/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-22 14:38:01
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { fixedRemote } from '@utils/user-setting'
import { IOS } from '@constants'
import Avatars from '../component/avatars'
import Bgs from '../component/bgs'
import Form from '../component/form'
import Preview from '../component/preview'
import Refresh from '../component/refresh'
import Segmented from '../component/segmented'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

class Scroll extends React.Component {
  state = {
    expand: false,
    more: false
  }

  scrollTo: any = () => {}

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

    const { $ } = this.context as Ctx
    $.onRefresh()
  }

  get avatar() {
    const { $ } = this.context as Ctx
    return $.usersInfo.avatar?.large
  }

  get previewAvatarSrc() {
    const { $ } = this.context as Ctx
    if (!$.state.avatar) return $.usersInfo.avatar?.large

    return fixedRemote($.state.avatar, true) || $.usersInfo.avatar?.large
  }

  get previewBgSrc() {
    const { $ } = this.context as Ctx
    if (!$.state.bg) return this.previewAvatarSrc

    return fixedRemote($.state.bg) || fixedRemote($.state.avatar, true) || $.usersInfo.avatar?.large
  }

  get blurRadius() {
    const { $ } = this.context as Ctx
    if ($.state.bg) return 0

    return IOS ? ($.state.bg === '' && $.state.avatar ? 48 : 10) : 8
  }

  render() {
    r(COMPONENT)

    const { $ } = this.context as Ctx
    const { selectedIndex } = $.state
    const { expand } = this.state
    const elPreview = (
      <Preview bg={this.previewBgSrc} avatar={this.previewAvatarSrc} blurRadius={this.blurRadius} />
    )

    return (
      <View style={_.container.plain}>
        <View style={this.styles.preview}>{!expand && elPreview}</View>
        <ScrollView
          connectRef={scrollTo => (this.scrollTo = scrollTo)}
          contentContainerStyle={this.styles.contentContainerStyle}
          keyboardDismissMode='on-drag'
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

export default obc(Scroll)
