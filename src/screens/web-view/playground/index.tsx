/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-25 16:53:47
 */
import React from 'react'
import { Page, Header, Text, Button } from '@components'

const Playground = () => {
  return (
    <>
      <Header title='Playground' />
      <Page>
        <Text>Calendar Module Example</Text>
        <Button onPress={createEvent}>Create a new calendar</Button>
      </Page>
    </>
  )
}

export default Playground

async function createEvent() {}
