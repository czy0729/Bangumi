/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-09 19:37:10
 */
import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { WebBrowser } from 'expo'
import { ActionSheet } from '@ant-design/react-native'
import { BlurView } from '@components'
import { ManageModal } from '@screens/_'
import inject from '@utils/inject'
import { getBangumiUrl } from '@utils/app'
import _, { window, headerHeight, space, colorPlain } from '@styles'
import Head from './head'
import Box from './box'
import Ep from './ep'
import Tags from './tags'
import Summary from './summary'
import Rating from './rating'
import Character from './character'
import Staff from './staff'
import Relations from './relations'
import Blog from './blog'
import Topic from './topic'
import Store from './store'

class Subject extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $, navigation } = this.context

    // @issue 由于subjectStore里面的缓存数据是异步获取的
    // 当本页面是首屏, 会出现同步时获取不到数据的情况, 当然本屏通常不是首屏
    setTimeout(() => {
      const { name_cn: nameCn, name } = $.subject
      const title = nameCn || name
      if (title) {
        navigation.setParams({
          headerTransitionTitle: title
        })
      }
    }, 400)

    // 右上角头部按钮
    const data = await $.initFetch()
    if (data) {
      const { sites = [] } = $.state.bangumiInfo
      const title = data.name_cn || data.name
      const url = String(data.url).replace('http://', 'https://')
      navigation.setParams({
        headerTransitionTitle: data.name_cn || data.name,
        popover: {
          data: [
            '刷新',
            '分享',
            ...sites
              .filter(item => ['tudou', 'acfun'].indexOf(item.site) === -1)
              .map(item => item.site)
          ],
          onSelect: key => {
            let item
            switch (key) {
              case '刷新':
                $.initFetch()
                break
              case '分享':
                ActionSheet.showShareActionSheetWithOptions({
                  message: `${title}\n${url}`,
                  title: '分享',
                  url
                })
                break
              default:
                item = sites.find(item => item.site === key)
                if (item) {
                  const url = getBangumiUrl(item)
                  WebBrowser.openBrowserAsync(url)
                }
                break
            }
          }
        }
      })
    }
  }

  render() {
    const { $ } = this.context
    const { onScroll } = this.props
    const { visible } = $.state
    const { nameCn, name, images = {} } = $.subject
    return (
      <>
        <BlurView style={styles.blurView} theme='dark' src={images.medium} />
        <ScrollView
          style={_.container.flex}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          onScroll={onScroll}
        >
          <Head />
          <View style={styles.content}>
            <Box style={_.mt.md} />
            <Ep style={_.mt.lg} />
            <Tags style={_.mt.lg} />
            <Summary style={_.mt.lg} />
            <Rating style={_.mt.lg} />
            <Character style={_.mt.lg} />
            <Staff style={_.mt.lg} />
            <Relations style={_.mt.lg} />
            <Blog style={_.mt.lg} />
            <Topic style={_.mt.lg} />
          </View>
        </ScrollView>
        <ManageModal
          visible={visible}
          subjectId={$.params.subjectId}
          title={nameCn || name}
          desc={name}
          onSubmit={$.doUpdateCollection}
          onClose={$.closeManageModal}
        />
      </>
    )
  }
}

export default inject(Store, {
  headerTransition: 48
})(observer(Subject))

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: window.height * 0.5
  },
  contentContainerStyle: {
    paddingTop: headerHeight,
    paddingBottom: space
  },
  content: {
    backgroundColor: colorPlain
  }
})
