/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 13:49:31
 */
import React from 'react'
import { Flex } from '@components'
import { Header as CompHeader } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import IconGroup from './icon/group'
import IconMore from './icon/more'

function Header() {
  return (
    <CompHeader
      renderLeft={<IconGroup />}
      renderRight={
        <Flex>
          <IconMore style={_.ml.sm} />
        </Flex>
      }
    />
  )
}

export default obc(Header)
