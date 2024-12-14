/*
 * @Author: czy0729
 * @Date: 2022-11-24 15:39:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:36:20
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { HTML_SINGLE_DOC } from '@constants'
import { HM } from './ds'

function Header() {
  return (
    <HeaderV2
      title='Webhook'
      hm={HM}
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
