/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-21 22:37:32
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { createClient, AuthType } from 'webdav'
import { Page, Header, Flex, Text } from '@components'
import { useMount } from '@utils/hooks'

const url = ''
const username = ''
const password = ''

async function webDAV() {
  const client = createClient(url, {
    authType: AuthType.Password,
    username,
    password
  })
  try {
    console.log('getDirectoryContents')
    const items = await client.getDirectoryContents('/')
    console.log(items)
    return [true, null]
  } catch (err) {
    console.log(err)
    return [false, `WebDAV connection failed: ${err.message}`]
  }
}

const Playground = () => {
  useMount(() => {
    webDAV()
  })

  return useObserver(() => (
    <>
      <Header title=' ' />
      <Page>
        <Flex
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
