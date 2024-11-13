/*
 * @Author: czy0729
 * @Date: 2023-07-13 07:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 08:12:42
 */
import React from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { WEB } from '@constants'
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
          {WEB && !!$.userId && (
            <IconTouchable
              style={_.mr.xs}
              name='md-refresh'
              color={_.colorDesc}
              size={22}
              onPress={$.onHeaderRefresh}
            />
          )}
          <Setting navigation={navigation} length={length} />
        </Flex>
      )}
    />
  )
}

export default obc(Header, COMPONENT)
