/*
 * @Author: czy0729
 * @Date: 2025-04-22 04:44:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 05:57:39
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import IconGo from '../icon-go'

import type { Props } from './types'

function Header({ title, alias, hm, go, headerRight }: Props) {
  const { $ } = useStore<any>()

  return (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      title={title}
      alias={alias}
      hm={hm}
      headerRight={headerRight || (go ? () => <IconGo $={$} /> : undefined)}
    />
  )
}

export default observer(Header)
