/*
 * @Author: czy0729
 * @Date: 2024-10-11 23:21:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:25:58
 */
import React from 'react'
import { Flex, Loading, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import User from '../user'
import { COMPONENT } from './ds'

function ListHeader(_props, { $ }: Ctx) {
  const { list, _loaded } = $.collections
  return (
    <>
      <User />
      {!_loaded ? (
        <Flex
          style={{
            height: _.window.height / 2
          }}
          justify='center'
        >
          <Loading />
        </Flex>
      ) : (
        !list.length && (
          <Flex
            style={{
              height: _.window.height / 2
            }}
            justify='center'
          >
            <Text type='sub' size={12} bold>
              没有收藏
            </Text>
          </Flex>
        )
      )}
    </>
  )
}

export default obc(ListHeader, COMPONENT)
