/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:03:17
 */
import React from 'react'
import { Component, Flex, Header, Page, Text } from '@components'
import { IconTouchable } from '@_'
import { _, StoreContext } from '@stores'
import { confirm } from '@utils'
import { useObserver } from '@utils/hooks'
import Tabs from '@tinygrail/_/tabs-v2'
import ToolBar from '@tinygrail/_/tool-bar'
import { NavigationProps } from '@types'
import { useTinygrailBidPage } from './hooks'
import List from './list'
import { sortDS, tabs } from './ds'
import { styles } from './styles'

/** 我的委托 */
const TinygrailBid = (props: NavigationProps) => {
  const { id, $ } = useTinygrailBidPage(props)

  return useObserver(() => {
    const { type = 'bid' } = $.params
    const getCount = (route: { key: string }) => {
      switch (route.key) {
        case 'bid':
        case 'asks':
          return $.list(route.key)?.list?.length || 0

        case 'auction':
          return $.list(route.key)?.list.filter(item => item.state === 0).length || 0

        default:
          return 0
      }
    }

    return (
      <Component id='screen-tinygrail-bid'>
        <StoreContext.Provider value={id}>
          <Header
            title='我的委托'
            hm={[`tinygrail/${type}`, 'TinygrailBid']}
            statusBarEvents={false}
            statusBarEventsType='Tinygrail'
            headerRight={() => (
              <IconTouchable
                name='md-cancel-presentation'
                color={_.colorTinygrailPlain}
                onPress={() => {
                  confirm(
                    `确定取消 (${$.canCancelCount}) 个 (${$.currentTitle})?`,
                    () => $.onBatchCancel(),
                    '小圣杯助手'
                  )
                }}
              />
            )}
          />
          <Page
            style={_.container.tinygrail}
            loaded={$.state._loaded}
            loadingColor={_.colorTinygrailText}
          >
            <Tabs
              routes={tabs}
              renderContentHeaderComponent={
                <ToolBar
                  data={sortDS}
                  level={$.state.level}
                  levelMap={$.levelMap}
                  sort={$.state.sort}
                  direction={$.state.direction}
                  onLevelSelect={$.onLevelSelect}
                  onSortPress={$.onSortPress}
                />
              }
              renderItem={item => <List key={item.key} id={item.key} />}
              renderLabel={({ route, focused }) => (
                <Flex style={styles.labelText} justify='center'>
                  <Text type='tinygrailPlain' size={13} bold={focused}>
                    {route.title}
                  </Text>
                  {!!getCount(route) && (
                    <Text type='tinygrailText' size={11} bold lineHeight={13}>
                      {' '}
                      {getCount(route)}{' '}
                    </Text>
                  )}
                </Flex>
              )}
            />
          </Page>
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailBid
