/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 17:14:38
 */
import React from 'react'
import { useObserver } from 'mobx-react'
// import { Image } from 'expo-image'
import { Component, Flex, Header, Page } from '@components'

const Playground = () => {
  return useObserver(() => (
    <Component id='screen-playground'>
      <Header title=' ' />
      <Page>
        <Flex justify='center'>
          {/* <Image
            style={{
              width: 300,
              height: 300
            }}
            source='https://p.sda1.dev/15/050132c6c9521d02f371e2b332b2c0d0/fight.webp'
          /> */}
        </Flex>
      </Page>
    </Component>
  ))
}

export default Playground
