/*
 * @Author: czy0729
 * @Date: 2020-03-05 17:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 16:36:06
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Header, Page, Touchable, Flex, Image, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils'
import { inject, obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import StatusBarEvents from '@tinygrail/_/status-bar-events'
import CharactersModal, { ITEMS_USED } from '@tinygrail/_/characters-modal'
import { ITEMS_DESC } from '@tinygrail/_/ds'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

class TinygrailItems extends React.Component {
  componentDidMount() {
    const { $ }: Ctx = this.context
    $.init()
  }

  componentWillUnmount() {
    const { $ }: Ctx = this.context
    $.onCloseModal()
  }

  renderList() {
    const { $ }: Ctx = this.context
    const { list } = $.items
    return (
      <ScrollView
        style={_.container.flex}
        contentContainerStyle={_.container.bottom}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {list
          .sort((a, b) => (ITEMS_USED[b.name] || 0) - (ITEMS_USED[a.name] || 0))
          .map(item => {
            if (ITEMS_USED[item.name]) {
              return (
                <Touchable
                  key={item.id}
                  style={this.styles.item}
                  onPress={() => $.onShowModal(item.name)}
                >
                  <Flex style={this.styles.wrap} align='start'>
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
                        {ITEMS_DESC[item.name] || item.line}
                      </Text>
                    </Flex.Item>
                    <Flex style={_.ml.sm}>
                      <Text type='warning'>x{item.amount}</Text>
                      <Iconfont
                        style={_.mr._sm}
                        name='md-navigate-next'
                        color={_.colorTinygrailText}
                      />
                    </Flex>
                  </Flex>
                </Touchable>
              )
            }

            return (
              <View key={item.id} style={this.styles.item}>
                <Flex style={this.styles.wrap} align='start'>
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
                      {ITEMS_DESC[item.name] || item.line}
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
    const { $ }: Ctx = this.context
    const { title, visible } = $.state
    return (
      <CharactersModal
        visible={visible}
        title={title}
        onClose={$.onCloseModal}
        onSubmit={$.doUse}
      />
    )
  }

  render() {
    return (
      <>
        <StatusBarEvents />
        <Header
          title='我的道具'
          hm={['tinygrail/items', 'TinygrailItems']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
        />
        <Page style={this.styles.container}>
          {this.renderList()}
          {this.renderModal()}
        </Page>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default inject(Store)(obc(TinygrailItems))
