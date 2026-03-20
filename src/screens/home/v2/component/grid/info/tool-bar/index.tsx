/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:25:20
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { cnjp } from '@utils'
import { MODEL_SUBJECT_TYPE } from '@constants'
import BtnOrigin from '../../../item/btn-origin'
import BtnNextEp from '../btn-next-ep'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../../../types'
import type { Props } from './types'

function ToolBar({ subjectId, subject = {} }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const current = $.subject(subjectId)
  const label = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(current.type || subject?.type)
  const cn = cnjp(current?.name_cn || subject?.name_cn, current?.name || subject?.name)
  const jp = cnjp(current?.name || subject?.name, current?.name_cn || subject?.name_cn)

  const handlePress = useCallback(() => {
    $.showManageModal(subjectId, {
      title: cn,
      desc: jp
    })
  }, [$, cn, jp, subjectId])

  return (
    <Flex style={_.mt.xs}>
      {(label === '动画' || label === '三次元') && <BtnOrigin subjectId={subjectId} />}
      <BtnNextEp subjectId={subjectId} />
      <Touchable style={styles.touchable} onPress={handlePress}>
        <Iconfont name='md-star-outline' size={19} />
      </Touchable>
    </Flex>
  )
}

export default observer(ToolBar)
