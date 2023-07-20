/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-19 17:57:44
 */
import React from 'react'
import { useObserver } from 'mobx-react-lite'
import { Page, Header, Flex, Text } from '@components'

const Playground = () => {
  return useObserver(() => (
    <>
      <Header title=' ' />
      <Page>
        <Flex
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1
          }}
          justify='center'
        >
          <Text>Bangumi番组计划</Text>
        </Flex>
      </Page>
    </>
  ))
}

export default Playground
