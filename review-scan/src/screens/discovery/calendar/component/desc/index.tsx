/*
 * @Author: czy0729
 * @Date: 2024-03-29 10:25:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 01:19:05
 */
import React from 'react'
import { Text } from '@components'
import { useStore } from '@stores'
import { getOnAirItem } from '@utils'
import { ob } from '@utils/decorators'
import { ReactNode } from '@types'
import { Ctx } from '../../types'
import { Props } from './type'
import { COMPONENT } from './ds'

function Desc({ style, subjectId, sites, size = 11, filterToShow = false }: Props) {
  const { $ } = useStore<Ctx>()
  if (filterToShow && !($.state.adapt || $.state.origin || $.state.tag)) return null

  const els: ReactNode[] = []
  const extra: string[] = []
  if (sites?.b) extra.push('bilibili')
  if (!sites?.b && sites?.bhmt) extra.push('bilibili 港澳台')
  if (sites?.i) extra.push('爱奇艺')
  if (sites?.q) extra.push('腾讯视频')
  if (extra.length) {
    els.push(
      <Text type='sub' size={size} lineHeight={size + 1} bold>
        {extra.join(' / ')}
      </Text>
    )
  }

  const { type: adapt = '', tag = '', origin = '' } = getOnAirItem(subjectId)
  if (adapt) {
    els.push(
      <Text type={$.state.adapt === adapt ? 'main' : 'sub'} size={size} lineHeight={size + 1} bold>
        {adapt}
      </Text>
    )
  }

  if (tag) {
    els.push(
      ...tag.split('/').map(item => (
        <Text type={$.state.tag === item ? 'main' : 'sub'} size={size} lineHeight={size + 1} bold>
          {item}
        </Text>
      ))
    )
  }

  if (origin) {
    els.push(
      ...origin.split('/').map(item => (
        <Text
          type={$.state.origin === item ? 'main' : 'sub'}
          size={size}
          lineHeight={size + 1}
          bold
        >
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
            <Text type='sub' size={size} lineHeight={size + 1} bold>
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

export default ob(Desc, COMPONENT)
