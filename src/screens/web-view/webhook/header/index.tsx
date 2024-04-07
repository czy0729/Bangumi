/*
 * @Author: czy0729
 * @Date: 2022-11-24 15:39:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 17:18:46
 */
import React from 'react'
import { Header as HeaderComp } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { HTML_SINGLE_DOC } from '@constants'

function Header() {
  return (
    <HeaderComp
      title='Webhook'
      hm={['webhook', 'Webhook']}
      headerRight={() => (
        <IconTouchable
          name='md-open-in-new'
          size={20}
          color={_.colorDesc}
          onPress={() => {
            open(HTML_SINGLE_DOC('kfpfze0u7old4en1'))
          }}
        />
      )}
    />
  )
}

export default ob(Header)
