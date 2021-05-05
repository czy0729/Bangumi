/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:28:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-05-05 20:15:55
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
import { HOST_CDN, VERSION_GAME } from '@constants/cdn'
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
      .map(
        (item, index) =>
          `${HOST_CDN}/gh/czy0729/Bangumi-Game@${VERSION_GAME}/preview/${parseInt(
            parseInt($.subjectId) / 100
          )}/${$.subjectId}/${index}.jpg`
      )
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
            size={124}
            height={78}
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
    const { tag, platform, time, timeCn, dev, publish, vid } = $.gameInfo
    return (
      <View style={[_.container.wind, _.mt.md]}>
        {!!tag.length && (
          <Text lineHeight={22} selectable>
            类型：{tag.join('、')}
          </Text>
        )}
        {!!platform.length && (
          <Text lineHeight={22} selectable>
            平台：{platform.join('、')}
          </Text>
        )}
        {!!time && (
          <Text lineHeight={22} selectable>
            最早发售：{time}
          </Text>
        )}
        {!!timeCn && (
          <Text lineHeight={22} selectable>
            中文发售：{timeCn}
          </Text>
        )}
        {!!dev.length && (
          <Text lineHeight={22} selectable>
            开发商：{dev.join('、')}
          </Text>
        )}
        {!!publish.length && (
          <Text lineHeight={22} selectable>
            发行商：{publish.join('、')}
          </Text>
        )}
        {this.data.length > 1 && !!vid && (
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
          right={<IconPS />}
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
