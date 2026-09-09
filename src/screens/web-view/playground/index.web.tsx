/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-08 07:58:47
 */
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, HeaderV2, Page, Text } from '@components'
import { get } from '@utils/thirdParty/protobuf'

function Playground() {
  useEffect(() => {
    get('bangumi-data')
  }, [])

  return (
    <Component id='screen-playground'>
      <HeaderV2 title=' ' />
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
  )
}

export default observer(Playground)
