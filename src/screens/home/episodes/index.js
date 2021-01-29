/*
 * @Author: czy0729
 * @Date: 2020-10-17 16:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 00:30:22
 */
import React from 'react'
import { View } from 'react-native'
import { toJS } from 'mobx'
import { ScrollView, Flex, Text, Touchable, Image, Heatmap } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { cnjp } from '@utils/app'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { showImageViewer } from '@utils/ui'
import Store from './store'

const title = '章节'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['episodes', 'Episodes']
})
@obc
class Episodes extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: name ? `${name}的${title}` : title
    }
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: '章节.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('章节.右上角菜单', {
            key
          })

          switch (key) {
            case '浏览器查看':
              open($.url)
              break
            default:
              break
          }
        }
      }
    })
  }

  get eps() {
    const { $ } = this.context

    // sp排在正常章节后面, 已播放优先
    return $.eps.sort(
      (a, b) =>
        (b.status === 'NA' ? 0 : b.type || 10) -
        (a.status === 'NA' ? 0 : a.type || 10)
    )
  }

  get epsThumbs() {
    const { $ } = this.context
    const { epsThumbs = [] } = $.params
    return toJS(epsThumbs)
  }

  renderThumb(index) {
    const { $ } = this.context
    const { epsThumbsHeader = {} } = $.params
    return (
      !!this.epsThumbs[index] && (
        <View style={_.ml.sm}>
          <Image
            src={this.epsThumbs[index]}
            size={104}
            height={66}
            radius
            headers={epsThumbsHeader}
            onPress={() =>
              showImageViewer(
                this.epsThumbs.map(item => ({
                  url: item.split('@')[0],
                  headers: epsThumbsHeader
                })),
                index
              )
            }
          />
        </View>
      )
    )
  }

  render() {
    const { navigation } = this.context
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
        scrollToTop
      >
        {this.eps.map((item, index) => (
          <Touchable
            key={item.id}
            onPress={() => {
              t('章节.跳转', {
                to: 'Topic',
                topicId: `ep/${item.id}`
              })

              navigation.push('Topic', {
                topicId: `ep/${item.id}`,
                _title: `ep${item.sort}.${item.name}`,
                _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${item.desc}`
              })
            }}
          >
            <Flex style={this.styles.item}>
              <Flex.Item>
                <Flex align='start'>
                  <View
                    style={[
                      this.styles.status,
                      item.status === 'Air' && this.styles.statusPrimary,
                      item.status === 'Today' && this.styles.statusSuccess
                    ]}
                  />
                  <Flex.Item>
                    <Text bold>
                      {item.sort}. {HTMLDecode(cnjp(item.name_cn, item.name))}
                      {!!item.comment && (
                        <Text type='main' size={11} lineHeight={14}>
                          {' '}
                          +{item.comment}
                        </Text>
                      )}
                    </Text>
                    <Text style={_.mt.sm} size={11} type='sub'>
                      首播: {item.airdate || '-'} / 时长: {item.duration || '-'}
                    </Text>
                  </Flex.Item>
                </Flex>
              </Flex.Item>
              {this.renderThumb(index)}
            </Flex>
            {!index && <Heatmap id='章节.跳转' />}
          </Touchable>
        ))}
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: _.sm + 2,
    paddingHorizontal: _.wind
  },
  status: {
    width: 6,
    height: 6,
    marginTop: 6,
    marginRight: _.sm,
    backgroundColor: _.colorSub,
    borderRadius: 3
  },
  statusSuccess: {
    backgroundColor: _.colorSuccess
  },
  statusPrimary: {
    backgroundColor: _.colorPrimary
  }
}))
