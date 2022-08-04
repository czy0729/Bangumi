/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-04 16:44:27
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { Login, SectionHeader, ItemTimeline } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { keyExtractor } from '@utils/app'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants'
import { TimeLineScope, TimeLineScopeCn } from '@types'
import ItemHeatmaps from '../item-heatmaps'
import { tabs } from '../store'
import { styles } from './styles'

class List extends React.Component<{
  scope?: TimeLineScope
  title?: string
}> {
  state = {
    /**
     * @issue 列表的滚回顶部scrollToLocation不知道如何正确使用
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

  connectRef = ref => {
    const { $ } = this.context
    const { title } = this.props
    const index = tabs.findIndex(item => item.title === title)
    return $.connectRef(ref, index)
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { scope, title } = this.props
    const event = {
      id: '时间胶囊.跳转',
      data: {
        scope,
        title
      }
    }

    return (
      <ItemTimeline
        style={_.container._item}
        navigation={navigation}
        index={index}
        {...item}
        event={event}
        onDelete={$.doDelete}
        onHidden={$.onHidden}
      >
        <ItemHeatmaps index={index} />
      </ItemTimeline>
    )
  }

  render() {
    const { $ } = this.context
    const { scope, page, isFocused } = $.state
    const { title } = this.props
    const label = MODEL_TIMELINE_SCOPE.getLabel<TimeLineScopeCn>(scope)
    if (!$.isWebLogin && ['好友', '自己'].includes(label)) return <Login />

    const { hide } = this.state
    if (hide) return null

    const timeline = $.timeline(scope, MODEL_TIMELINE_TYPE.getValue(title))
    if (!timeline._loaded) return <Loading />

    return (
      <ListView
        ref={this.connectRef}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        data={timeline}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        progressViewOffset={_.ios(styles.contentContainerStyle.paddingTop - _.sm, 0)}
        scrollToTop={isFocused && tabs[page].title === title}
        renderSectionHeader={renderSectionHeader}
        renderItem={this.renderItem}
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
