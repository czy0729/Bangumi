/*
 * @Author: czy0729
 * @Date: 2020-10-12 12:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:22:50
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { Flex, Text, Iconfont, Heatmap } from '@components'
import { InView, SectionTitle, PreventTouchPlaceholder } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { open, stl } from '@utils'
import { SCROLL_VIEW_RESET_PROPS, STORYBOOK } from '@constants'
import IconPreview from '../icon/preview'
import IconHidden from '../icon/hidden'
import { Ctx } from '../types'
import Video from './video'
import Preview from './preview'
import { styles } from './styles'

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
    const { $ } = this.context as Ctx
    const { epsThumbs } = $.state
    const { scrolled } = this.state
    if (scrolled) return epsThumbs.slice()

    const initialRenderNums = 5
    return epsThumbs.filter((item, index) => index < initialRenderNums)
  }

  get videos() {
    const { $ } = this.context as Ctx
    const { videos } = $.state
    return videos.slice()
  }

  get title() {
    const { $ } = this.context as Ctx
    if ($.type === '音乐') return 'MV'
    if ($.type === '三次元') return '剧照'
    return '预览'
  }

  get reference() {
    const { $ } = this.context as Ctx
    const { epsThumbsHeader } = $.state
    if (epsThumbsHeader?.Referer?.includes('douban.com')) return 'douban.com'
    if (epsThumbsHeader?.Referer?.includes('bilibili.com')) return 'bilibili.com'
    return ''
  }

  get thumbs() {
    const { $ } = this.context as Ctx
    const { epsThumbs, epsThumbsHeader } = $.state
    return epsThumbs.map(item => ({
      url:
        // 参数: bilibili 为 @, youku 没有, iqiyi 看不懂不作处理
        String(item.split('@')?.[0])
          // 2023/07/14: 测试到 img1 经常失效
          .replace('img1.doubanio.com', 'img2.doubanio.com'),
      headers: {
        ...epsThumbsHeader
      }
    }))
  }

  renderRight() {
    const { showThumbs } = systemStore.setting
    const { $ } = this.context as Ctx
    const { epsThumbsHeader } = $.state
    if (!showThumbs) return <IconHidden name={this.title} value='showThumbs' />

    if ($.isLimit) return null

    return <IconPreview data={$.state.epsThumbs} headers={epsThumbsHeader} />
  }

  render() {
    // global.rerender('Subject.Thumbs')

    if (STORYBOOK) return null

    const { showThumbs } = systemStore.setting
    if (showThumbs === -1) return null

    const { $ } = this.context as Ctx
    const { epsThumbs, epsThumbsHeader, videos } = $.state
    if (!epsThumbs.length && !videos.length) return null

    const { scrolled } = this.state
    return (
      <InView style={stl(styles.container, !showThumbs && _.short)}>
        <SectionTitle
          style={_.container.wind}
          right={this.renderRight()}
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
            scrollEventThrottle={8}
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
                  key={item}
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
      </InView>
    )
  }
}

export default obc(Thumbs)
