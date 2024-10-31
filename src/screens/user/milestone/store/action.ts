/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:54:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 09:15:22
 */
import { MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { CollectionsOrder, CollectionStatusCn, SubjectTypeCn } from '@types'
import { ORDER_DS } from '../ds'
import Fetch from './fetch'
import { STATE } from './ds'

export default class Action extends Fetch {
  fetchCollections = (refresh: boolean = false) => {
    setTimeout(() => {
      if (refresh || !this.collections._loaded) this.fetchUserCollections(true)
    }, 0)
  }

  selectSubjectType = (title: SubjectTypeCn) => {
    this.setState({
      subjectType: MODEL_SUBJECT_TYPE.getLabel(title),
      tag: ''
    })
    this.fetchCollections()
    this.save()
  }

  selectType = (title: CollectionStatusCn) => {
    this.setState({
      type: MODEL_COLLECTION_STATUS.getValue(title.replace(/听|读|玩/g, '看')),
      tag: ''
    })
    this.fetchCollections()
    this.save()
  }

  selectOrder = (title: (typeof ORDER_DS)[number]) => {
    let order: CollectionsOrder = ''
    if (title === '发布') {
      order = 'date'
    } else if (title === '评价') {
      order = 'rate'
    }

    this.setState({
      order
    })
    this.fetchCollections(true)
    this.save()
  }

  selectTag = (title: string = '') => {
    const tag = (title === '全部' ? '' : title.split(' (')?.[0]) || ''
    this.setState({
      tag
    })
    this.fetchCollections(true)
    this.save()
  }

  setOptions = (key: keyof typeof STATE, value?: any) => {
    if (typeof value !== 'undefined') {
      this.setState({
        [key]: value
      })
    } else {
      const prev = this.state[key]
      if (typeof prev === 'boolean') {
        this.setState({
          [key]: !prev
        })
      }
    }
    this.save()
  }
}
