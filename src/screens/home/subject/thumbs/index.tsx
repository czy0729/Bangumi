/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-21 15:07:29
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Iconfont, Heatmap } from '@components'
import { SectionTitle, PreventTouchPlaceholder } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { open } from '@utils'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import IconPreview from '../icon/preview'
import IconHidden from '../icon/hidden'
import Video from './video'
import Preview from './preview'
import { THUMB_WIDTH } from './ds'
import { Ctx } from '../types'

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
    const { $ }: Ctx = this.context
    const { epsThumbs } = $.state
    const { scrolled } = this.state
    if (scrolled) return epsThumbs

    const initialRenderNums = _.isPad
      ? 5
      : Math.floor(_.window.contentWidth / THUMB_WIDTH) + 1
    return epsThumbs.filter((item, index) => index < initialRenderNums)
  }

  get videos() {
    const { $ }: Ctx = this.context
    const { videos } = $.state
    return videos
  }

  get title() {
    const { $ }: Ctx = this.context
    if ($.type === '音乐') return 'MV'
    if ($.type === '三次元') return '剧照'
    return '预览'
  }

  get reference() {
    const { $ }: Ctx = this.context
    const { epsThumbsHeader } = $.state
    if (epsThumbsHeader?.Referer?.includes('douban.com')) return 'douban.com'
    if (epsThumbsHeader?.Referer?.includes('bilibili.com')) return 'bilibili.com'
    return ''
  }

  get thumbs() {
    const { $ }: Ctx = this.context
    const { epsThumbs, epsThumbsHeader } = $.state
    return epsThumbs.map(item => ({
      url: item.split('@')[0], // 参数: bilibili 为 @, youku 没有, iqiyi 看不懂不作处理
      headers: epsThumbsHeader
    }))
  }

  render() {
    global.rerender('Subject.Thumbs')

    const { showThumbs } = systemStore.setting
    if (showThumbs === -1) return null

    const { $ }: Ctx = this.context
    const { epsThumbs, epsThumbsHeader, videos } = $.state
    if (!epsThumbs.length && !videos.length) return null

    const { scrolled } = this.state
    return (
      <View style={[_.mt.lg, !showThumbs && _.short]}>
        <SectionTitle
          style={_.container.wind}
          right={
            showThumbs ? (
              <IconPreview data={$.state.epsThumbs} headers={epsThumbsHeader} />
            ) : (
              <IconHidden name={this.title} value='showThumbs' />
            )
          }
          icon={!showThumbs && 'md-navigate-next'}
          onPress={() => $.onSwitchBlock('showThumbs')}
        >
          {this.title}
        </SectionTitle>
        {showThumbs && (
          <ScrollView
            style={_.mt.md}
            contentContainerStyle={_.container.wind}
            horizontal
            {...SCROLL_VIEW_RESET_PROPS}
            scrollEventThrottle={80}
            onScroll={scrolled ? undefined : this.onScroll}
          >
            {this.videos.map(item => (
              <Video
                key={item.cover}
                item={item}
                epsThumbsHeader={epsThumbsHeader}
                showTitle={$.type === '音乐'}
              />
            ))}
            {this.data
              .filter((item, index) => index <= 12)
              .map((item, index) => (
                <Preview
                  item={item}
                  index={index}
                  thumbs={this.thumbs}
                  epsThumbsHeader={epsThumbsHeader}
                />
              ))}
          </ScrollView>
        )}
        {showThumbs && !!this.reference && (
          <Flex style={[_.container.wind, _.mt.md]} justify='end'>
            <Text
              size={10}
              type='icon'
              align='right'
              onPress={() => open(epsThumbsHeader.Referer)}
            >
              数据来源自 {this.reference}
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
