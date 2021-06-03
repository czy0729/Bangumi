/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-27 10:36:51
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Image, Text } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { showImageViewer } from '@utils/ui'
import { t } from '@utils/fetch'
import { CDN_GAME } from '@constants/cdn'
import IconPS from './icon/ps'

export default
@obc
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
    const { $ } = this.context
    const { length } = $.gameInfo || {}
    if (typeof length !== 'number') {
      return []
    }

    return new Array(length)
      .fill()
      .map((item, index) => CDN_GAME($.subjectId, index))
  }

  get isADV() {
    const { $ } = this.context
    const { tag } = $.gameInfo
    return tag.includes('ADV')
  }

  renderThumbs() {
    const { $ } = this.context
    const { scrolled } = this.state
    return (
      <ScrollView
        style={_.mt.md}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={80}
        onScroll={scrolled ? undefined : this.onScroll}
      >
        {this.data.map((item, index) => (
          <Image
            style={[styles.image, !!index && _.ml.sm]}
            key={item}
            src={item}
            size={160}
            height={100}
            radius
            onPress={() => {
              t('条目.游戏截图', {
                subjectId: $.subjectId
              })

              showImageViewer(
                this.data.map(item => ({
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
    const { $ } = this.context
    const { title, sub, tag, platform, time, timeCn, dev, publish, vid } =
      $.gameInfo
    return (
      <View style={[_.container.wind, _.mt.md]}>
        {this.isADV && title !== sub && (
          <Text lineHeight={22} selectable>
            名称: {title}
          </Text>
        )}
        {!!tag.length && (
          <Text lineHeight={22} selectable>
            类型: {tag.join('、')}
          </Text>
        )}
        {!!platform.length && !this.isADV && (
          <Text lineHeight={22} selectable>
            平台: {platform.join('、')}
          </Text>
        )}
        {!!time && timeCn && timeCn !== time && (
          <Text lineHeight={22} selectable>
            最早发售: {time}
          </Text>
        )}
        {!!timeCn && !this.isADV && (
          <Text lineHeight={22} selectable>
            中文发售: {timeCn}
          </Text>
        )}
        {!!dev.length && (
          <Text lineHeight={22} selectable>
            开发商: {dev.join('、')}
          </Text>
        )}
        {!!publish.length && !this.isADV && (
          <Text lineHeight={22} selectable>
            发行商: {publish.join('、')}
          </Text>
        )}
        {this.data.length > 1 && !!vid && !this.isADV && (
          <Text
            style={_.mt.xs}
            size={10}
            type='icon'
            align='right'
            onPress={() => open(`https://www.vgtime.com/game/${vid}.jhtml`)}
          >
            *信息来源自vgtime.com
          </Text>
        )}
        <Text
          type='main'
          lineHeight={22}
          onPress={() =>
            open(
              `https://search.bilibili.com/all?keyword=${encodeURIComponent(
                $.jp || $.cn
              )}%20${
                this.isADV ? 'OP' : 'PV'
              }&order=totalrank&duration=1&tids_1=4`
            )
          }
        >
          点击查找{this.isADV ? 'OP' : 'PV'}
        </Text>
      </View>
    )
  }

  render() {
    const { $ } = this.context
    if (!$.gameInfo || !$.gameInfo.id) {
      return null
    }

    const { showGameInfo } = systemStore.setting
    const { style } = this.props
    return (
      <View style={style}>
        <SectionTitle
          style={_.container.wind}
          right={!this.isADV && <IconPS />}
          icon={!showGameInfo && 'md-navigate-next'}
          onPress={() => $.switchBlock('showGameInfo')}
        >
          游戏
        </SectionTitle>
        {showGameInfo && (
          <>
            {this.renderThumbs()}
            {this.renderDetails()}
          </>
        )}
      </View>
    )
  }
}

const styles = _.create({
  contentContainerStyle: {
    paddingHorizontal: _.wind
  },
  icon: {
    marginRight: -_.sm
  },
  image: {
    overflow: 'hidden'
  }
})
