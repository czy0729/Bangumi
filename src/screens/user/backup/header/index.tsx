/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:17:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-13 16:01:06
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
            alert(
              '条目地址和封面地址为可选导出项，因为这些值长度较长，对于部分有大量收藏记录的用户来说，很可能导致内存溢出导出失败，请自行尝试'
            )
          }}
        />
      )}
    />
  )
}

export default obc(Header)
