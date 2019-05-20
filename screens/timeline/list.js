/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-20 22:43:26
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { SectionHeader, TimelineItem } from '@screens/_'
import { withTabsHeader } from '@utils/decorators'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'
import _ from '@styles'
import Login from './login'

class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    // @issue 列表的滚回顶部scrollToLocation不知道如何正确使用
    // 暂时使用重新渲染的办法解决列表变换置顶问题
    hide: false
  }

  componentWillReceiveProps(nextProps) {
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

  render() {
    const { $, navigation } = this.context
    const { scope, title } = this.props
    const label = MODEL_TIMELINE_SCOPE.getLabel(scope)
    if (!$.isWebLogin && ['好友', '自己'].includes(label)) {
      return <Login />
    }

    const { hide } = this.state
    if (hide) {
      return null
    }

    const timeline = $.timeline(scope, MODEL_TIMELINE_TYPE.getValue(title))
    if (!timeline._loaded) {
      return <Loading />
    }

    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={item => String(item.id)}
        data={timeline}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
        renderItem={({ item, index }) => (
          <TimelineItem navigation={navigation} index={index} {...item} />
        )}
        onHeaderRefresh={() => $.fetchTimeline(true)}
        onFooterRefresh={$.fetchTimeline}
        {...withTabsHeader.listViewProps}
      />
    )
  }
}

export default observer(List)
