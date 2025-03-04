/*
 * @Author: czy0729
 * @Date: 2019-09-01 00:34:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 19:33:50
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Component, Flex, ScrollView, Touchable } from '@components'
import { SafeAreaView, StatusBarPlaceholder } from '@_'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Bar from './bar'
import DepthList from './depth-list'
import DepthMap from './depth-map'
import Header from './header'
import { useTinygrailTradePage } from './hooks'
import KLine from './k-line'
import { memoStyles } from './styles'

/** K 线 */
const TinygrailTrade = (props: NavigationProps) => {
  const { id, $, navigation, showMask, isFocused, handleHideMask, handleNavigate } =
    useTinygrailTradePage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-tinygrail-trade'>
        <StoreContext.Provider value={id}>
          <SafeAreaView style={styles.dark}>
            <StatusBarPlaceholder style={styles.dark} />
            <Header goBack={navigation.goBack} />
            <Bar />
            <View style={_.container.flex}>
              <ScrollView
                style={[_.container.flex, styles.dark]}
                contentContainerStyle={styles.contentContainerStyle}
                scrollToTop
              >
                <View style={styles.kline}>
                  <KLine $={$} navigation={navigation} focus={isFocused} />
                  {showMask && <Touchable style={styles.mask} useRN onPress={handleHideMask} />}
                </View>
                <DepthMap />
                <DepthList style={_.mt.md} />
              </ScrollView>
              <Flex style={styles.fixed}>
                <Flex.Item>
                  <Button style={styles.btnBid} type='main' onPress={() => handleNavigate('bid')}>
                    买入
                  </Button>
                </Flex.Item>
                <Flex.Item style={_.ml.sm}>
                  <Button style={styles.btnAsk} type='main' onPress={() => handleNavigate('ask')}>
                    卖出
                  </Button>
                </Flex.Item>
              </Flex>
            </View>
          </SafeAreaView>
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailTrade
