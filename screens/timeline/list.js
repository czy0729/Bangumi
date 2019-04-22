/*
 * @Author: czy0729
 * @Date: 2019-04-14 00:51:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-22 19:01:38
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { SectionHeader, TimelineItem } from '@screens/_'
import { MODEL_TIMELINE_TYPE } from '@constants/model'

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
    if (this.ref) {
      setTimeout(() => {
        this.ref.scrollToLocation({
          sectionIndex: 0,
          itemIndex: 0,
          viewOffset: 32 // <SectionHeader>的高度
        })
      }, 600)
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
        keyExtractor={item => item.id}
        data={timeline}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>{title}</SectionHeader>
        )}
        renderItem={({ item, index }) => (
          <TimelineItem
            key={item.id}
            index={index}
            navigation={navigation}
            {...item}
          />
        )}
        onHeaderRefresh={() => $.fetchTimeline(true)}
        onFooterRefresh={$.fetchTimeline}
      />
    )
  }
}

export default observer(List)
