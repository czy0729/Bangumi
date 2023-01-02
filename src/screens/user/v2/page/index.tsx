/*
 * @Author: czy0729
 * @Date: 2022-03-16 16:30:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 07:30:52
 */
import React from 'react'
import { Animated } from 'react-native'
import { Page } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus, SubjectTypeCn } from '@types'
import ParallaxImage from '../parallax-image'
import Tab from '../tab'
import { TABS } from '../ds'
import { Ctx } from '../types'

class User extends React.Component {
  state = {
    /** 头部是否置顶 */
    fixed: false
  }

  scrollY = new Animated.Value(0)

  y: number = 0

  componentDidMount() {
    const { $ }: Ctx = this.context
    const { subjectType, page } = $.state
    const { _loaded } = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(TABS[page].title)
    )
    if (!_loaded) $.fetchUserCollections(true)
  }

  updatePageOffset = (index = [-1, 1]) => {
    const { $ }: Ctx = this.context
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

  onScroll = (e: {
    nativeEvent: {
      contentOffset: {
        y: any
      }
    }
  }) => {
    const { $ }: Ctx = this.context
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

  onSelectSubjectType = (title: SubjectTypeCn) => {
    const { $ }: Ctx = this.context
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
    const { $ }: Ctx = this.context
    const { page, _loaded } = $.state
    const { fixed } = this.state
    return (
      <Page>
        {!!_loaded && (
          <>
            <Tab
              page={page}
              scrollEventThrottle={16}
              scrollY={this.scrollY}
              onScroll={this.onScroll}
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
