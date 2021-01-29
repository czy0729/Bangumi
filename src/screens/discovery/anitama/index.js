/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-28 01:18:50
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Touchable, Text, Image, Heatmap } from '@components'
import { Pagination } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { hm, t } from '@utils/fetch'
import Store from './store'

const title = 'Anitama'
const width = _.window.width - _.wind * 2
const height = width * 0.56
const heatmaps = {
  prev: 'Anitama.上一页',
  next: 'Anitama.下一页',
  search: 'Anitama.页码跳转'
}

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['discovery/anitama', 'Anitama']
})
@obc
class Anitama extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      heatmap: 'Anitama.右上角菜单',
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          t('Anitama.右上角菜单', {
            key
          })

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
  }

  onPress = id => {
    const url = `http://m.anitama.cn/article/${id}`
    t('Anitama.跳转', {
      to: 'WebBrowser',
      url
    })

    open(url)
    hm(url, title)
  }

  renderPaganation() {
    const { $ } = this.context
    const { ipt } = $.state
    return (
      <Pagination
        style={_.mt.md}
        input={ipt}
        heatmaps={heatmaps}
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
      return <View style={_.select(_.container.bg, _.container.plain)} />
    }

    return (
      <ScrollView
        style={_.select(_.container.bg, _.container.plain)}
        contentContainerStyle={_.container.bottom}
        scrollToTop
      >
        {show && (
          <>
            <View style={this.styles.container}>
              {$.anitamaTimeline.list.map((item, index) => (
                <Touchable
                  key={item.aid}
                  style={this.styles.item}
                  onPress={() => this.onPress(item.aid)}
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
                  <View style={this.styles.info}>
                    <Text size={18} type='title' bold>
                      {item.title}
                    </Text>
                    <Text style={_.mt.sm} lineHeight={18}>
                      {item.subtitle}
                    </Text>
                    {!!item.intro && (
                      <Text style={_.mt.md} type='sub' lineHeight={18}>
                        {item.intro}
                      </Text>
                    )}
                  </View>
                  {!index && <Heatmap id='Anitama.跳转' />}
                </Touchable>
              ))}
            </View>
            {this.renderPaganation()}
          </>
        )}
      </ScrollView>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: _.window.height
  },
  item: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind,
    paddingTop: 24,
    marginTop: _.lg,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  info: {
    paddingVertical: _.space
  }
}))
