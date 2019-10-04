/*
 * 帖子
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-25 22:38:00
 */
import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView } from '@components'
import FixedTextarea from '@components/fixed-textarea'
import { open } from '@utils'
import { inject, withTransitionHeader } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { HOST } from '@constants'
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

  fixedTextarea

  async componentDidMount() {
    const { $, navigation } = this.context
    const { topicId } = $.params
    if (!$.isUGCAgree) {
      // @notice 这里注意在iOS上面, 一定要延迟,
      // 不然首页点击讨论跳进来popover + alert直接就不能操作了
      setTimeout(() => {
        Alert.alert(
          '社区指导原则',
          '生命有限, Bangumi 是一个纯粹的ACG网络, 请查看社区指导原则并且同意才能继续操作',
          [
            {
              text: '取消',
              style: 'cancel',
              onPress: () => navigation.goBack()
            },
            {
              text: '查看',
              onPress: () => {
                navigation.goBack()
                navigation.push('UGCAgree', {
                  topicId
                })
              }
            }
          ]
        )
      }, 800)
      return
    }

    await $.init()
    const { title } = $.topic
    withTransitionHeader.setTitle(navigation, title)

    const url = navigation.getParam('_url') || `${HOST}/rakuen/topic/${topicId}`
    navigation.setParams({
      popover: {
        data: ['浏览器查看', '举报'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(url)
              break
            case '举报':
              open(`${HOST}/group/forum`)
              break
            default:
              break
          }
        }
      }
    })

    hm(`rakuen/topic/${topicId}`)
  }

  showFixedTextare = () => {
    this.fixedTextarea.onFocus()
  }

  render() {
    const { $ } = this.context
    const { placeholder } = $.state
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
            <Item
              index={index}
              authorId={$.topic.userId}
              {...item}
              showFixedTextare={this.showFixedTextare}
            />
          )}
          onScroll={onScroll}
          onHeaderRefresh={$.fetchTopic}
          onFooterRefresh={$.fetchTopic}
          onEndReachedThreshold={0.5}
          {...withTransitionHeader.listViewProps}
        />
        {$.isWebLogin && (
          <FixedTextarea
            ref={ref => (this.fixedTextarea = ref)}
            placeholder={placeholder ? `回复 ${placeholder}` : undefined}
            onClose={$.closeFixedTextarea}
            onSubmit={$.doSubmit}
          />
        )}
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
    paddingBottom: _.bottom
  }
})
