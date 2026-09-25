/*
 * @Author: czy0729
 * @Date: 2022-09-07 15:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:58:32
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { COMPONENT, HM, getInfoTexts } from './ds'

import type { Ctx } from '../types'

function Header() {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { list } = $.state
  const handleHeaderRight = useCallback(
    () => (
      <>
        <IconTouchable
          style={_.mr.sm}
          name={list ? 'md-insert-chart-outlined' : 'md-sort'}
          color={_.colorTitle}
          onPress={$.onToggle}
        />
        <IconTouchable
          name='md-info-outline'
          size={21}
          color={_.colorTitle}
          onPress={() => {
            navigation.push('Information', {
              title: '支持者',
              message: getInfoTexts()
            })

            t('赞助者.提示')
          }}
        />
      </>
    ),
    [list, navigation, $]
  )

  return <HeaderV2 title='支持者' hm={HM} headerRight={handleHeaderRight} />
}

export default observer(Header)
