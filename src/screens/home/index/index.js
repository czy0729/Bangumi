/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-04 17:24:31
 */
import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, Text } from '@/src/components'
import { NavigationBarEvents, IconTabBar } from '@screens/_'
import { inject } from '@/src/utils/hoc'
import Store from './store'

function Home(props, { $, navigation }) {
  return (
    <>
      <NavigationBarEvents />
      <SafeAreaView
        forceInset={{
          top: 'always',
          bottom: 'always'
        }}
      >
        <Text>123123123123</Text>
      </SafeAreaView>
    </>
  )
}

Home.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => <IconTabBar name='star' color={tintColor} />,
  tabBarLabel: '进度'
}

Home.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default inject(Store)(Home)
