/*
 * @Author: czy0729
 * @Date: 2020-09-08 12:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-21 07:50:08
 */
import React from 'react'
import { Flex, Heatmap } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Check() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <Flex>
      <IconHeader style={_.mr.sm} name='md-remove-circle-outline' onPress={() => $.onInit(true)} />
      <IconHeader style={_.mr.xs} name='md-check' onPress={$.onSave}>
        <Heatmap id='个人设置.保存' />
      </IconHeader>
    </Flex>
  ))
}

export default Check
