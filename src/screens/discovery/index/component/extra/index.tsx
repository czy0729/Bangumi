/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:07:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:46:48
 */
import React from 'react'
import { Heatmap, Track } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import LinkModal from '../link-modal'
import { COMPONENT } from './ds'

function Extra() {
  const { $, navigation } = useStore<Ctx>()
  return (
    <>
      <LinkModal $={$} navigation={navigation} />
      <Track title='发现' hm={['discovery', 'Discovery']} />
      <Heatmap bottom={_.bottom} id='发现' screen='Discovery' />
    </>
  )
}

export default ob(Extra, COMPONENT)
