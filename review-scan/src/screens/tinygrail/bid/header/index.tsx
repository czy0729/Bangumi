/*
 * @Author: czy0729
 * @Date: 2025-01-16 16:21:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 16:26:28
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      title='我的委托'
      hm={$.hm}
      headerRight={() => (
        <IconTouchable
          style={_.mr.xxs}
          name='md-cancel-presentation'
          color={_.colorTinygrailPlain}
          onPress={() => {
            confirm(
              `确定取消 (${$.canCancelCount}) 个 (${$.currentTitle})?`,
              () => $.onBatchCancel(),
              '小圣杯助手'
            )
          }}
        />
      )}
    />
  )
}

export default ob(Header, COMPONENT)
