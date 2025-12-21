/*
 * @Author: czy0729
 * @Date: 2024-09-04 23:34:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 15:15:20
 */
import { observable } from 'mobx'
import Store from '@utils/store'
import { MergeListItem, SMBListItem } from '../types'
import { EXCLUDE_STATE, NAMESPACE, STATE } from './ds'

export default class State extends Store<typeof STATE> {
  state = observable(STATE)

  /** 临时存放读取的文件夹结构列表 */
  memoDirectory: SMBListItem[] = []

  /** 临时存放当前应该显示的管理列表 */
  memoList: MergeListItem[] = []

  /** 临时存放当前管理列表的标签 */
  memoTags: string[] = []

  /** 临时存放当前管理列表相关条目的标签 */
  memoSubjectTags: string[] = []

  /** 本地化 */
  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }
}
