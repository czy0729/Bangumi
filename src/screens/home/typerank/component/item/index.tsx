/*
 * @Author: czy0729
 * @Date: 2023-11-05 03:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 17:21:10
 */
import React from 'react'
import { ItemSubject } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { EVENT } from './ds'

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
