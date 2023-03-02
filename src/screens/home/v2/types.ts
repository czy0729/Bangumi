/*
 * @Author: czy0729
 * @Date: 2022-07-11 16:50:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 23:04:12
 */
import { factory } from '@utils'
import { Loaded, Navigation, Subject, SubjectId } from '@types'
import Store from './store'
import { TABS_WITH_GAME } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type ExcludeState = {
  modal: {
    title: string
    desc: string
  }
  grid: {
    subject_id: SubjectId
    subject: Subject
    ep_status: string | number
  }
  progress: {
    fetching: boolean
    fetchingSubjectId1: SubjectId
    fetchingSubjectId2: SubjectId
    message: string
    current: number
    total: number
  }
  filter: string
  filterPage: number
  isFocused: boolean
  renderedTabsIndex: number[]
  flip: SubjectId
}

export type State = {
  /** <Modal> 可见性 */
  visible: boolean

  /** <Modal> 当前使用的条目Id */
  subjectId: SubjectId

  /** <Tabs> 当前页数 */
  page: number

  /** <Item> 置顶记录 */
  top: SubjectId[]

  /** 每个 <Item> 的状态 */
  item: {
    [subjectId: SubjectId]: InitItem
  }

  /** 格子布局当前选中的条目Id */
  current: number

  /** 本地数据读取完成 */
  _loaded: Loaded
}

export type InitItem = {
  expand: boolean
  doing: boolean
}

export type PinYinFirstCharacter = {
  [cn: string]: string
}

export type TabLabel = (typeof TABS_WITH_GAME)[number]['title']
