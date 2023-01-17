/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-17 06:47:57
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Touchable, Flex, Expand, Image, Text, Iconfont } from '@components'
import { SectionTitle, PreventTouchPlaceholder } from '@_'
import { _, systemStore, otaStore } from '@stores'
import { open, showImageViewer } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { SCROLL_VIEW_RESET_PROPS, CDN_GAME } from '@constants'
import IconPS from '../icon/ps'
import IconHidden from '../icon/hidden'
import { Ctx } from '../types'
import { THUMB_WIDTH, THUMB_HEIGHT } from './ds'
import { memoStyles } from './styles'

class Game extends React.Component {
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
    const { $ }: Ctx = this.context
    const length = otaStore.game($.subjectId)?.l
    if (typeof length !== 'number' || !length) return []

    return new Array(length).fill('').map((item, index) => CDN_GAME($.subjectId, index))
  }

  get data2() {
    const { $ }: Ctx = this.context
    const length = otaStore.game($.subjectId)?.l
    if (typeof length !== 'number' || !length) return []

    return new Array(length)
      .fill('')
      .map((item, index) => CDN_GAME($.subjectId, index, false))
  }

  get isADV() {
    const { $ }: Ctx = this.context
    const isADV = $.gameInfo?.isADV
    return !!isADV
  }

  renderThumbs() {
    if (!this.data?.length) return null

    const { $ }: Ctx = this.context
    const { scrolled } = this.state
    return (
      <ScrollView
        style={_.mt.md}
        contentContainerStyle={_.container.wind}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
        scrollEventThrottle={80}
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
    const { $ }: Ctx = this.context
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
              `https://search.bilibili.com/all?keyword=${encodeURIComponent(
                $.jp || $.cn
              )}%20${this.isADV ? 'OP' : 'PV'}&order=totalrank&duration=1&tids_1=4`
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
    global.rerender('Subject.Game')

    const { showGameInfo } = systemStore.setting
    const { $ }: Ctx = this.context
    if (showGameInfo === -1 || !$.gameInfo || !$.gameInfo.i) return null

    return (
      <Expand style={_.mt.lg} ratio={1.2}>
        <SectionTitle
          style={_.container.wind}
          right={
            !showGameInfo ? (
              <IconHidden name='游戏' value='showGameInfo' />
            ) : (
              !this.isADV && <IconPS />
            )
          }
          icon={!showGameInfo && 'md-navigate-next'}
          onPress={() => $.onSwitchBlock('showGameInfo')}
        >
          游戏
        </SectionTitle>
        {showGameInfo && (
          <>
            {this.renderThumbs()}
            {this.renderDetails()}
          </>
        )}
        <PreventTouchPlaceholder />
      </Expand>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Game)
