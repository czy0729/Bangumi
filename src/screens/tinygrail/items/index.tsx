/*
 * @Author: czy0729
 * @Date: 2020-03-05 17:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 13:33:35
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Component, Flex, HeaderV2, Iconfont, Image, Page, Text, Touchable } from '@components'
import { _, StoreContext } from '@stores'
import { formatNumber, tinygrailOSS } from '@utils'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import CharactersModal, { ITEMS_USED } from '@tinygrail/_/characters-modal'
import { ITEMS_DESC } from '@tinygrail/_/ds'
import { NavigationProps } from '@types'
import { useTinygrailItemsPage } from './hooks'
import { HM } from './ds'
import { memoStyles } from './styles'

/** 我的道具 */
const TinygrailItems = (props: NavigationProps) => {
  const { id, $ } = useTinygrailItemsPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    const { list } = $.items
    return (
      <Component id='screen-tinygrail-items'>
        <StoreContext.Provider value={id}>
          <Page style={_.container.tinygrail}>
            <ScrollView contentContainerStyle={_.container.page} {...SCROLL_VIEW_RESET_PROPS}>
              {list
                .slice()
                .sort((a, b) => (ITEMS_USED[b.name] || 0) - (ITEMS_USED[a.name] || 0))
                .map(item => {
                  if (ITEMS_USED[item.name]) {
                    return (
                      <Touchable
                        key={item.id}
                        style={styles.item}
                        onPress={() => $.onShowModal(item.name)}
                      >
                        <Flex style={styles.wrap} align='start'>
                          <Image
                            style={styles.image}
                            size={36}
                            src={tinygrailOSS(item.icon)}
                            radius
                            skeleton={false}
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
                    <View key={item.id} style={styles.item}>
                      <Flex style={styles.wrap} align='start'>
                        <Image
                          style={styles.image}
                          size={36}
                          src={tinygrailOSS(item.icon)}
                          radius
                          skeleton={false}
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
                          x{formatNumber(item.amount, 0)}
                        </Text>
                      </Flex>
                    </View>
                  )
                })}
            </ScrollView>
            <CharactersModal
              visible={$.state.visible}
              title={$.state.title}
              onClose={$.onCloseModal}
              onSubmit={$.doUse}
            />
          </Page>
          <HeaderV2 backgroundStyle={_.container.tinygrail} title='我的道具' hm={HM} />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailItems
