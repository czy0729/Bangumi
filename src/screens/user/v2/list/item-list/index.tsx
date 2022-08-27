/*
 * @Author: czy0729
 * @Date: 2022-08-08 11:55:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 16:23:37
 */
import React from 'react'
import { ItemCollections } from '@_'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { TABS } from '../../ds'
import { Ctx } from '../../types'

const EVENT = {
  id: '我的.跳转',
  type: 'list'
} as const

function ItemList({ item, page }, { $, navigation }: Ctx) {
  const { subjectType } = $.state
  const { key: type } = TABS[page]
  const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)
  const filter = $.isTabActive(subjectType, type) ? $.state.filter : ''
  return (
    <ItemCollections
      navigation={navigation}
      {...item}
      showLabel={false}
      type={typeCn}
      userCollection={$.label}
      isDo={type === 'do'}
      isDropped={type === 'dropped'}
      isOnHold={type === 'on_hold'}
      event={EVENT}
      filter={filter}
      onManagePress={$.onManagePress}
    />
  )
}

export default obc(ItemList)
