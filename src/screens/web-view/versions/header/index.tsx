/*
 * @Author: czy0729
 * @Date: 2024-02-07 15:06:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:32:52
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
      title='更新内容'
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
