/*
 * @Author: czy0729
 * @Date: 2020-07-03 15:08:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 10:29:34
 */
import React from 'react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _, tinygrailStore } from '@stores'
import { feedback, queue, tinygrailOSS } from '@utils'
import { useObserver } from '@utils/hooks'
import TinygrailStatus from '../../../status'

function Item({ id = 0, src, name, level, change, type, onPress }) {
  return useObserver(() => (
    <Flex>
      <Avatar
        key={tinygrailOSS(src)}
        src={tinygrailOSS(src)}
        size={32}
        name={name}
        borderColor='transparent'
        skeletonType='tinygrail'
        onPress={onPress}
      />
      <Flex.Item style={_.ml.sm}>
        <Text type='tinygrailPlain' size={10} bold numberOfLines={1}>
          <Text type='ask' size={10} bold>
            lv{level}{' '}
          </Text>
          {name}
        </Text>
        <Flex style={_.mt.xs}>
          <Text type={type} size={9}>
            {change}
          </Text>
          {!!id && !!tinygrailStore.asksMap[id] && (
            <Touchable
              style={_.ml.xs}
              onPress={async () => {
                const data = await tinygrailStore.fetchUserLogs(id)
                if (data?.asks?.length) {
                  await queue(
                    data.asks.map(
                      item => () =>
                        tinygrailStore.doCancelAsk({
                          id: item.id
                        })
                    )
                  )
                  feedback()
                  tinygrailStore.fetchAsks()
                }
              }}
            >
              <Text type='tinygrailText' size={9}>
                [取消挂单]
              </Text>
            </Touchable>
          )}
        </Flex>
      </Flex.Item>
      {!!id && <TinygrailStatus style={_.mr.sm} id={id} />}
    </Flex>
  ))
}

export default Item
