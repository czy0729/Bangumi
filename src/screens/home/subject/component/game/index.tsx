/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 15:40:33
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Expand, Flex, Iconfont, Image, Text, Touchable } from '@components'
import { InView, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _, otaStore, systemStore } from '@stores'
import { open, showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { CDN_GAME, SCROLL_VIEW_RESET_PROPS } from '@constants'
import IconHidden from '../../icon/hidden'
import IconPS from '../../icon/ps'
import { TITLE_GAME } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT, THUMB_HEIGHT, THUMB_WIDTH } from './ds'
import { memoStyles } from './styles'

class Game extends React.Component<{
  onBlockRef: any
}> {
  state = {
    scrolled: false
  }

  onScroll = () => {
    const { scrolled } = this.state
    if (!scrolled) {
      this.setState({
        scrolled: true
      })
    }
  }

  get data() {
    const { $ } = this.context as Ctx
    const length = otaStore.game($.subjectId)?.l
    if (typeof length !== 'number' || !length) return []

    return new Array(length).fill('').map((item, index) => CDN_GAME($.subjectId, index))
  }

  get data2() {
    const { $ } = this.context as Ctx
    const length = otaStore.game($.subjectId)?.l
    if (typeof length !== 'number' || !length) return []

    return new Array(length).fill('').map((item, index) => CDN_GAME($.subjectId, index, false))
  }

  get isADV() {
    const { $ } = this.context as Ctx
    const isADV = $.gameInfo?.isADV
    return !!isADV
  }

  renderThumbs() {
    if (!this.data?.length) return null

    const { $ } = this.context as Ctx
    const { scrolled } = this.state
    return (
      <ScrollView
        style={_.mt.md}
        contentContainerStyle={_.container.wind}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
        scrollEventThrottle={8}
        onScroll={scrolled ? undefined : this.onScroll}
      >
        {this.data.map((item, index) => (
          <Image
            style={index ? this.styles.image : this.styles.imageSide}
            key={item}
            src={item}
            size={THUMB_WIDTH}
            height={THUMB_HEIGHT}
            radius
            onPress={() => {
              t('条目.游戏截图', {
                subjectId: $.subjectId
              })

              showImageViewer(
                this.data2.map(item => ({
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
    const {
      t: title,
      ta: tag = [],
      pl: platform = [],
      en: time,
      cn: timeCn,
      d: dev,
      p: publish
    } = otaStore.game($.subjectId)
    const _dev = (typeof dev === 'object' ? dev : [dev])
      .map(item => String(item).trim())
      .filter(item => !!item)
    const _pub = (typeof publish === 'object' ? publish : [publish])
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
        {!!_dev.length && (
          <Text lineHeight={22} selectable>
            开发商∶{_dev.join('、')}
          </Text>
        )}
        {!!_pub.length && !this.isADV && (
          <Text lineHeight={22} selectable>
            发行商∶{_pub.join('、')}
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
        <View ref={ref => onBlockRef(ref, TITLE_GAME)} />
        <InView style={this.styles.container}>
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
