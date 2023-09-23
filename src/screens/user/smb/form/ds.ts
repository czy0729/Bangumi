/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:58:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-23 12:15:23
 */
import { IOS } from '@constants'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

type $State = $['state']

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  visible: false as $State['visible'],
  id: '' as $State['id'],
  name: '' as $State['name'],
  ip: '' as $State['ip'],
  username: '' as $State['username'],
  password: '' as $State['password'],
  port: '' as $State['port'],
  sharedFolder: '' as $State['sharedFolder'],
  path: '' as $State['path'],
  workGroup: '' as $State['workGroup'],
  url: '' as $State['url'],
  webDAV: IOS as $State['webDAV'],
  onClose: (() => {}) as $['onClose'],
  onChange: (() => {}) as $['onChange'],
  onSubmit: (() => {}) as $['onSubmit']
}
