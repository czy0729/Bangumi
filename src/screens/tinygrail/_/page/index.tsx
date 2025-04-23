/*
 * @Author: czy0729
 * @Date: 2025-04-20 16:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:04:12
 */
import React from 'react'
import { Page } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { Props } from './types'

function TinygrailPage({ loading, header = true, children }: Props) {
  const { $ } = useStore<any>()

  return useObserver(() => (
    <Page
      style={stl(_.container.tinygrail, header && _.container.header)}
      loaded={$?.state?._loaded}
      loadingColor={_.colorTinygrailText}
      loading={loading}
    >
      {children}
    </Page>
  ))
}

export default TinygrailPage
