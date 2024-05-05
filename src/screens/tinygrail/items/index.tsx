/*
 * @Author: czy0729
 * @Date: 2020-03-05 17:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:21:57
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Header, Iconfont, Image, Page, Text, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, tinygrailOSS } from '@utils'
import { inject, obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import CharactersModal, { ITEMS_USED } from '@tinygrail/_/characters-modal'
import { ITEMS_DESC } from '@tinygrail/_/ds'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

/** 我的道具 */
class TinygrailItems extends React.Component {
  componentDidMount() {
    const { $ } = this.context as Ctx
    $.init()
  }

  componentWillUnmount() {
    const { $ } = this.context as Ctx
    $.onCloseModal()
  }

  renderList() {
    const { $ } = this.context as Ctx
    const { list } = $.items
    return (
      <ScrollView
        style={_.container.flex}
        contentContainerStyle={_.container.bottom}
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {list
          .slice()
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
                      size={36}
                      src={tinygrailOSS(item.icon)}
                      radius
                      skeletonType='tinygrail'
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
                      <Text type='warning'>x{formatNumber(item.amount, 0)}</Text>
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
                  <Image size={36} src={tinygrailOSS(item.icon)} radius skeletonType='tinygrail' />
                  <Flex.Item style={_.ml.md}>
                    <Text type='tinygrailPlain' bold>
                      {item.name}
                    </Text>
                    <Text style={_.mt.xs} type='tinygrailText' size={10}>
                      {ITEMS_DESC[item.name] || item.line}
                    </Text>
                  </Flex.Item>
                  <Text style={_.ml.sm} type='warning'>
                    x{formatNumber(item.amount, 0)}
                  </Text>
                </Flex>
              </View>
            )
          })}
      </ScrollView>
    )
  }

  renderModal() {
    const { $ } = this.context as Ctx
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
        <Header
          title='我的道具'
          hm={['tinygrail/items', 'TinygrailItems']}
          statusBarEvents={false}
          statusBarEventsType='Tinygrail'
        />
        <Page style={_.container.tinygrail}>
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
