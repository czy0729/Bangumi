/*
 * @Author: czy0729
 * @Date: 2024-03-29 10:25:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { useStore } from '@stores'
import { getOnAirItem } from '@utils'
import { COMPONENT } from './ds'

import type { ReactNode } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Desc({ style, subjectId, sites, size = 11, filterToShow = false }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (filterToShow && !($.state.adapt || $.state.origin || $.state.tag)) return null

  const els: ReactNode[] = []
  const extra: string[] = []
  const baseTextProps = {
    size,
    lineHeight: size + 1,
    bold: true
  } as const

  if (sites?.b) extra.push('bilibili')
  if (!sites?.b && sites?.bhmt) extra.push('bilibili 港澳台')
  // if (sites?.i) extra.push('爱奇艺')
  // if (sites?.q) extra.push('腾讯视频')
  if (extra.length) {
    els.push(
      <Text {...baseTextProps} type='sub'>
        {extra.join(' / ')}
      </Text>
    )
  }

  const { type: adapt = '', tag = '', origin = '' } = getOnAirItem(subjectId)
  if (adapt) {
    els.push(
      <Text {...baseTextProps} type={$.state.adapt === adapt ? 'main' : 'sub'}>
        {adapt}
      </Text>
    )
  }

  if (tag) {
    els.push(
      ...tag.split('/').map(item => (
        <Text {...baseTextProps} type={$.state.tag === item ? 'main' : 'sub'}>
          {item}
        </Text>
      ))
    )
  }

  if (origin) {
    els.push(
      ...origin.split('/').map(item => (
        <Text {...baseTextProps} type={$.state.origin === item ? 'main' : 'sub'}>
          {item}
        </Text>
      ))
    )
  }

  if (!els.length) return null

  return (
    <Text style={style} size={size} lineHeight={size + 1}>
      {els.map((item, index) => (
        <React.Fragment key={index}>
          {!!index && (
            <Text {...baseTextProps} type='sub'>
              {' '}
              /{' '}
            </Text>
          )}
          {item}
        </React.Fragment>
      ))}
    </Text>
  )
}

export default observer(Desc)
