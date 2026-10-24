/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面底部: 回复框
 */
import { observer } from 'mobx-react'
import { FixedTextarea } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'

import type { Props } from './types'
import type { Ctx } from '../../types'

function Bottom({ fixedTextareaRef }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { placeholder, value } = $.state
  if (!$.isWebLogin) return null

  return (
    <FixedTextarea
      ref={fixedTextareaRef}
      placeholder={placeholder ? `回复 ${placeholder}` : undefined}
      value={value}
      source
      onChange={$.onChange}
      onClose={$.closeFixedTextarea}
      onSubmit={$.doSubmit}
    />
  )
}

export default observer(Bottom)
