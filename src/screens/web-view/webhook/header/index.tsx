/*
 * @Author: czy0729
 * @Date: 2022-11-24 15:39:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 20:23:59
 */
import React from 'react'
import { Header as CompHeader } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'

function Header() {
  return (
    <CompHeader
      title='Webhook'
      hm={['webhook', 'Webhook']}
      headerRight={() => (
        <IconTouchable
          name='md-open-in-new'
          size={20}
          color={_.colorDesc}
          onPress={() => {
            open(
              'https://www.yuque.com/chenzhenyu-k0epm/znygb4/kfpfze0u7old4en1?singleDoc'
            )
          }}
        />
      )}
    />
  )
}

export default ob(Header)
