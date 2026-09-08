/*
 * @Author: czy0729
 * @Date: 2024-02-08 19:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:25:08
 */
import { observer } from 'mobx-react'
import { HeaderV2, HeaderV2Popover } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { open } from '@utils'
import { HTML_SINGLE_DOC } from '@constants'
import { TABS } from '../ds'
import { COMPONENT, HM } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)
  const { uri } = $.state

  return (
    <HeaderV2
      title='特色功能'
      hm={HM}
      headerRight={() => (
        <>
          <HeaderV2Popover
            name='md-menu'
            data={TABS.map(item => item.title)}
            onSelect={$.onSelect}
          />
          <IconTouchable
            style={_.ml.xs}
            name='md-open-in-new'
            color={_.colorTitle}
            size={18}
            onPress={() => {
              open(HTML_SINGLE_DOC(uri))
            }}
          />
        </>
      )}
    />
  )
}

export default observer(Header)
