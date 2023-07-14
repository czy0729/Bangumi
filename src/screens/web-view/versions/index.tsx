/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-13 12:10:53
 */
import React from 'react'
import { Page, Header } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Tabs from './tabs'
import Store from './store'
import { TABS } from './ds'
import { Ctx } from './types'

const Versions = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    return (
      <>
        <Header
          title='更新内容'
          hm={['versions', 'Versions']}
          headerRight={() => (
            <IconTouchable
              style={_.ml.xs}
              name='md-open-in-new'
              color={_.colorTitle}
              size={18}
              onPress={() => {
                const { page } = $.state
                open(
                  `https://www.yuque.com/chenzhenyu-k0epm/znygb4/${TABS[page].key}?singleDoc`
                )
              }}
            />
          )}
        />
        <Page>{!!$.state._loaded && <Tabs routes={TABS} />}</Page>
      </>
    )
  })
}

export default ic(Store, Versions)
