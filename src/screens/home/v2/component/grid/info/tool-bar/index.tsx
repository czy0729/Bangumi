/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:40:44
 */
import React from 'react'
import { Flex, Iconfont, Touchable } from '@components'
import { _, useStore } from '@stores'
import { cnjp } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../../types'
import BtnOrigin from '../../../item/btn-origin'
import BtnNextEp from '../btn-next-ep'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ToolBar({ subjectId, subject = {} as any }) {
  const { $ } = useStore<Ctx>()
  const _subject = $.subject(subjectId)
  const label = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(_subject.type || subject?.type)
  const cn = cnjp(_subject?.name_cn || subject?.name_cn, _subject?.name || subject?.name)
  const jp = cnjp(_subject?.name || subject?.name, _subject?.name_cn || subject?.name_cn)
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
}

export default ob(ToolBar, COMPONENT)
