/*
 * @Author: czy0729
 * @Date: 2020-09-08 12:09:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:08:58
 *
 * 页面头部的还原与保存按钮
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap } from '@components'
import { IconHeader } from '@_'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function Check() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleReset = useCallback(() => {
    $.onInit(true)
  }, [$])

  return (
    <Flex>
      <IconHeader style={_.mr.sm} name='md-remove-circle-outline' onPress={handleReset} />
      <IconHeader style={_.mr.xs} name='md-check' onPress={$.onSave}>
        <Heatmap id='个人设置.保存' />
      </IconHeader>
    </Flex>
  )
}

export default observer(Check)
