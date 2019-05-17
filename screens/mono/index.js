/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-18 01:00:58
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { TopicItem } from '@screens/_'
import { inject, withTransitionHeader, observer } from '@utils/decorators'
import _ from '@styles'
import Info from './info'
import Store from './store'

export default
@inject(Store)
@withTransitionHeader({
  colorStart: _.colorTitleRaw
})
@observer
class Mono extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    await $.init()

    const { name } = $.mono
    withTransitionHeader.setTitle(navigation, name)
  }

  render() {
    const { $, navigation } = this.context
    if (!$.mono._loaded) {
      return <Loading />
    }

    const { onScroll } = this.props
    return (
      <ListView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        keyExtractor={item => String(item.id)}
        data={$.monoComments}
        scrollEventThrottle={32}
        ListHeaderComponent={<Info />}
        renderItem={({ item, index }) => (
          <TopicItem navigation={navigation} index={index} {...item} />
        )}
        onScroll={onScroll}
        onHeaderRefresh={() => $.fetchMono(true)}
        onFooterRefresh={$.fetchMono}
        {...withTransitionHeader.listViewProps}
      />
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
