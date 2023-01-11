/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:04:51
 */
import React from 'react'
import { Animated } from 'react-native'
import { Loading, ListView, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS } from '@constants'
import { CollectionStatus } from '@types'
import { TABS } from '../ds'
import { Ctx } from '../types'
import ItemList from './item-list'
import ItemGrid from './item-grid'
import { memoStyles } from './styles'
import { Props } from './types'

class List extends React.Component<Props> {
  state = {
    // @issue 列表的滚回顶部 scrollToLocation 不知道如何正确使用
    // 暂时使用重新渲染的办法解决列表变换置顶问题
    hide: false
  }

  // @ts-expect-error
  UNSAFE_componentWillReceiveProps({ subjectType }) {
    if (subjectType !== this.props.subjectType) {
      this.setState({
        hide: true
      })

      setTimeout(() => {
        this.setState({
          hide: false
        })
      }, 0)
    }
  }

  connectRef = (ref: { scrollToIndex: any; scrollToOffset: any }) => {
    const { $ }: Ctx = this.context
    const { title } = this.props
    const index = TABS.findIndex((item: { title: string }) => item.title === title)
    return $.connectRef(ref, index)
  }

  get userGridNum() {
    const { userGridNum } = systemStore.setting
    return Number(userGridNum) + (_.isLandscape ? 1 : 0)
  }

  renderItem = ({ item, index }) => {
    const { $ }: Ctx = this.context
    const { list } = $.state
    if (list) {
      const { page } = this.props
      return (
        <>
          <ItemList item={item} page={page} />
          {index === 0 && <Heatmap id='我的.跳转' to='Subject' alias='条目' />}
        </>
      )
    }

    return <ItemGrid item={item} numColumns={this.userGridNum} />
  }

  render() {
    global.rerender('User.List')

    const { hide } = this.state
    if (hide) return null

    const { $ }: Ctx = this.context
    const { page, title, scrollY, onScroll, ...other } = this.props
    const { subjectType, list, isFocused } = $.state
    const userCollections = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(title)
    )

    if (!userCollections._loaded) {
      return (
        <Loading
          style={[_.ios(_.container.plain, _.container._plain), this.styles.loading]}
        />
      )
    }

    const numColumns = list ? undefined : this.userGridNum
    const tab = TABS[page]
    return (
      <ListView
        key={`${_.orientation}${numColumns}`}
        ref={this.connectRef}
        keyExtractor={keyExtractor}
        style={this.styles.listView}
        contentContainerStyle={list ? this.styles.list : this.styles.grid}
        data={userCollections}
        numColumns={numColumns}
        renderItem={this.renderItem}
        keyboardDismissMode='on-drag'
        lazy={12}
        animated
        scrollToTop={isFocused && tab.title === title}
        onFooterRefresh={$.fetchUserCollections}
        {...other}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ],
          {
            useNativeDriver: true,
            listener: onScroll
          }
        )}
      />
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(List)
