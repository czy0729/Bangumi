/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-10 15:52:24
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { BlurView, ListView } from '@components'
import { ManageModal, ItemComment } from '@screens/_'
import { open } from '@utils'
import { inject, withTransitionHeader } from '@utils/decorators'
import { getBangumiUrl } from '@utils/app'
import { hm } from '@utils/fetch'
import { NING_MOE_HOST } from '@constants'
import _ from '@styles'
import Header from './header'
import Store from './store'

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

export default
@inject(Store)
@withTransitionHeader()
@observer
class Subject extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
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

      navigation.setParams({
        headerTransitionTitle: data.name_cn || data.name,
        popover: {
          data: [
            ..._data,
            ...sites
              .filter(item => _sitesDS.includes(item.site))
              .map(item => item.site)
          ],
          onSelect: key => {
            let item
            switch (key) {
              case 'Bangumi':
                open(url)
                break
              case '柠萌瞬间':
                open(`${NING_MOE_HOST}/bangumi/${$.ningMoeDetail.id}/home`)
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

    hm(`subject/${$.params.subjectId}`)
  }

  render() {
    const { $, navigation } = this.context
    const { visible, _loaded } = $.state
    if (!_loaded) {
      return null
    }

    const { onScroll } = this.props
    const { name_cn: nameCn, name, images = {} } = $.subject
    const { _image } = $.params
    const image = images.medium || _image
    return (
      <>
        <BlurView style={styles.blurView} theme='dark' src={_image || image} />
        <ListView
          style={_.container.flex}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={item => String(item.id)}
          data={$.subjectComments}
          scrollEventThrottle={32}
          refreshControlProps={{
            tintColor: _.colorPlain,
            titleColor: _.colorPlain
          }}
          ListHeaderComponent={<Header />}
          renderItem={({ item, index }) => (
            <ItemComment
              navigation={navigation}
              index={index}
              time={item.time}
              avatar={item.avatar}
              userId={item.userId}
              userName={item.userName}
              star={item.star}
              comment={item.comment}
            />
          )}
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
      </>
    )
  }
}

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: _.window.height * 0.4
  },
  contentContainerStyle: {
    paddingTop: _.headerHeight,
    paddingBottom: _.space
  }
})
