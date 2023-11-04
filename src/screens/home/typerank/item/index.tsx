/*
 * @Author: czy0729
 * @Date: 2023-11-05 03:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-05 03:55:10
 */
import React from 'react'
import { ItemSubject } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '分类排行.跳转'
} as const

function Item({ subjectId, index }, { $, navigation }: Ctx) {
  return (
    <ItemSubject
      navigation={navigation}
      event={EVENT}
      index={index}
      subjectId={subjectId}
      type={$.type}
      subject={$.subject(subjectId)}
      oss={$.subjectOSS(subjectId)}
      active={$.subjectId == subjectId}
    />
  )
}

export default obc(Item)
