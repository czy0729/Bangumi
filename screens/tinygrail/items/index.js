/*
 * @Author: czy0729
 * @Date: 2020-03-05 17:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-20 18:25:29
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { Popover } from '@screens/_'
import { inject, withHeader } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'
import { headerStyle } from '../styles'
import StatusBarEvents from '../_/status-bar-events'
import Store from './store'

const title = '我的道具'

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['tinygrail/items', 'TinygrailItems'],
  ...headerStyle
})
@observer
class TinygrailItems extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()
  }

  render() {
    const { $ } = this.context
    const { list } = $.items
    return (
      <View style={this.styles.container}>
        <StatusBarEvents />
        <ScrollView
          style={_.container.flex}
          contentContainerStyle={_.container.bottom}
        >
          {list
            .sort(
              (a, b) =>
                (b.name === '混沌魔方' ? 1 : 0) -
                (a.name === '混沌魔方' ? 1 : 0)
            )
            .map((item, index) => {
              if (item.name === '混沌魔方') {
                return (
                  <View key={item.id} style={this.styles.item}>
                    <Flex
                      style={[
                        this.styles.wrap,
                        index !== 0 && this.styles.border
                      ]}
                    >
                      <Image
                        style={this.styles.image}
                        size={44}
                        src={tinygrailOSS(item.icon)}
                        radius
                      />
                      <Flex.Item style={_.ml.md}>
                        <Text type='tinygrailPlain' size={15}>
                          {item.name}
                        </Text>
                        <Text style={_.mt.xs} type='tinygrailText' size={12}>
                          {item.line}
                        </Text>
                      </Flex.Item>
                      <Popover
                        style={_.ml.sm}
                        data={[
                          '消耗10点塔值使用',
                          ...$.templeDS.map(item => item.label)
                        ]}
                        onSelect={$.doUse}
                      >
                        <Flex>
                          <Text size={15} type='warning'>
                            x{item.amount}
                          </Text>
                          <Iconfont
                            style={_.ml.sm}
                            name='right'
                            size={16}
                            color={_.colorTinygrailText}
                          />
                        </Flex>
                      </Popover>
                    </Flex>
                  </View>
                )
              }

              return (
                <View key={item.id} style={this.styles.item}>
                  <Flex
                    style={[
                      this.styles.wrap,
                      index !== 0 && this.styles.border
                    ]}
                  >
                    <Image
                      style={this.styles.image}
                      size={40}
                      src={tinygrailOSS(item.icon)}
                      radius
                    />
                    <Flex.Item style={_.ml.md}>
                      <Text type='tinygrailPlain' size={15}>
                        {item.name}
                      </Text>
                      <Text style={_.mt.xs} type='tinygrailText' size={12}>
                        {item.line}
                      </Text>
                    </Flex.Item>
                    <Text style={_.ml.sm} size={15} type='warning'>
                      x{item.amount}
                    </Text>
                  </Flex>
                </View>
              )
            })}
        </ScrollView>
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
