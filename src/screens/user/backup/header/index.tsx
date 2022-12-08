/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:17:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-07 14:37:07
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { alert } from '@utils'
import { obc } from '@utils/decorators'

function Header() {
  return (
    <CompHeader
      title='本地备份'
      hm={['backup', 'Backup']}
      headerRight={() => (
        <IconTouchable
          name='md-info-outline'
          color={_.colorDesc}
          onPress={() => {
            alert('本地备份', '本地备份')
          }}
        />
      )}
    />
  )
}

export default obc(Header)
