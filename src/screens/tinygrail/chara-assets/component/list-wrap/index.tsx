/*
 * @Author: czy0729
 * @Date: 2025-04-08 19:14:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-08 19:16:57
 */
import React from 'react'
import { Loading } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import List from '../list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ListWrap({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    if (!$.myCharaAssets._loaded) {
      return <Loading style={_.container.flex} color={_.colorTinygrailText} />
    }

    return <List id={id} />
  })
}

export default ListWrap
