/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-08 07:58:47
 */
import React, { useEffect } from 'react'
import { useObserver } from 'mobx-react'
import { Page, Header, Flex, Component, Text } from '@components'
import { get } from '@utils/protobuf'

const Playground = () => {
  useEffect(() => {
    get('bangumi-data')
  }, [])

  return useObserver(() => (
    <Component id='screen-playground'>
      <Header title=' ' />
      <Page>
        <Flex
          style={{
            flex: 1
          }}
          justify='center'
        >
          <Text>Protobuf</Text>
        </Flex>
      </Page>
    </Component>
  ))
}

export default Playground
