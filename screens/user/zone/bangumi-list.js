/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 18:04:13
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView, Flex, Touchable, Iconfont } from '@components'
import { SectionHeader, ItemBangumiList } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'

const event = {
  id: '空间.跳转'
}

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  renderSectionHeader = ({ section: { title, count } }) => {
    const { $ } = this.context
    const { expand } = $.state
    return (
      <Touchable
        style={{
          backgroundColor: _.colorBg
        }}
        onPress={() => $.toggleSection(title)}
      >
        <SectionHeader
          size={14}
          right={
            <Iconfont
              name={expand[title] ? 'down' : 'up'}
              color={_.colorIcon}
              size={18}
            />
          }
        >
          {title} ({count})
        </SectionHeader>
      </Touchable>
    )
  }

  renderItem = ({ item, section: { title } }) => {
    const { $, navigation } = this.context
    const { expand } = $.state
    if (!expand[title]) {
      return null
    }
    return (
      <Flex wrap='wrap' align='start'>
        {item.list
          .filter((item, index) => index < 15)
          .map(item => (
            <ItemBangumiList
              key={item.id}
              navigation={navigation}
              subjectId={item.id}
              images={item.images}
              name={item.name_cn || item.name}
              event={event}
            />
          ))}
      </Flex>
    )
  }

  render() {
    const { $ } = this.context
    if (!$.userCollections._loaded) {
      return <Loading />
    }

    const sections = []
    $.userCollections.list.forEach(item => {
      sections.push({
        title: item.status,
        count: item.count,
        data: [
          {
            list: item.list
          }
        ]
      })
    })
    return (
      <ListView
        keyExtractor={keyExtractor}
        sections={sections}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={this.renderItem}
        {...this.props}
      />
    )
  }
}
