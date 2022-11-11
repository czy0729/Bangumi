/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 10:07:25
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { Login, SectionHeader, ItemTimeline } from '@_'
import { _, uiStore } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { TimeLineScope, TimeLineScopeCn, TimeLineType } from '@types'
import ItemHeatmaps from '../item-heatmaps'
import { TABS } from '../ds'
import { Ctx, TabLabel } from '../types'
import { styles } from './styles'

class List extends React.Component<{
  scope?: TimeLineScope
  title?: TabLabel
}> {
  state = {
    /**
     * @issue 列表的滚回顶部 scrollToLocation 不知道如何正确使用
     * 暂时使用重新渲染的办法解决列表变换置顶问题
     */
    hide: false
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.scope !== this.props.scope) {
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

  forwardRef = (ref: any) => {
    const { $ }: Ctx = this.context
    const { title } = this.props
    const index = TABS.findIndex(item => item.title === title)
    return $.forwardRef(ref, index)
  }

  onScroll = () => {
    uiStore.closePopableSubject()
  }

  renderItem = ({ item, index }) => {
    const { $, navigation }: Ctx = this.context
    const { scope, title } = this.props
    const EVENT = {
      id: '时间胶囊.跳转',
      data: {
        scope,
        title
      }
    } as const

    return (
      <>
        <ItemTimeline
          style={_.container._item}
          navigation={navigation}
          {...item}
          event={EVENT}
          onDelete={$.doDelete}
          onHidden={$.onHidden}
        />
        {index === 1 && <ItemHeatmaps />}
      </>
    )
  }

  render() {
    const { $ }: Ctx = this.context
    const { scope, page, isFocused } = $.state
    const { title } = this.props
    const label = MODEL_TIMELINE_SCOPE.getLabel<TimeLineScopeCn>(scope)
    if (!$.isWebLogin && ['好友', '自己'].includes(label)) return <Login />

    const { hide } = this.state
    if (hide) return null

    const timeline = $.timeline(
      scope,
      MODEL_TIMELINE_TYPE.getValue<TimeLineType>(title)
    )
    if (!timeline._loaded) return <Loading />

    if (!$.showItem(title)) return null
    return (
      <ListView
        ref={this.forwardRef}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={timeline}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        progressViewOffset={_.ios(styles.contentContainerStyle.paddingTop - _.sm, 0)}
        scrollToTop={isFocused && TABS[page].title === title}
        renderSectionHeader={renderSectionHeader}
        renderItem={this.renderItem}
        onScroll={this.onScroll}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchTimeline}
      />
    )
  }
}

export default obc(List)

function renderSectionHeader({ section: { title } }) {
  return <SectionHeader>{title}</SectionHeader>
}
