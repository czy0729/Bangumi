/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 17:54:17
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Button, Component, Header, Page } from '@components'
import { _ } from '@stores'
import { get, update } from '@utils/kv'

const Playground = () => {
  return useObserver(() => (
    <Component id='screen-playground'>
      <Header title='Playground' />
      <Page>
        <View style={_.container.outer}>
          <Button
            style={_.mb.md}
            onPress={() => {
              update('advance', {
                magma: 'a|30'
              })
            }}
          >
            update
          </Button>
          <Button
            onPress={async () => {
              console.info(await get('advance'))
            }}
          >
            get
          </Button>
        </View>
      </Page>
    </Component>
  ))
}

export default Playground
