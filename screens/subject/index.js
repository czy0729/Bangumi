/*
 * @Author: czy0729
 * @Date: 2019-03-23 04:16:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-01 02:42:12
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
    const title = nameCn || name
    if (title) {
      withTransitionHeader.setTitle(navigation, title)
    }

    // 右上角头部按钮
    const data = await $.init()
    if (data) {
      const { sites = [] } = $.state.bangumiInfo
      const url = String(data.url).replace('http://', 'https://')
      navigation.setParams({
        headerTransitionTitle: data.name_cn || data.name,
        popover: {
          data: [
            '浏览器查看',
            ...sites
              .filter(item => sitesDS.includes(item.site))
              .map(item => item.site)
          ],
          onSelect: key => {
            let item
            switch (key) {
              case '浏览器查看':
                open(url)
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
        <BlurView style={styles.blurView} theme='dark' src={image} />
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
    height: _.window.height * 0.5
  },
  contentContainerStyle: {
    paddingTop: _.headerHeight,
    paddingBottom: _.space
  }
})
