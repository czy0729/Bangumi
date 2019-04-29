/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-29 17:40:43
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { SectionHeader } from '@screens/_'
import { MODEL_TIMELINE_TYPE } from '@constants/model'
import { listViewWithTabsHeaderProps } from '@styles/commonProps'
import Item from './item'

class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  ref

  componentWillReceiveProps(nextProps) {
    if (nextProps.scope !== this.props.scope) {
      this.scrollTop()
    }
  }

  scrollTop = () => {
    try {
      if (this.ref && this.ref.scrollToLocation) {
        setTimeout(() => {
          this.ref.scrollToLocation({
            sectionIndex: 0,
            itemIndex: 0,
            viewOffset: 32 // <SectionHeader>的高度
          })
        }, 600)
      }
    } catch (error) {
      // do nothing
    }
  }

  render() {
    const { $, navigation } = this.context
    const { scope, title } = this.props
    const timeline = $.timeline(scope, MODEL_TIMELINE_TYPE.getValue(title))
    if (!timeline._loaded) {
      return <Loading />
    }

    return (
      <ListView
        ref={ref => (this.ref = ref)}
        keyExtractor={item => String(item.id)}
        data={timeline}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
        renderItem={({ item, index }) => (
          <Item index={index} navigation={navigation} {...item} />
        )}
        onHeaderRefresh={() => $.fetchTimeline(true)}
        onFooterRefresh={$.fetchTimeline}
        {...listViewWithTabsHeaderProps}
      />
    )
  }
}

export default observer(List)
