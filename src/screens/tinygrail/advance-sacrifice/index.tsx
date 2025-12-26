/*
 * @Author: czy0729
 * @Date: 2020-01-25 20:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:22:03
 */
import React from 'react'
import { Component } from '@components'
import { IconHeader } from '@_'
import { _, StoreContext } from '@stores'
import { alert } from '@utils'
import { t } from '@utils/fetch'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import { useTinygrailAdvanceSacrificePage } from './hooks'
import List from './list'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 献祭推荐 */
const TinygrailAdvanceSacrifice = (props: NavigationProps) => {
  const { id } = useTinygrailAdvanceSacrificePage(props)

  return (
    <Component id='screen-tinygrail-advance-sacrifice'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <List />
        </TinygrailPage>
        <TinygrailHeader
          title='献祭推荐'
          hm={HM}
          headerRight={() => (
            <IconHeader
              style={_.mr._right}
              name='md-info-outline'
              color={_.colorTinygrailPlain}
              onPress={() => {
                t('献祭推荐.提示')

                alert('从持仓列表里面查找\n圣殿股息 - 流动股息 = 分数', '当前计算方式')
              }}
            />
          )}
        />
      </StoreContext.Provider>
    </Component>
  )
}

export default TinygrailAdvanceSacrifice
