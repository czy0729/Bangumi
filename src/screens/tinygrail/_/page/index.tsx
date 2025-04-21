/*
 * @Author: czy0729
 * @Date: 2025-04-20 16:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:16:40
 */
import React from 'react'
import { Page } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'

function TinygrailPage({ children }) {
  const { $ } = useStore<any>()

  return useObserver(() => (
    <Page
      style={[_.container.tinygrail, _.container.header]}
      loaded={$?.state?.loaded}
      loadingColor={_.colorTinygrailText}
    >
      {children}
    </Page>
  ))
}

export default TinygrailPage
