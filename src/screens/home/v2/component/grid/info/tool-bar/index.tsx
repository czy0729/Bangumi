/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:18:26
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { cnjp } from '@utils'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../../types'
import BtnOrigin from '../../../item/btn-origin'
import BtnNextEp from '../btn-next-ep'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function ToolBar({ subjectId, subject = {} }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const current = $.subject(subjectId)
    const label = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(current.type || subject?.type)
    const cn = cnjp(current?.name_cn || subject?.name_cn, current?.name || subject?.name)
    const jp = cnjp(current?.name || subject?.name, current?.name_cn || subject?.name_cn)

    return (
      <Flex style={_.mt.xs}>
        {(label === '动画' || label === '三次元') && <BtnOrigin subjectId={subjectId} />}
        <BtnNextEp subjectId={subjectId} />
        <Touchable
          style={styles.touchable}
          onPress={() => {
            $.showManageModal(subjectId, {
              title: cn,
              desc: jp
            })
          }}
        >
          <Iconfont name='md-star-outline' size={19} />
        </Touchable>
      </Flex>
    )
  })
}

export default ToolBar
