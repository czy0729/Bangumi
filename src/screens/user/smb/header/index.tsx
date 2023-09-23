/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:03:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 05:04:20
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  return (
    <CompHeader
      title='本地管理'
      hm={['smb', 'Smb']}
      headerRight={() => (
        <IconTouchable
          name='md-add'
          color={_.colorTitle}
          size={24}
          onPress={$.onShow}
        />
      )}
    />
  )
}

export default obc(Header)
