/*
 * @Author: czy0729
 * @Date: 2020-10-17 16:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-18 03:28:43
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { cnjp } from '@utils/app'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import Store from './store'

const title = '章节'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['episodes', 'Episodes']
})
@observer
class Episodes extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { name } = navigation.state.params
    return {
      title: name ? `${name}的${title}` : title
    }
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
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

  render() {
    const { $, navigation } = this.context
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={_.container.bottom}
      >
        {$.eps.map(item => (
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
            <Flex style={this.styles.item} alignItems='start'>
              <View
                style={[
                  this.styles.status,
                  item.status === 'Air' && this.styles.statusPrimary,
                  item.status === 'Today' && this.styles.statusSuccess
                ]}
              />
              <Flex.Item>
                <Text>
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
    paddingVertical: _.md,
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
