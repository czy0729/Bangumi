/*
 * @Author: czy0729
 * @Date: 2019-03-02 06:14:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 23:12:11
 */
import calendarStore from './calendar'
import collectionStore from './collection'
import discoveryStore from './discovery'
import Stores from './global'
import monoStore from './mono'
import otaStore from './ota'
import rakuenStore from './rakuen'
import searchStore from './search'
import smbStore from './smb'
import subjectStore from './subject'
import systemStore from './system'
import tagStore from './tag'
import themeStore from './theme'
import timelineStore from './timeline'
import tinygrailStore from './tinygrail'
import uiStore from './ui'
import userStore from './user'
import usersStore from './users'

export { StoreContext, useInitStore, useStore } from './utils'
export { useStoreContextBridge } from './bridge'

const _ = themeStore

export {
  _,
  calendarStore,
  collectionStore,
  discoveryStore,
  monoStore,
  otaStore,
  rakuenStore,
  searchStore,
  smbStore,
  subjectStore,
  systemStore,
  tagStore,
  themeStore,
  timelineStore,
  tinygrailStore,
  uiStore,
  userStore,
  usersStore
}

export default Stores
