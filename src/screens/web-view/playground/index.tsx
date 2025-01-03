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
import { useMount } from '@utils/hooks'
import { get, lx, update } from '@utils/kv'

const Playground = () => {
  useMount(async () => {
    const data = await lx(`ある時、最古の神竜が人間に討たれた。
悠久の時を生き、神々すらひれ伏す絶大な力を持つその竜は、孤独と共に己の死を受け入れた。
しかし、次に気がついた時、竜は辺境の村人ドランとして第二の生を受けていた。`)
    console.log(data)
  })

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
