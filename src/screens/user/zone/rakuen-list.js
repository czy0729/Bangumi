/*
 * @Author: czy0729
 * @Date: 2020-10-22 17:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-23 19:58:35
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView, Text } from '@components'
import { SectionHeader } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
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

  toQiafan = () => {
    const { navigation } = this.context
    t('空间.跳转', {
      from: '高级会员',
      to: 'Qiafan'
    })

    navigation.push('Qiafan')
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

    const { _filter = 0 } = $.userTopicsFormCDN
    const ListFooterComponent =
      _filter > 0 ? (
        <>
          <Text style={_.mt.md} type='sub' align='center' size={12}>
            还有{_filter}条数据未显示
          </Text>
          <Text style={_.mt.xs} type='sub' align='center' size={12}>
            <Text type='warning' size={12} onPress={this.toQiafan}>
              高级会员
            </Text>
            显示所有
          </Text>
        </>
      ) : undefined
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
        ListFooterComponent={ListFooterComponent}
        onFooterRefresh={$.fetchUsersTimeline}
        {...this.props}
      />
    )
  }
}

function keyExtractor(item) {
  return String(item.id)
}
