/*
 * 帖子
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-10 22:34:45
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import FixedTextarea from '@components/fixed-textarea'
import { open } from '@utils'
import { inject, withTransitionHeader } from '@utils/decorators'
import _ from '@styles'
import Top from './top'
import Item from './item'
import Store from './store'

export default
@inject(Store)
@withTransitionHeader({
  colorStart: _.colorTitleRaw,
  barStyle: 'dark-content'
})
@observer
class Topic extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    const { title } = $.topic
    withTransitionHeader.setTitle(navigation, title)

    const url = navigation.getParam('_url')
    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(url)
              break
            default:
              break
          }
        }
      }
    })
  }

  render() {
    const { $ } = this.context
    const { onScroll } = this.props
    return (
      <>
        <ListView
          style={styles.container}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => String(item.id)}
          data={$.comments}
          scrollEventThrottle={32}
          ListHeaderComponent={<Top />}
          renderItem={({ item, index }) => (
            <Item index={index} authorId={$.topic.userId} {...item} />
          )}
          onScroll={onScroll}
          onHeaderRefresh={() => $.fetchTopic(true)}
          onFooterRefresh={$.fetchTopic}
          {...withTransitionHeader.listViewProps}
        />
        <FixedTextarea />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _.colorPlain
  },
  contentContainerStyle: {
    paddingBottom: _.space
  }
})
