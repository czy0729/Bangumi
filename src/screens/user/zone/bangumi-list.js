/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-14 18:54:31
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView, Flex, Touchable, Iconfont } from '@components'
import { SectionHeader, ItemBangumiList } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { height } from './store'

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
          style={styles.sectionHeader}
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

  render() {
    const { $, navigation } = this.context
    if (!$.userCollections._loaded) {
      return <Loading />
    }

    const { expand } = $.state
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
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={keyExtractor}
        sections={sections}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={({ item, section: { title } }) => {
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
        }}
        animated
        {...this.props}
      />
    )
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: _.wind - _._wind,
    minHeight: _.window.height + height - _.tabBarHeight
  },
  sectionHeader: {
    paddingHorizontal: _._wind,
    backgroundColor: _.colorPlain
  }
})
