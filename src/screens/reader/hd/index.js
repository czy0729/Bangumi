/*
 * @Author: czy0729
 * @Date: 2021-01-16 00:47:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 09:44:40
 */
import React from 'react'
import { Alert, View } from 'react-native'
import { ScrollView, Text, Flex } from '@components'
import { Cover, IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { CDN_HD_OBJECT } from '@constants/cdn'
import Store from './store'

const title = 'HD'
const num = 2
const imageWidth = _.window.contentWidth * ((1 / num) * 0.84)
const imageHeight = imageWidth * 1.4
const marginLeft = (_.window.contentWidth - num * imageWidth) / (num + 1)

export default
@inject(Store)
@withHeader({
  screen: title,
  alias: 'HD',
  hm: ['hd', 'HD']
})
@obc
class HD extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('cn')
  })

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()
    navigation.setParams({
      extra: (
        <IconHeader
          name='information'
          onPress={() => {
            t('HD.提示')

            Alert.alert(
              '高清高速源头',
              '一般只提供高清单行本数据\n会不定时添加数据\n所有数据来源于互联网请支持正版\n若因不可抗力原因功能会随时下线\n若想收录想要的单行本可留言私聊',
              [
                {
                  text: '知道了'
                }
              ]
            )
          }}
        />
      )
    })
  }

  render() {
    const { $ } = this.context
    const { data } = $.state
    return (
      <ScrollView
        style={_.container.plain}
        contentContainerStyle={this.styles.contentContainerStyle}
        scrollToTop
      >
        <Flex wrap='wrap'>
          {data.map(item => (
            <View key={item.vol} style={this.styles.item}>
              <Cover
                size={imageWidth}
                height={imageHeight}
                src={CDN_HD_OBJECT($.subjectId, item.vol)}
                radius
                shadow
                onPress={() => $.jump(item)}
              />
              <Text style={_.mt.sm} align='center' bold>
                {typeof item.vol === 'number' && 'vol.'}
                {item.vol}
                <Text size={10} lineHeight={14} type='sub'>
                  {' '}
                  {item.page}P
                </Text>
              </Text>
            </View>
          ))}
        </Flex>
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingBottom: _.bottom
  },
  item: {
    width: imageWidth,
    marginBottom: marginLeft + _.xs,
    marginLeft
  }
}))
