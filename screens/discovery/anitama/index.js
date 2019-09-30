/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-30 14:04:52
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Text, Image } from '@components'
import { Pagination } from '@screens/_'
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

    hm('discovery/anitama')
  }

  renderPaganation() {
    const { $ } = this.context
    const { ipt } = $.state
    return (
      <Pagination
        style={_.mt.lg}
        input={ipt}
        onPrev={$.prev}
        onNext={$.next}
        onChange={$.onChange}
        onSearch={$.doSearch}
      />
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
  info: {
    paddingVertical: _.wind
  }
})
