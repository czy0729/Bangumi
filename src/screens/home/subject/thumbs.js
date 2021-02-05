/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-05 15:47:24
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Image, Heatmap } from '@components'
import { SectionTitle } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { showImageViewer } from '@utils/ui'
import { t } from '@utils/fetch'

const initialRenderNums = _.isPad
  ? 0
  : Math.floor(_.window.contentWidth / 124) + 1

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
    if (!epsThumbs.length) {
      return null
    }

    const { style } = this.props
    const { scrolled } = this.state
    const { showThumbs } = systemStore.setting
    const thumbs = epsThumbs.map(item => ({
      url: item.split('@')[0], // 参数: bilibili为@, youku没有, iqiyi看不懂不作处理
      headers: epsThumbsHeader
    }))
    return (
      <View style={[styles.container, style, !showThumbs && _.short]}>
        <SectionTitle
          style={_.container.wind}
          icon={!showThumbs && 'right'}
          onPress={() => $.switchBlock('showThumbs')}
        >
          预览
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
                  style={!!index && _.ml.sm}
                  key={item}
                  src={item}
                  size={124}
                  height={78}
                  radius
                  headers={epsThumbsHeader}
                  onPress={() => {
                    t('条目.预览', {
                      subjectId: $.subjectId
                    })
console.log(epsThumbsHeader)
                    showImageViewer(
                      thumbs.filter((item, index) => index < 12),
                      index
                    )
                  }}
                />
              ))}
          </ScrollView>
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
  }
})
