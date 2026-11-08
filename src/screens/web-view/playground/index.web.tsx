/*
 * @Author: czy0729
 * @Date: 2022-07-07 07:57:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * web 端调试页: 打印 protobuf 数据的读取结果
 */
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, HeaderV2, Page, Text } from '@components'
import { _ } from '@stores'
import { get } from '@utils/thirdParty/protobuf'

/** protobuf 读取测试 */
function Playground() {
  useEffect(() => {
    get('bangumi-data')
  }, [])

  return (
    <Component id='screen-playground'>
      <Page>
        <Flex style={_.container.flex} justify='center'>
          <Text>Protobuf</Text>
        </Flex>
      </Page>
      <HeaderV2 title='Playground' />
    </Component>
  )
}

export default observer(Playground)
