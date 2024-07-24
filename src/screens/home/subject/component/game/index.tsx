/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 21:04:17
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Expand, Flex, Iconfont, Image, Text, Touchable } from '@components'
import { InView, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _, otaStore, systemStore } from '@stores'
import { formatPlaytime, open, showImageViewer, stl } from '@utils'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { CDN_ADV, CDN_GAME, SCROLL_VIEW_RESET_PROPS } from '@constants'
import { TITLE_GAME } from '../../ds'
import { Ctx } from '../../types'
import IconHidden from '../icon/hidden'
import IconPS from '../icon/ps'
import { COMPONENT, THUMB_HEIGHT, THUMB_WIDTH } from './ds'
import { memoStyles } from './styles'

class Game extends React.Component<{
  onBlockRef: any
}> {
  state = {
    scrolled: false
  }

  onScroll = () => {
    if (!this.state.scrolled) {
      this.setState({
        scrolled: true
      })
    }
  }

  get isADV() {
    const { $ } = this.context as Ctx
    return !!$.gameInfo?.isADV
  }

  get thumbs() {
    const { $ } = this.context as Ctx
    if (this.isADV) {
      const length = otaStore.adv($.subjectId)?.length
      if (typeof length !== 'number' || length <= 0) return []
      return new Array(length).fill('').map((item, index) => CDN_ADV($.subjectId, index))
    }

    const length = otaStore.game($.subjectId)?.l
    if (typeof length !== 'number' || length <= 0) return []
    return new Array(length).fill('').map((item, index) => CDN_GAME($.subjectId, index))
  }

  get previews() {
    const { $ } = this.context as Ctx
    if (this.isADV) {
      const length = otaStore.adv($.subjectId)?.length
      if (typeof length !== 'number' || length <= 0) return []
      return new Array(length).fill('').map((item, index) => CDN_ADV($.subjectId, index, false))
    }

    const length = otaStore.game($.subjectId)?.l
    if (typeof length !== 'number' || length <= 0) return []
    return new Array(length).fill('').map((item, index) => CDN_GAME($.subjectId, index, false))
  }

  renderThumbs() {
    if (!this.thumbs?.length) return null

    const { $ } = this.context as Ctx
    return (
      <ScrollView
        style={_.mt.md}
        contentContainerStyle={_.container.wind}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
        scrollEventThrottle={16}
        onScroll={this.state.scrolled ? undefined : this.onScroll}
      >
        {this.thumbs.map((item, index) => (
          <Image
            style={index ? this.styles.image : this.styles.imageSide}
            key={item}
            src={item}
            size={THUMB_WIDTH}
            height={THUMB_HEIGHT}
            radius={_.radiusSm}
            errorToHide
            onPress={() => {
              t('条目.游戏截图', {
                subjectId: $.subjectId
              })

              showImageViewer(
                this.previews.map(item => ({
                  url: item
                })),
                index
              )
            }}
          />
        ))}
      </ScrollView>
    )
  }

  renderDetails() {
    const { $ } = this.context as Ctx
    let title = ''
    let tag = []
    let platform = []
    let time = ''
    let timeCn = ''
    let dev: string | string[] = ''
    let publish: string | string[] = ''
    let playtime = ''
    let cn = false

    if (this.isADV) {
      const adv = otaStore.adv($.subjectId)
      if (adv.title) title = adv.title
      if (adv.date) time = adv.date
      if (adv.dev) dev = adv.dev
      if (adv.time) playtime = formatPlaytime(adv.time)
      if (adv.cn) cn = true
    } else {
      const game = otaStore.game($.subjectId)
      title = game.t
      tag = game.ta || []
      platform = game.pl || []
      time = game.en
      timeCn = game.cn
      dev = game.d
      publish = game.p
    }

    const developer = (typeof dev === 'object' ? dev : [dev])
      .map(item => String(item).trim())
      .filter(item => !!item)
    const publisher = (typeof publish === 'object' ? publish : [publish])
      .map(item => String(item).trim())
      .filter(item => !!item)

    return (
      <View style={this.styles.details}>
        {!!title && (
          <Text lineHeight={22} selectable>
            名称∶{title}
          </Text>
        )}
        {!!tag?.length && (
          <Text lineHeight={22} selectable>
            类型∶{tag.join('、')}
          </Text>
        )}
        {!!platform?.length && (
          <Text lineHeight={22} selectable>
            平台∶{platform.join('、')}
          </Text>
        )}
        {!!developer.length && (
          <Text lineHeight={22} selectable>
            开发商∶{developer.join('、')}
          </Text>
        )}
        {!!publisher.length && !this.isADV && (
          <Text lineHeight={22} selectable>
            发行商∶{publisher.join('、')}
          </Text>
        )}
        {!!time && timeCn !== time && (
          <Text lineHeight={22} selectable>
            最早发售∶{time}
          </Text>
        )}
        {!!timeCn && (
          <Text lineHeight={22} selectable>
            中文发售∶{timeCn}
          </Text>
        )}
        {!!playtime && (
          <Text lineHeight={22} selectable>
            游玩时间∶{playtime}
          </Text>
        )}
        {!!cn && (
          <Text lineHeight={22} selectable>
            汉化∶有
          </Text>
        )}
        <Touchable
          onPress={() =>
            open(
              `https://search.bilibili.com/all?keyword=${encodeURIComponent($.jp || $.cn)}%20${
                this.isADV ? 'OP' : 'PV'
              }&order=totalrank&duration=1&tids_1=4`
            )
          }
        >
          <Flex>
            <Text type='sub' lineHeight={22}>
              点击查找 {this.isADV ? 'OP' : 'PV'}
            </Text>
            <Iconfont style={_.ml.xs} name='md-open-in-new' size={16} />
          </Flex>
        </Touchable>
      </View>
    )
  }

  render() {
    r(COMPONENT)

    const { $ } = this.context as Ctx
    if (!$.showGame[1]) return null

    const { showGameInfo } = systemStore.setting
    const { onBlockRef } = this.props
    return (
      <>
        <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_GAME)} />
        <InView style={stl(this.styles.container, !showGameInfo && _.short)}>
          <Expand>
            <SectionTitle
              style={_.container.wind}
              right={
                !showGameInfo ? (
                  <IconHidden name={TITLE_GAME} value='showGameInfo' />
                ) : (
                  !this.isADV && <IconPS />
                )
              }
              icon={!showGameInfo && 'md-navigate-next'}
              onPress={() => $.onSwitchBlock('showGameInfo')}
            >
              {TITLE_GAME}
            </SectionTitle>
            {showGameInfo && (
              <>
                {this.renderThumbs()}
                {this.renderDetails()}
              </>
            )}
            <PreventTouchPlaceholder />
          </Expand>
        </InView>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Game)
