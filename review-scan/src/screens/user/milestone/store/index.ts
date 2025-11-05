/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 23:00:50
 */
import { COLLECTION_STATUS, COLLECTIONS_ORDERBY, SUBJECT_TYPE } from '@constants'
import { LIMIT, NUM_COLUMNS, NUMBER_OF_LINES, SUB_TITLE } from '../ds'
import Action from './action'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class ScreenWordCloud extends Action {
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
      subjectType,
      type,
      order,
      tag,
      numColumns,
      radius,
      autoHeight,
      cnFirst,
      numberOfLines,
      subTitle,
      extraTitle,
      starsFull,
      starsColor,
      nsfw,
      lastTime,
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
      NUM_COLUMNS.find(item => item === String(numColumns))
    ) {
      data.numColumns = Number(numColumns)
    }

    if (typeof radius === 'string') {
      if (radius === 'true') {
        data.radius = true
      } else if (radius === 'false') {
        data.radius = false
      }
    }

    if (typeof autoHeight === 'string') {
      if (autoHeight === 'true') {
        data.autoHeight = true
      } else if (autoHeight === 'false') {
        data.autoHeight = false
      }
    }

    if (typeof cnFirst === 'string') {
      if (cnFirst === 'true') {
        data.cnFirst = true
      } else if (cnFirst === 'false') {
        data.cnFirst = false
      }
    }

    if (typeof numberOfLines === 'string') {
      if (numberOfLines === '无') {
        data.numberOfLines = 0
      } else if (NUMBER_OF_LINES.includes(numberOfLines as any)) {
        data.numberOfLines = Number(numberOfLines) || 0
      }
    }

    if (typeof subTitle === 'string' && SUB_TITLE.includes(subTitle as any)) {
      data.subTitle = subTitle as any
    }

    if (typeof extraTitle === 'string' && SUB_TITLE.includes(extraTitle as any)) {
      data.extraTitle = extraTitle as any
    }

    if (typeof starsFull === 'string') {
      if (starsFull === 'true') {
        data.starsFull = true
      } else if (starsFull === 'false') {
        data.starsFull = false
      }
    }

    if (typeof starsColor === 'string') {
      if (starsColor === 'true') {
        data.starsColor = true
      } else if (starsColor === 'false') {
        data.starsColor = false
      }
    }

    if (typeof nsfw === 'string') {
      if (nsfw === 'true') {
        data.nsfw = true
      } else if (nsfw === 'false') {
        data.nsfw = false
      }
    }

    if (typeof lastTime === 'string') {
      if (lastTime === 'true') {
        data.lastTime = true
      } else if (lastTime === 'false') {
        data.lastTime = false
      }
    }

    if (typeof limit === 'string') {
      if (limit === '不限') {
        data.limit = 0
      } else if (LIMIT.includes(limit as any)) {
        data.limit = Number(limit) || 0
      }
    }

    // cleanQuery()
    if (Object.keys(data).length) this.save()

    return data
  }
}
