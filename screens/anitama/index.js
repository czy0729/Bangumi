/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-24 21:42:18
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Text, Image, Flex, Input } from '@components'
import { open } from '@utils'
import { inject, withHeader, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import Store from './store'

const title = 'Anitama'
const width = _.window.width - _.wind * 2
const height = width * 0.56

export default
@inject(Store)
@withHeader()
@observer
class Anitama extends React.Component {
  static navigationOptions = {
    title: 'Anitama'
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
          switch (key) {
            case '浏览器查看':
              open('http://www.anitama.cn')
              break
            default:
              break
          }
        }
      }
    })

    hm('anitama', title)
  }

  renderPaganation() {
    const { $ } = this.context
    const { ipt } = $.state
    return (
      <Flex style={[_.container.wind, _.mt.lg]}>
        <Flex.Item>
          <Touchable onPress={$.prev}>
            <Flex style={styles.paganation} justify='center'>
              <Text>上一页</Text>
            </Flex>
          </Touchable>
        </Flex.Item>
        <Flex.Item style={_.ml.md}>
          <Input
            style={{
              height: 34,
              textAlign: 'center'
            }}
            value={ipt}
            keyboardType='number-pad'
            placeholder='页'
            returnKeyType='search'
            onChange={$.onChange}
            onSubmitEditing={$.doSearch}
          />
        </Flex.Item>
        <Flex.Item style={_.ml.md}>
          <Touchable onPress={$.next}>
            <Flex style={styles.paganation} justify='center'>
              <Text>下一页</Text>
            </Flex>
          </Touchable>
        </Flex.Item>
      </Flex>
    )
  }

  render() {
    const { $ } = this.context
    const { show, _loaded } = $.state
    if (!_loaded) {
      return null
    }

    return (
      <ScrollView
        style={_.container.screen}
        contentContainerStyle={_.container.bottom}
      >
        {this.renderPaganation()}
        {show && (
          <View>
            <View
              style={{
                minHeight: _.window.height
              }}
            >
              {$.anitamaTimeline.list.map(item => (
                <Touchable
                  key={item.aid}
                  style={styles.item}
                  onPress={() => {
                    const url = `http://m.anitama.cn/article/${item.aid}`
                    open(url)
                    hm(url, title)
                    // $.pushHistory(item.aid)
                  }}
                >
                  <Text align='right'>
                    © {item.author} / {item.origin}
                  </Text>
                  <Image
                    style={_.mt.sm}
                    src={item.cover.url}
                    width={width}
                    height={height}
                    radius
                    shadow
                  />
                  <View style={styles.info}>
                    <Text size={20} type='title'>
                      {item.title}
                    </Text>
                    <Text style={_.mt.sm} size={16} lineHeight={20}>
                      {item.subtitle}
                    </Text>
                    <Text style={_.mt.md} type='sub' lineHeight={20}>
                      {item.intro}
                    </Text>
                  </View>
                </Touchable>
              ))}
            </View>
            {this.renderPaganation()}
          </View>
        )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: _.wind,
    paddingTop: 24,
    marginTop: _.lg,
    backgroundColor: _.colorPlain
  },
  readed: {
    backgroundColor: _.colorBorder
  },
  info: {
    paddingVertical: _.wind
  },
  paganation: {
    height: 34,
    backgroundColor: _.colorPlain,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs
  }
})
