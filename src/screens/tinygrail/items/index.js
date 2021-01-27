/*
 * @Author: czy0729
 * @Date: 2020-03-05 17:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:16:36
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Touchable, Flex, Image, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'
import { withHeaderParams } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import CharactersModal from './characters-modal'
import Store from './store'

const title = '我的道具'
const canUseItems = {
  混沌魔方: 100,
  虚空道标: 90,
  星光碎片: 80
}

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/items', 'TinygrailItems'],
  withHeaderParams
})
@obc
class TinygrailItems extends React.Component {
  static navigationOptions = {
    title
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  componentWillUnmount() {
    const { $ } = this.context
    $.onCloseModal()
  }

  renderList() {
    const { $ } = this.context
    const { list } = $.items
    return (
      <ScrollView
        style={_.container.flex}
        contentContainerStyle={_.container.bottom}
      >
        {list
          .sort(
            (a, b) => (canUseItems[b.name] || 0) - (canUseItems[a.name] || 0)
          )
          .map((item, index) => {
            if (canUseItems[item.name]) {
              return (
                <Touchable
                  key={item.id}
                  style={this.styles.item}
                  onPress={() => $.onShowModal(item.name)}
                >
                  <Flex
                    style={[
                      this.styles.wrap,
                      index !== 0 && !_.flat && this.styles.border
                    ]}
                  >
                    <Image
                      style={this.styles.image}
                      size={36}
                      src={tinygrailOSS(item.icon)}
                      radius
                    />
                    <Flex.Item style={_.ml.md}>
                      <Text type='tinygrailPlain' size={15} bold>
                        {item.name}
                      </Text>
                      <Text style={_.mt.xs} type='tinygrailText' size={10}>
                        {item.line}
                      </Text>
                    </Flex.Item>
                    <Flex style={_.ml.sm}>
                      <Text type='warning'>x{item.amount}</Text>
                      <Iconfont
                        style={_.ml.xs}
                        name='right'
                        size={15}
                        color={_.colorTinygrailText}
                      />
                    </Flex>
                  </Flex>
                </Touchable>
              )
            }

            return (
              <View key={item.id} style={this.styles.item}>
                <Flex
                  style={[
                    this.styles.wrap,
                    index !== 0 && !_.flat && this.styles.border
                  ]}
                >
                  <Image
                    style={this.styles.image}
                    size={36}
                    src={tinygrailOSS(item.icon)}
                    radius
                  />
                  <Flex.Item style={_.ml.md}>
                    <Text type='tinygrailPlain' bold>
                      {item.name}
                    </Text>
                    <Text style={_.mt.xs} type='tinygrailText' size={10}>
                      {item.line}
                    </Text>
                  </Flex.Item>
                  <Text style={_.ml.sm} type='warning'>
                    x{item.amount}
                  </Text>
                </Flex>
              </View>
            )
          })}
      </ScrollView>
    )
  }

  renderModal() {
    const { $ } = this.context
    const { title, visible } = $.state
    return <CharactersModal visible={visible} title={title} />
  }

  render() {
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        {this.renderList()}
        {this.renderModal()}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  item: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorTinygrailBorder,
    borderTopWidth: _.hairlineWidth
  },
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
