/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:55:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 16:00:35
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { HTMLDecode } from '@utils/html'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

function Title({ subject }) {
  const type = MODEL_SUBJECT_TYPE.getTitle(subject.type)
  const isBook = type === '书籍'
  const doing = isBook ? '读' : '看'
  return (
    <>
      <Text numberOfLines={2} bold>
        {HTMLDecode(subject.name_cn || subject.name)}
      </Text>
      {!!subject?.collection?.doing && (
        <Text style={_.mt.xs} type='sub' size={12}>
          {subject.collection.doing} 人在{doing}
        </Text>
      )}
    </>
  )
}

export default ob(Title)
