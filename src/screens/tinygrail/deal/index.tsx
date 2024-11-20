/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 10:59:25
 */
import React from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { Component, Flex, Page } from '@components'
import { StatusBarPlaceholder } from '@_'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { refreshControlProps } from '@tinygrail/styles'
import { NavigationProps } from '@types'
import Depth from './depth'
import Form from './form'
import Header from './header'
import { useTinygrailDealPage } from './hooks'
import Logs from './logs'
import Records from './records'
import { memoStyles } from './styles'

/** 交易 */
const TinygrailDeal = (props: NavigationProps) => {
  const { id, refreshing, handleRefresh } = useTinygrailDealPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-tinygrail-deal'>
        <StoreContext.Provider value={id}>
          <Page style={[_.container.flex, styles.dark]}>
            <StatusBarPlaceholder style={styles.dark} />
            <Header />
            <ScrollView
              style={[_.container.flex, styles.dark]}
              refreshControl={
                <RefreshControl
                  {...refreshControlProps}
                  progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
                  colors={[_.colorMain]}
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              {...SCROLL_VIEW_RESET_PROPS}
            >
              <Flex style={styles.form} align='start'>
                <Flex.Item>
                  <Form />
                </Flex.Item>
                <View style={styles.depth}>
                  <Depth />
                </View>
              </Flex>
              <Logs />
              <Records />
            </ScrollView>
          </Page>
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailDeal
