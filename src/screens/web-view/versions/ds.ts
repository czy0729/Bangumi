/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:42:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 21:49:52
 */
import { Loaded } from '@types'

export const COMPONENT = 'Versions'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const TABS = [
  {
    title: '8.21.0 - 2025/05/06',
    key: 'brhkrc51tg4s6x0e'
  },
  {
    title: '8.20.0 - 2025/04/03',
    key: 'csic9v'
  },
  {
    title: '8.19.0 - 2025/03/08',
    key: 'eo79o18253lecthq'
  },
  {
    title: '8.18.0 - 2025/02/15',
    key: 'kozcmvlgwezrthkz'
  },
  {
    title: '8.17.0 - 2025/01/12',
    key: 'wb0727zmhxxv7tiy'
  },
  {
    title: '8.16.0 - 2024/11/05',
    key: 'fkl5elv7kxbnzri1'
  },
  {
    title: '8.15.0 - 2024/10/25',
    key: 'bg5m8vdzr7honhev'
  },
  {
    title: '8.14.0 - 2024/09/27',
    key: 'ox1ifg0xlx8mf1pq'
  },
  {
    title: '8.13.0 - 24/09/02',
    key: 'bmvgltogockmc8st'
  },
  {
    title: '8.12.0 - 24/07/20',
    key: 'fci9cnfxybstmgpi'
  },
  {
    title: '8.11.0 - 24/06/23',
    key: 'vdqgmi1er76pcgf3'
  },
  {
    title: '8.10.0 - 24/05/21',
    key: 'ok2l6eg8i5osetfa'
  }
] as const

export const STATE = {
  /** @deprecated */
  page: 0,
  uri: TABS[0].key as string,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
