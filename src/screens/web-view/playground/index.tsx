/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:22:15
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Button, Component, HeaderV2, Page } from '@components'
import { _ } from '@stores'
import { get, update } from '@utils/kv'

const Playground = () => {
  return useObserver(() => (
    <Component id='screen-playground'>
      <Page>
        <View style={[_.container.page, _.container.wind]}>
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
            style={_.mb.md}
            onPress={async () => {
              console.info(await get('advance'))
            }}
          >
            get
          </Button>
          <Button style={_.mb.md} onPress={() => {}}>
            bgs
          </Button>
        </View>
      </Page>
      <HeaderV2 title='Playground' />
    </Component>
  ))
}

export default Playground
