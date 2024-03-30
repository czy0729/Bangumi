/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:42:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-30 10:57:08
 */
import { Loaded } from '@types'

export const COMPONENT = 'Versions'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const TABS = [
  {
    title: '8.7.0 - 24/03/30',
    key: 'iv2262dy8nv9lqxa'
  },
  {
    title: '8.6.0 - 24/03/13',
    key: 'rxxbx8530fxq0e04'
  },
  {
    title: '8.5.0 - 24/02/09',
    key: 'wvdw1qp60gwalxoe'
  },
  {
    title: '8.4.0 - 24/01/08',
    key: 'nfw28ddsl6bvga0y'
  },
  {
    title: '8.3.0 - 23/11/05',
    key: 'lfqgis2fat1tyrnp'
  },
  {
    title: '8.2.0 - 23/10/02',
    key: 'itgg9g5vv4bvlf9l'
  },
  {
    title: '8.1.0 - 23/08/27',
    key: 'fcy8syh34t76t0i4'
  },
  {
    title: '8.0.0 - 23/08/13',
    key: 'io0nkkukoaxztf45'
  },

  // 7.X
  {
    title: '7.16.0 - 23/07/04',
    key: 'ric9srgg6sx9wakm'
  },
  {
    title: '7.15.0 - 23/06/09',
    key: 'gaqpf9ugnl17gt38'
  },
  {
    title: '7.14.0 - 23/05/19',
    key: 'sxqp62tybfww8ehw'
  },
  {
    title: '7.13.0 - 23/04/29',
    key: 'nt61pb04opftxany'
  },
  {
    title: '7.12.0 - 23/04/20',
    key: 'ypnsacpkn4kukqtg'
  },
  {
    title: '7.11.0 - 23/04/02',
    key: 'rgqtvd27o1o7x8lz'
  },
  {
    title: '7.10.0 - 23/03/17',
    key: 'ilbk1t5pv060eqvp'
  },
  {
    title: '7.9.0 - 23/03/03',
    key: 'ia218hdgptzlfnrt'
  },
  {
    title: '7.8.0 - 23/02/15',
    key: 'ww1hgenu9g6kb1gs'
  },
  {
    title: '7.7.0 - 23/02/06',
    key: 'uymn10kytroups5m'
  },
  {
    title: '7.6.0 - 23/01/23',
    key: 'csleloiptpy496h8'
  },
  {
    title: '7.5.0 - 23/01/07',
    key: 'gldi9rhwbnn163pk'
  },
  {
    title: '7.4.0 - 22/11/28',
    key: 'ndirq4'
  },
  {
    title: '7.3.0 - 22/11/16',
    key: 'bhylmxwt0gaulnlh'
  },
  {
    title: '7.2.0 - 22/11/04',
    key: 'hgwtgn'
  },
  {
    title: '7.1.0 - 22/09/25',
    key: 'hog74y'
  },
  {
    title: '7.0.0 - 22/09/08',
    key: 'tz5310'
  }
] as const

export const STATE = {
  /** @deprecated */
  page: 0,
  uri: TABS[0].key as string,
  _loaded: false as Loaded
}
