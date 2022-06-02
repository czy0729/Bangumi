/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-02 15:20:32
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Image, Flex, Text, Iconfont, Heatmap } from '@components'
import { SectionTitle, PreventTouchPlaceholder } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { showImageViewer } from '@utils/ui'
import { open } from '@utils'
import { t } from '@utils/fetch'
import IconHidden from './icon/hidden'

const thumbWidth = 160 * _.ratio
const thumbHeight = thumbWidth * 0.56

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

    const initialRenderNums = _.isPad
      ? 5
      : Math.floor(_.window.contentWidth / thumbWidth) + 1
    return epsThumbs.filter((item, index) => index < initialRenderNums)
  }

  render() {
    rerender('Subject.Thumbs')

    const { showThumbs } = systemStore.setting
    if (showThumbs === -1) return null

    const { $ } = this.context
    const { epsThumbs, epsThumbsHeader } = $.state
    if (!epsThumbs.length) return null

    const { scrolled } = this.state
    const thumbs = epsThumbs.map(item => ({
      url: item.split('@')[0], // 参数: bilibili为@, youku没有, iqiyi看不懂不作处理
      headers: epsThumbsHeader
    }))
    const title = $.type === '三次元' ? '剧照' : '预览'
    const reference = epsThumbsHeader?.Referer?.includes('movie.douban.com')
      ? 'douban.com'
      : ''
    return (
      <View style={[_.mt.lg, !showThumbs && _.short]}>
        <SectionTitle
          style={_.container.wind}
          right={!showThumbs && <IconHidden name={title} value='showThumbs' />}
          icon={!showThumbs && 'md-navigate-next'}
          onPress={() => $.switchBlock('showThumbs')}
        >
          {title}
        </SectionTitle>
        {showThumbs && (
          <ScrollView
            style={_.mt.md}
            contentContainerStyle={_.container.wind}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
            scrollEventThrottle={80}
            onScroll={scrolled ? undefined : this.onScroll}
          >
            {this.data
              .filter((item, index) => index <= 12)
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
          <Flex style={[_.container.wind, _.mt.md]} justify='end'>
            <Text
              size={10}
              type='icon'
              align='right'
              onPress={() => open(epsThumbsHeader.Referer)}
            >
              图片来源自 {reference}
            </Text>
            <Iconfont
              style={_.ml.xs}
              name='md-open-in-new'
              size={10}
              color={_.colorIcon}
            />
          </Flex>
        )}
        <PreventTouchPlaceholder />
        <Heatmap id='条目.预览' />
      </View>
    )
  }
}

export default obc(Thumbs)

const styles = _.create({
  image: {
    overflow: 'hidden'
  }
})
