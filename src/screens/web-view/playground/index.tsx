/* eslint-disable max-len */
/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:28:46
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Page, Header, Component, Squircle, Flex, Image } from '@components'

const Playground = () => {
  return useObserver(() => (
    <Component id='screen-playground'>
      <Header title=' ' />
      <Page>
        <Flex justify='center'>
          <Squircle width={343} height={472} radius={24}>
            <Image
              src='https://lain.bgm.tv/r/400/pic/cover/l/84/aa/432729_24kX7.jpg'
              width={343}
              height={472}
              onPress={() => {}}
            />
          </Squircle>
        </Flex>
      </Page>
    </Component>
  ))
}

export default Playground
