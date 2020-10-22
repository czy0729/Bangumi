/*
 * @Author: czy0729
 * @Date: 2020-10-22 17:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-22 20:45:05
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView, Text } from '@components'
import { SectionHeader } from '@screens/_'
import { _ } from '@stores'
import RakuenItem from './rakuen-item'

const event = {
  id: '空间.跳转',
  data: {
    from: '超展开'
  }
}

export default
@observer
class RakuenList extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  renderSectionHeader = ({ section: { title } }) => (
    <SectionHeader size={14}>{title}</SectionHeader>
  )

  renderItem = ({ item, index }) => {
    const { navigation } = this.context
    return (
      <RakuenItem
        navigation={navigation}
        index={index}
        event={event}
        {...item}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { timeout } = $.state
    if (!$.userTopicsFormCDN._loaded) {
      return (
        <Loading>
          {timeout && <Text style={_.mt.md}>查询超时，TA可能没有发过帖子</Text>}
        </Loading>
      )
    }

    return (
      <ListView
        contentContainerStyle={_.container.bottom}
        keyExtractor={keyExtractor}
        data={$.userTopicsFormCDN}
        sectionKey='date'
        stickySectionHeadersEnabled={false}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        animated
        onFooterRefresh={$.fetchUsersTimeline}
        {...this.props}
      />
    )
  }
}

function keyExtractor(item) {
  return String(item.id)
}
