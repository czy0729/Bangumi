/*
 * @Author: czy0729
 * @Date: 2022-11-20 08:49:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-07 21:16:30
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../../../../types'
import BookNextBtn from '../book-next-btn'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props } from './types'

function Count({ subjectId, subject = {}, epStatus, tip }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const current = $.subject(subjectId)
    const label = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(current?.type || subject?.type)
    if (label === '游戏') {
      return (
        <Text style={_.mt.xs} type='sub' size={12} lineHeight={13}>
          {tip}
        </Text>
      )
    }

    if (label === '书籍') {
      const { list = [] } = $.collection
      const { ep_status: epStatus, vol_status: volStatus } = list.find(
        item => item.subject_id === subjectId
      )
      return (
        <Flex style={styles.book} justify='end'>
          <Text type='primary' size={20}>
            <Text type='primary' size={12} lineHeight={20}>
              Chap.{' '}
            </Text>
            {epStatus}
          </Text>
          <BookNextBtn subjectId={subjectId} epStatus={epStatus + 1} volStatus={volStatus} />
          <Text style={_.ml.md} type='primary' size={20}>
            <Text type='primary' size={12} lineHeight={20}>
              Vol.{' '}
            </Text>
            {volStatus}
          </Text>
          <BookNextBtn subjectId={subjectId} epStatus={epStatus} volStatus={volStatus + 1} />
        </Flex>
      )
    }

    return (
      <Text type='primary' size={18}>
        {$.countFixed(subjectId, epStatus) || '0'}
        <Text type='sub' lineHeight={18}>
          {' '}
          / {$.countRight(subjectId)}
        </Text>
      </Text>
    )
  })
}

export default Count
