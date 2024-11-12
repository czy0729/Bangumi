/*
 * @Author: czy0729
 * @Date: 2023-07-13 07:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-12 11:24:52
 */
import React from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Setting from '../component/setting'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header(_props, { $, navigation }: Ctx) {
  const length = $.state.list[$.state.type]?.length
  return (
    <HeaderComp
      title='猜你喜欢'
      hm={['like', 'Like']}
      headerRight={() => (
        <Flex>
          <Setting length={length} />
          <IconTouchable
            style={_.ml.xs}
            name='md-info-outline'
            color={_.colorDesc}
            size={20}
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

export default obc(Header, COMPONENT)
