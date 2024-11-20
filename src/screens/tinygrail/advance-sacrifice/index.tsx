/*
 * @Author: czy0729
 * @Date: 2020-01-25 20:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 05:10:12
 */
import React from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, StoreContext } from '@stores'
import { inject, ob, withHeader } from '@utils/decorators'
import { NavigationProps } from '@types'
import { withHeaderParams } from '../styles'
import { useTinygrailAdvanceSacrificePage } from './hooks'
import List from './list'
import Store from './store'

const title = '献祭推荐'

/** 献祭推荐 */
const TinygrailAdvanceSacrifice = (props: NavigationProps) => {
  const { id } = useTinygrailAdvanceSacrificePage(props)

  return (
    <Component id='screen-tinygrail-advance-sacrifice'>
      <StoreContext.Provider value={id}>
        <View style={_.container.tinygrail}>
          <List />
        </View>
      </StoreContext.Provider>
    </Component>
  )
}

export default inject(Store)(
  withHeader({
    screen: title,
    hm: ['tinygrail/advance-sacrifice', 'TinygrailAdvanceSacrifice'],
    withHeaderParams
  })(ob(TinygrailAdvanceSacrifice))
)
