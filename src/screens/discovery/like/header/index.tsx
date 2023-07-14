/*
 * @Author: czy0729
 * @Date: 2023-07-13 07:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 07:30:21
 */
import React from 'react'
import { Header as CompHeader, Flex } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Setting from '../setting'
import { Ctx } from '../types'

function Header(props, { $, navigation }: Ctx) {
  const { type, list } = $.state
  return (
    <CompHeader
      title='猜你喜欢'
      hm={['like', 'Like']}
      headerRight={() => (
        <Flex>
          <Setting length={list[type]?.length} />
          <IconTouchable
            style={_.ml.xs}
            name='md-info-outline'
            color={_.colorDesc}
            onPress={() => {
              navigation.push('Tips', {
                key: 'hyrzz32whgurgg6t'
              })
            }}
          />
        </Flex>
      )}
    />
  )
}

export default obc(Header)
