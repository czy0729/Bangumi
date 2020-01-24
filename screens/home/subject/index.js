/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 20:39:09
 */
import React from 'react'
import { InteractionManager, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { BlurView, ListView } from '@components'
import { ManageModal, ItemComment } from '@screens/_'
import { _ } from '@stores'
import { open, copy } from '@utils'
import { inject, withTransitionHeader } from '@utils/decorators'
import { keyExtractor, getBangumiUrl, getCoverMedium } from '@utils/app'
import { hm, t } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST, IOS, HOST_NING_MOE } from '@constants'
import { CDN_OSS_SUBJECT } from '@constants/cdn'
import Header from './header'
import Store from './store'

const title = '条目'
const sitesDS = [
  'bilibili',
  'iqiyi',
  'pptv',
  'youku',
  'acfun',
  'nicovideo',
  'qq',
  'mgtv'
]
const refreshControlProps = {
  tintColor: _.__colorPlain__,
  titleColor: _.__colorPlain__
}

export default
@inject(Store)
@withTransitionHeader({
  screen: title,
  colorStart: _.colorPlainRaw
})
@observer
class Subject extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(async () => {
      const { $, navigation } = this.context
      const { name_cn: nameCn, name } = $.subject
      const _title = nameCn || name
      if (_title) {
        withTransitionHeader.setTitle(navigation, _title)
      }

      // 右上角头部按钮
      const data = await $.init()
      if (data) {
        const { sites = [] } = $.state.bangumiInfo
        const url = String(data.url).replace('http://', 'https://')
        const _data = ['Bangumi']
        if ($.showOnlinePlay && $.ningMoeDetail.id) {
          _data.push('柠萌瞬间')
        }

        let _sitesDS = []
        if ($.showOnlinePlay) {
          _sitesDS = sitesDS
        }

        const popoverData = [
          ..._data,
          ...sites
            .filter(item => _sitesDS.includes(item.site))
            .map(item => item.site)
        ]
        if (['动画', '三次元'].includes($.type)) {
          popoverData.push('迅播动漫')
        }
        popoverData.push('复制链接')
        navigation.setParams({
          headerTransitionTitle: data.name_cn || data.name,
          popover: {
            data: popoverData,
            onSelect: key => {
              t('条目.右上角菜单', {
                subjectId: $.subjectId,
                key
              })

              let item
              switch (key) {
                case 'Bangumi':
                  open(url)
                  break
                case '柠萌瞬间':
                  open(`${HOST_NING_MOE}/bangumi/${$.ningMoeDetail.id}/home`)
                  break
                case '迅播动漫':
                  $.jumpXunBo()
                  break
                case '复制链接':
                  copy(`${HOST}/subject/${$.params.subjectId}`)
                  info('已复制')
                  break
                default:
                  item = sites.find(item => item.site === key)
                  if (item) {
                    const url = getBangumiUrl(item)
                    open(url)
                  }
                  break
              }
            }
          }
        })
      }

      hm(`subject/${$.params.subjectId}`, 'Subject')
    })
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const event = {
      id: '条目.跳转',
      data: {
        from: '吐槽箱',
        subjectId: $.subjectId
      }
    }
    return (
      <ItemComment
        navigation={navigation}
        event={event}
        index={index}
        time={item.time}
        avatar={item.avatar}
        userId={item.userId}
        userName={item.userName}
        star={$.hideScore ? undefined : item.star}
        comment={item.comment}
      />
    )
  }

  render() {
    const { $ } = this.context
    const { visible, _loaded } = $.state
    if (!_loaded) {
      return <View style={_.container.screen} />
    }

    const { onScroll } = this.props
    const { name_cn: nameCn, name, images = {} } = $.subject
    return (
      <View style={_.container.screen}>
        <BlurView
          style={styles.blurView}
          theme='dark'
          tint={_.select('default', 'dark')}
          src={CDN_OSS_SUBJECT(
            getCoverMedium($.coverPlaceholder || images.common)
          )}
        />
        <ListView
          style={styles.listView}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={keyExtractor}
          data={$.subjectComments}
          scrollEventThrottle={16}
          refreshControlProps={refreshControlProps}
          ListHeaderComponent={<Header />}
          renderItem={this.renderItem}
          onScroll={onScroll}
          onHeaderRefresh={$.init}
          onFooterRefresh={$.fetchSubjectComments}
        />
        <ManageModal
          visible={visible}
          subjectId={$.params.subjectId}
          title={nameCn || name}
          desc={name}
          action={$.action}
          onSubmit={$.doUpdateCollection}
          onClose={$.closeManageModal}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: IOS ? _.window.height * 0.32 : 160 // iOS有弹簧, 所以拉下来太矮会看见背景
  },
  listView: {
    ..._.container.flex
  },
  contentContainerStyle: {
    paddingTop: _.headerHeight,
    paddingBottom: _.space
  }
})
