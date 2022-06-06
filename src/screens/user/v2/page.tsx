/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:30:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-06 11:24:37
 */
import React from 'react'
import { Animated } from 'react-native'
import { Page } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import { tabs } from './store'

class User extends React.Component {
  state = {
    /** 头部是否置顶 */
    fixed: false
  }

  scrollY = new Animated.Value(0)

  y = 0

  componentDidMount() {
    const { $ } = this.context
    const { subjectType, page } = $.state
    const { _loaded } = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
    )
    if (!_loaded) $.fetchUserCollections(true)
  }

  updatePageOffset = (index = [-1, 1]) => {
    const { $ } = this.context
    const { page } = $.state
    const { fixed } = this.state
    const config = {
      offset: fixed ? $.h_fixed : this.y,
      animated: false
    }

    index.forEach(item => {
      $.scrollToOffset[page + item]?.(config)
    })
  }

  onScroll = e => {
    const { $ } = this.context
    const { fixed } = this.state
    const { y } = e.nativeEvent.contentOffset
    this.y = y

    if (fixed && y < $.h_fixed - 20) {
      this.setState({
        fixed: false
      })
      return
    }

    if (!fixed && y >= $.h_fixed - 20) {
      this.setState({
        fixed: true
      })
    }
  }

  onSelectSubjectType = title => {
    const { $ } = this.context
    $.onSelectSubjectType(title)
  }

  onToggleList = () => {
    setTimeout(() => {
      this.updatePageOffset([0])
    }, 0)
  }

  onSwipeStart = () => {
    this.updatePageOffset()
  }

  onIndexChange = () => {
    setTimeout(() => {
      this.updatePageOffset([0])
    }, 0)
  }

  render() {
    const { $ } = this.context
    const { page, _loaded } = $.state
    const { fixed } = this.state
    return (
      <Page>
        {!!_loaded && (
          <>
            <Tab
              scrollY={this.scrollY}
              scrollEventThrottle={16}
              page={page}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.scrollY
                      }
                    }
                  }
                ],
                {
                  useNativeDriver: true,
                  listener: this.onScroll
                }
              )}
              onSwipeStart={this.onSwipeStart}
              onIndexChange={this.onIndexChange}
              onSelectSubjectType={this.onSelectSubjectType}
              onToggleList={this.onToggleList}
            />
            <ParallaxImage scrollY={this.scrollY} fixed={fixed} />
          </>
        )}
      </Page>
    )
  }
}

export default obc(User)
