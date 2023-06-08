/*
 * @Author: czy0729
 * @Date: 2023-06-08 23:46:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-08 23:47:31
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Image } from '../image'
import { Props as BgmProps } from './types'

export { BgmProps }

let bgm: {
  [x: string]: string
}

function init() {
  bgm = {
    1: 'https://bgm.tv/img/smiles/tv/01.gif',
    2: 'https://bgm.tv/img/smiles/tv/02.gif',
    3: 'https://bgm.tv/img/smiles/tv/03.gif',
    4: 'https://bgm.tv/img/smiles/tv/04.gif',
    5: 'https://bgm.tv/img/smiles/tv/05.gif',
    6: 'https://bgm.tv/img/smiles/tv/06.gif',
    7: 'https://bgm.tv/img/smiles/tv/07.gif',
    8: 'https://bgm.tv/img/smiles/tv/08.gif',
    9: 'https://bgm.tv/img/smiles/tv/09.gif',
    10: 'https://bgm.tv/img/smiles/tv/10.gif',
    11: 'https://bgm.tv/img/smiles/tv/11.gif',
    12: 'https://bgm.tv/img/smiles/tv/12.gif',
    13: 'https://bgm.tv/img/smiles/tv/13.gif',
    14: 'https://bgm.tv/img/smiles/tv/14.gif',
    15: 'https://bgm.tv/img/smiles/tv/15.gif',
    16: 'https://bgm.tv/img/smiles/tv/16.gif',
    17: 'https://bgm.tv/img/smiles/tv/17.gif',
    18: 'https://bgm.tv/img/smiles/tv/18.gif',
    19: 'https://bgm.tv/img/smiles/tv/19.gif',
    20: 'https://bgm.tv/img/smiles/tv/20.gif',
    21: 'https://bgm.tv/img/smiles/tv/21.gif',
    22: 'https://bgm.tv/img/smiles/tv/22.gif',
    23: 'https://bgm.tv/img/smiles/tv/23.gif',
    24: 'https://bgm.tv/img/smiles/tv/24.gif',
    25: 'https://bgm.tv/img/smiles/tv/25.gif',
    26: 'https://bgm.tv/img/smiles/tv/26.gif',
    27: 'https://bgm.tv/img/smiles/tv/27.gif',
    28: 'https://bgm.tv/img/smiles/tv/28.gif',
    29: 'https://bgm.tv/img/smiles/tv/29.gif',
    30: 'https://bgm.tv/img/smiles/tv/30.gif',
    31: 'https://bgm.tv/img/smiles/tv/31.gif',
    32: 'https://bgm.tv/img/smiles/tv/32.gif',
    33: 'https://bgm.tv/img/smiles/tv/33.gif',
    34: 'https://bgm.tv/img/smiles/tv/34.gif',
    35: 'https://bgm.tv/img/smiles/tv/35.gif',
    36: 'https://bgm.tv/img/smiles/tv/36.gif',
    37: 'https://bgm.tv/img/smiles/tv/37.gif',
    38: 'https://bgm.tv/img/smiles/tv/38.gif',
    39: 'https://bgm.tv/img/smiles/tv/39.gif',
    40: 'https://bgm.tv/img/smiles/tv/40.gif',
    41: 'https://bgm.tv/img/smiles/tv/41.gif',
    42: 'https://bgm.tv/img/smiles/tv/42.gif',
    43: 'https://bgm.tv/img/smiles/tv/43.gif',
    44: 'https://bgm.tv/img/smiles/tv/44.gif',
    45: 'https://bgm.tv/img/smiles/tv/45.gif',
    46: 'https://bgm.tv/img/smiles/tv/46.gif',
    47: 'https://bgm.tv/img/smiles/tv/47.gif',
    48: 'https://bgm.tv/img/smiles/tv/48.gif',
    49: 'https://bgm.tv/img/smiles/tv/49.gif',
    50: 'https://bgm.tv/img/smiles/tv/50.gif',
    51: 'https://bgm.tv/img/smiles/tv/51.gif',
    52: 'https://bgm.tv/img/smiles/tv/52.gif',
    53: 'https://bgm.tv/img/smiles/tv/53.gif',
    54: 'https://bgm.tv/img/smiles/tv/54.gif',
    55: 'https://bgm.tv/img/smiles/tv/55.gif',
    56: 'https://bgm.tv/img/smiles/tv/56.gif',
    57: 'https://bgm.tv/img/smiles/tv/57.gif',
    58: 'https://bgm.tv/img/smiles/tv/58.gif',
    59: 'https://bgm.tv/img/smiles/tv/59.gif',
    60: 'https://bgm.tv/img/smiles/tv/60.gif',
    61: 'https://bgm.tv/img/smiles/tv/61.gif',
    62: 'https://bgm.tv/img/smiles/tv/62.gif',
    63: 'https://bgm.tv/img/smiles/tv/63.gif',
    64: 'https://bgm.tv/img/smiles/tv/64.gif',
    65: 'https://bgm.tv/img/smiles/tv/65.gif',
    66: 'https://bgm.tv/img/smiles/tv/66.gif',
    67: 'https://bgm.tv/img/smiles/tv/67.gif',
    68: 'https://bgm.tv/img/smiles/tv/68.gif',
    69: 'https://bgm.tv/img/smiles/tv/69.gif',
    70: 'https://bgm.tv/img/smiles/tv/70.gif',
    71: 'https://bgm.tv/img/smiles/tv/71.gif',
    72: 'https://bgm.tv/img/smiles/tv/72.gif',
    73: 'https://bgm.tv/img/smiles/tv/73.gif',
    74: 'https://bgm.tv/img/smiles/tv/74.gif',
    75: 'https://bgm.tv/img/smiles/tv/75.gif',
    76: 'https://bgm.tv/img/smiles/tv/76.gif',
    77: 'https://bgm.tv/img/smiles/tv/77.gif',
    78: 'https://bgm.tv/img/smiles/tv/78.gif',
    79: 'https://bgm.tv/img/smiles/tv/79.gif',
    80: 'https://bgm.tv/img/smiles/tv/80.gif',
    81: 'https://bgm.tv/img/smiles/tv/81.gif',
    82: 'https://bgm.tv/img/smiles/tv/82.gif',
    83: 'https://bgm.tv/img/smiles/tv/83.gif',
    84: 'https://bgm.tv/img/smiles/tv/84.gif',
    85: 'https://bgm.tv/img/smiles/tv/85.gif',
    86: 'https://bgm.tv/img/smiles/tv/86.gif',
    87: 'https://bgm.tv/img/smiles/tv/87.gif',
    88: 'https://bgm.tv/img/smiles/tv/88.gif',
    89: 'https://bgm.tv/img/smiles/tv/89.gif',
    90: 'https://bgm.tv/img/smiles/tv/90.gif',
    91: 'https://bgm.tv/img/smiles/tv/91.gif',
    92: 'https://bgm.tv/img/smiles/tv/92.gif',
    93: 'https://bgm.tv/img/smiles/tv/93.gif',
    94: 'https://bgm.tv/img/smiles/tv/94.gif',
    95: 'https://bgm.tv/img/smiles/tv/95.gif',
    96: 'https://bgm.tv/img/smiles/tv/96.gif',
    97: 'https://bgm.tv/img/smiles/tv/97.gif',
    98: 'https://bgm.tv/img/smiles/tv/98.gif',
    99: 'https://bgm.tv/img/smiles/tv/99.gif',
    100: 'https://bgm.tv/img/smiles/tv/100.gif',
    101: 'https://bgm.tv/img/smiles/tv/101.gif',
    102: 'https://bgm.tv/img/smiles/tv/102.gif'
  }
}

export const Bgm = observer(({ index = 1, size = 20, ...other }: BgmProps) => {
  if (!bgm) init()

  return (
    <Image
      src={bgm[index]}
      resizeMode='contain'
      size={size}
      placeholder={false}
      {...other}
    />
  )
})
