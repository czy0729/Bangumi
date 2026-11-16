/*
 * @Author: czy0729
 * @Date: 2021-01-21 14:56:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 00:41:17
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Iconfont, Touchable } from '@components'
import { useStore } from '@stores'
import { getAction } from '@utils'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function BtnFavor({ subjectId, name, name_cn, typeCn, isFirst }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handlePress = useCallback(() => {
    $.showManageModal(subjectId, {
      title: name_cn || name,
      desc: name,
      // 列表项已知的条目类型: 收藏弹窗状态文案按类型显示 (想读 / 在听…)
      action: getAction(typeCn)
    })
  }, [$, name, name_cn, subjectId, typeCn])

  return (
    <Touchable style={styles.touch} onPress={handlePress}>
      <Flex style={styles.btn} justify='center'>
        <Iconfont name='md-star-outline' size={19.5} />
      </Flex>
      {isFirst && <Heatmap id='首页.显示收藏管理' />}
    </Touchable>
  )
}

export default observer(BtnFavor)
