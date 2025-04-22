/*
 * @Author: czy0729
 * @Date: 2025-04-22 04:44:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:48:32
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import IconGo from '../icon-go'
import { Props } from './types'

function Header({ title, hm, go }: Props) {
  const { $ } = useStore<any>()

  return useObserver(() => (
    <HeaderV2
      backgroundStyle={_.container.tinygrail}
      title={title}
      hm={hm}
      headerRight={go ? () => <IconGo $={$} /> : undefined}
    />
  ))
}

export default Header
