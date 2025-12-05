/*
 * @Author: czy0729
 * @Date: 2025-02-20 04:46:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 06:46:13
 */
import React from 'react'
import { HeaderV2 } from '@components'
import { IconTouchable } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header() {
  const { $ } = useStore<Ctx>()
  const { show, showStats } = $.state
  const itemProps = {
    style: _.mr.xs,
    size: 18,
    color: _.colorDesc
  } as const
  return (
    <HeaderV2
      title={$.headerInfo || '错误上报分析'}
      headerTitleAlign='left'
      headerRight={() => (
        <>
          {WEB && <IconTouchable {...itemProps} name='md-refresh' onPress={$.getData} />}
          <IconTouchable {...itemProps} name='md-insert-chart-outlined' onPress={$.getStatsQueue} />
          <IconTouchable
            {...itemProps}
            name='md-waterfall-chart'
            color={showStats ? _.colorMain : _.colorDesc}
            onPress={$.onToggleStats}
          />
          <IconTouchable
            {...itemProps}
            name={show ? 'md-close' : 'md-notes'}
            onPress={$.onToggleForm}
          />
        </>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
