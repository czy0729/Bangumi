/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 06:03:15
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Button, Component, HeaderV2, Page } from '@components'
import { _ } from '@stores'

const Playground = () => {
  return useObserver(() => (
    <Component id='screen-playground'>
      <Page>
        <View style={[_.container.page, _.container.wind]}>
          <Button
            style={_.mb.md}
            onPress={() => {
              console.info('clicked 1')
            }}
          >
            1
          </Button>
          <Button
            style={_.mb.md}
            onPress={() => {
              console.info('clicked 2')
            }}
          >
            2
          </Button>
          <Button
            style={_.mb.md}
            onPress={() => {
              console.info('clicked 3')
            }}
          >
            3
          </Button>
        </View>
      </Page>
      <HeaderV2 title='Playground' />
    </Component>
  ))
}

export default Playground
