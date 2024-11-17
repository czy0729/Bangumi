/*
 * @Author: czy0729
 * @Date: 2023-11-05 03:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:36:08
 */
import React from 'react'
import { ItemSubject } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { EVENT } from './ds'

function Item({ subjectId, index }) {
  const { $, navigation } = useStore<Ctx>()
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

export default ob(Item)
