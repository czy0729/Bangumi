/*
 * @Author: czy0729
 * @Date: 2023-07-13 07:17:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 05:25:33
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import Setting from '../component/setting'
import { Ctx } from '../types'
import { COMPONENT, HM } from './ds'

function Header() {
  const { $, navigation } = useStore<Ctx>()
  const length = $.state.list?.[$.state.type]?.length
  return (
    <HeaderV2
      title='猜你喜欢'
      hm={HM}
      headerRight={() => (
        <>
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
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
