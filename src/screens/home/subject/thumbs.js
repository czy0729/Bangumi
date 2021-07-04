/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-04 13:08:45
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Image, Text, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { showImageViewer } from '@utils/ui'
import { open } from '@utils'
import { t } from '@utils/fetch'

const thumbWidth = 160 * _.ratio
const thumbHeight = thumbWidth * 0.56
const initialRenderNums = _.isPad
  ? 3
  : Math.floor(_.window.contentWidth / thumbWidth) + 1

export default
@obc
class Thumbs extends React.Component {
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
    const { epsThumbs } = $.state
    const { scrolled } = this.state
    if (scrolled) return epsThumbs
    return epsThumbs.filter((item, index) => index < initialRenderNums)
  }

  render() {
    const { $ } = this.context
    const { epsThumbs, epsThumbsHeader } = $.state
    if (!epsThumbs.length) return null

    const { style } = this.props
    const { scrolled } = this.state
    const { showThumbs } = systemStore.setting

    const thumbs = epsThumbs.map(item => ({
      url: item.split('@')[0], // 参数: bilibili为@, youku没有, iqiyi看不懂不作处理
      headers: epsThumbsHeader
    }))
    const title = $.type === '三次元' ? '剧照' : '预览'
    const reference = epsThumbsHeader?.Referer?.includes('movie.douban.com')
      ? 'douban.com'
      : ''
    return (
      <View style={[styles.container, style, !showThumbs && _.short]}>
        <SectionTitle
          style={_.container.wind}
          icon={!showThumbs && 'md-navigate-next'}
          onPress={() => $.switchBlock('showThumbs')}
        >
          {title}
        </SectionTitle>
        {showThumbs && (
          <ScrollView
            style={_.mt.md}
            contentContainerStyle={styles.contentContainerStyle}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={80}
            onScroll={scrolled ? undefined : this.onScroll}
          >
            {this.data
              .filter((item, index) => index < 12)
              .map((item, index) => (
                <Image
                  key={item}
                  style={[styles.image, !!index && _.ml.sm]}
                  src={item}
                  size={thumbWidth}
                  height={thumbHeight}
                  radius
                  headers={epsThumbsHeader}
                  onPress={() => {
                    t('条目.预览', {
                      subjectId: $.subjectId
                    })

                    showImageViewer(
                      thumbs.filter((item, index) => index < 12),
                      index
                    )
                  }}
                />
              ))}
          </ScrollView>
        )}
        {showThumbs && !!reference && (
          <View style={[_.container.wind, _.mt.md]}>
            <Text
              size={10}
              type='icon'
              align='right'
              onPress={() => open(epsThumbsHeader.Referer)}
            >
              *图片来源自{reference}
            </Text>
          </View>
        )}
        <Heatmap id='条目.预览' />
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
