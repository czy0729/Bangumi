/*
 * @Author: czy0729
 * @Date: 2024-10-11 23:21:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 20:37:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Loading, Text } from '@components'
import { _, useStore } from '@stores'
import User from '../user'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ListHeader() {
  const { $ } = useStore<Ctx>(COMPONENT)

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
              {!$.userId ? '当前没有选择用户，可点击右上方设置按钮输入用户 ID' : '没有收藏'}
            </Text>
          </Flex>
        )
      )}
    </>
  )
}

export default observer(ListHeader)
