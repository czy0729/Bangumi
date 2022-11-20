/*
 * @Author: czy0729
 * @Date: 2022-11-20 09:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-20 09:30:15
 */
import React from 'react'
import { _ } from '@stores'
import { Flex, Iconfont, Touchable } from '@components'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import BtnOrigin from '../../item/btn-origin'
import { Ctx } from '../../types'
import BtnNextEp from '../btn-next-ep'
import { styles } from './styles'

function ToolBar({ subjectId }, { $ }: Ctx) {
  const subject = $.subject(subjectId)
  const label = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subject.type)
  return (
    <Flex style={_.mt.xs}>
      {(label === '动画' || label === '三次元') && (
        <BtnOrigin
          subjectId={subjectId}
          isTop={$.state.top.indexOf(subjectId) !== -1}
        />
      )}
      <BtnNextEp subjectId={subjectId} />
      <Touchable
        style={styles.touchable}
        onPress={() => {
          $.showManageModal(subjectId)
        }}
      >
        <Iconfont name='md-star-outline' size={19} />
      </Touchable>
    </Flex>
  )
}

export default obc(ToolBar)
