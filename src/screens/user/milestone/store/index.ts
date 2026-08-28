/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 04:56:27
 */
import { COLLECTION_STATUS, COLLECTIONS_ORDERBY, SUBJECT_TYPE } from '@constants'
import { LIMIT, NUM_COLUMNS, NUMBER_OF_LINES } from '../ds'
import Action from './action'
import { isSubTitle, parseBool } from './utils'
import { EXCLUDE_STATE, NAMESPACE } from './ds'

import type { STATE } from './ds'

/** 布尔类型的路由参数 */
const BOOL_PARAMS = [
  'radius',
  'autoHeight',
  'cnFirst',
  'starsFull',
  'starsColor',
  'nsfw',
  'lastTime'
] as const

export default class ScreenMilestone extends Action {
  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE, typeof EXCLUDE_STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      ...EXCLUDE_STATE,
      ...this.validateParams(),
      _loaded: true
    })

    this.fetchUsers()
    await this.fetchUserCollections(true)
    return this.fetchUserCollections()
  }

  validateParams = () => {
    const data: Partial<typeof STATE> = {}
    const {
      /** filters */
      subjectType,
      type,
      order,
      tag,

      /** options */
      numColumns,
      numberOfLines,
      subTitle,
      extraTitle,
      limit
    } = this.params

    /** filters */
    if (
      typeof subjectType === 'string' &&
      subjectType &&
      SUBJECT_TYPE.find(item => item.label === subjectType)
    ) {
      data.subjectType = subjectType
    }

    if (typeof type === 'string' && type && COLLECTION_STATUS.find(item => item.value === type)) {
      data.type = type
    }

    if (
      typeof order === 'string' &&
      order &&
      COLLECTIONS_ORDERBY.find(item => item.value === order)
    ) {
      data.order = order
    }

    if (typeof tag === 'string' && tag) data.tag = tag

    /** options */
    if (
      typeof numColumns === 'string' &&
      numColumns &&
      (NUM_COLUMNS as readonly string[]).includes(numColumns)
    ) {
      data.numColumns = Number(numColumns)
    }

    if (typeof numberOfLines === 'string') {
      if (numberOfLines === '无') {
        data.numberOfLines = 0
      } else if ((NUMBER_OF_LINES as readonly string[]).includes(numberOfLines)) {
        data.numberOfLines = Number(numberOfLines) || 0
      }
    }

    if (typeof subTitle === 'string' && isSubTitle(subTitle)) data.subTitle = subTitle

    if (typeof extraTitle === 'string' && isSubTitle(extraTitle)) data.extraTitle = extraTitle

    BOOL_PARAMS.forEach(key => {
      const value = parseBool(this.params[key])
      if (value !== undefined) data[key] = value
    })

    if (typeof limit === 'string') {
      if (limit === '不限') {
        data.limit = 0
      } else if ((LIMIT as readonly string[]).includes(limit)) {
        data.limit = Number(limit) || 0
      }
    }

    if (Object.keys(data).length) this.save()

    return data
  }
}
