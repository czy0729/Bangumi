/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 11:42:15
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { ListView } from '@components'
import { TopicItem } from '@screens/_'
import { open } from '@utils'
import { inject, withTransitionHeader, observer } from '@utils/decorators'
import { analysis } from '@utils/fetch'
import { HOST } from '@constants'
import _ from '@styles'
import Info from './info'
import Store from './store'

const title = '人物'

export default
@inject(Store)
@withTransitionHeader({
  colorStart: _.colorTitleRaw,
  barStyle: 'dark-content'
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

    const { monoId } = $.params
    navigation.setParams({
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(`${HOST}/${monoId}`)
              break
            default:
              break
          }
        }
      }
    })

    analysis(monoId, `${title} - ${name}`)
  }

  render() {
    const { $, navigation } = this.context
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
