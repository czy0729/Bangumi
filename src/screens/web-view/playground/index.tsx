/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 17:14:38
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, Flex, Header, Page, Text } from '@components'

const Playground = () => {
  return useObserver(() => (
    <Component id='screen-playground'>
      <Header title=' ' />
      <Page>
        <Flex justify='center'>
          <Text>Playground</Text>
        </Flex>
      </Page>
    </Component>
  ))
}

export default Playground
