/*
 * @Author: czy0729
 * @Date: 2019-06-16 04:41:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 21:37:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { Source } from '@types'
import { Image } from '../image'
import { COMPONENT } from './ds'
import { Props as BgmProps } from './types'

export { BgmProps }

/** bgm.tv 表情 */
export const Bgm = observer(({ index = 1, size = 20, ...other }: BgmProps) => {
  r(COMPONENT)

  if (!bgm) init()

  return <Image src={bgm[index]} resizeMode='contain' size={size} placeholder={false} {...other} />
})

export default Bgm

let bgm: {
  [x: string]: Source
}

function init() {
  bgm = {
    1: require('@bgm/01.gif'),
    2: require('@bgm/02.gif'),
    3: require('@bgm/03.gif'),
    4: require('@bgm/04.gif'),
    5: require('@bgm/05.gif'),
    6: require('@bgm/06.gif'),
    7: require('@bgm/07.gif'),
    8: require('@bgm/08.gif'),
    9: require('@bgm/09.gif'),
    10: require('@bgm/10.gif'),
    11: require('@bgm/11.gif'),
    12: require('@bgm/12.gif'),
    13: require('@bgm/13.gif'),
    14: require('@bgm/14.gif'),
    15: require('@bgm/15.gif'),
    16: require('@bgm/16.gif'),
    17: require('@bgm/17.gif'),
    18: require('@bgm/18.gif'),
    19: require('@bgm/19.gif'),
    20: require('@bgm/20.gif'),
    21: require('@bgm/21.gif'),
    22: require('@bgm/22.gif'),
    23: require('@bgm/23.gif'),
    24: require('@bgm/24.gif'),
    25: require('@bgm/25.gif'),
    26: require('@bgm/26.gif'),
    27: require('@bgm/27.gif'),
    28: require('@bgm/28.gif'),
    29: require('@bgm/29.gif'),
    30: require('@bgm/30.gif'),
    31: require('@bgm/31.gif'),
    32: require('@bgm/32.gif'),
    33: require('@bgm/33.gif'),
    34: require('@bgm/34.gif'),
    35: require('@bgm/35.gif'),
    36: require('@bgm/36.gif'),
    37: require('@bgm/37.gif'),
    38: require('@bgm/38.gif'),
    39: require('@bgm/39.gif'),
    40: require('@bgm/40.gif'),
    41: require('@bgm/41.gif'),
    42: require('@bgm/42.gif'),
    43: require('@bgm/43.gif'),
    44: require('@bgm/44.gif'),
    45: require('@bgm/45.gif'),
    46: require('@bgm/46.gif'),
    47: require('@bgm/47.gif'),
    48: require('@bgm/48.gif'),
    49: require('@bgm/49.gif'),
    50: require('@bgm/50.gif'),
    51: require('@bgm/51.gif'),
    52: require('@bgm/52.gif'),
    53: require('@bgm/53.gif'),
    54: require('@bgm/54.gif'),
    55: require('@bgm/55.gif'),
    56: require('@bgm/56.gif'),
    57: require('@bgm/57.gif'),
    58: require('@bgm/58.gif'),
    59: require('@bgm/59.gif'),
    60: require('@bgm/60.gif'),
    61: require('@bgm/61.gif'),
    62: require('@bgm/62.gif'),
    63: require('@bgm/63.gif'),
    64: require('@bgm/64.gif'),
    65: require('@bgm/65.gif'),
    66: require('@bgm/66.gif'),
    67: require('@bgm/67.gif'),
    68: require('@bgm/68.gif'),
    69: require('@bgm/69.gif'),
    70: require('@bgm/70.gif'),
    71: require('@bgm/71.gif'),
    72: require('@bgm/72.gif'),
    73: require('@bgm/73.gif'),
    74: require('@bgm/74.gif'),
    75: require('@bgm/75.gif'),
    76: require('@bgm/76.gif'),
    77: require('@bgm/77.gif'),
    78: require('@bgm/78.gif'),
    79: require('@bgm/79.gif'),
    80: require('@bgm/80.gif'),
    81: require('@bgm/81.gif'),
    82: require('@bgm/82.gif'),
    83: require('@bgm/83.gif'),
    84: require('@bgm/84.gif'),
    85: require('@bgm/85.gif'),
    86: require('@bgm/86.gif'),
    87: require('@bgm/87.gif'),
    88: require('@bgm/88.gif'),
    89: require('@bgm/89.gif'),
    90: require('@bgm/90.gif'),
    91: require('@bgm/91.gif'),
    92: require('@bgm/92.gif'),
    93: require('@bgm/93.gif'),
    94: require('@bgm/94.gif'),
    95: require('@bgm/95.gif'),
    96: require('@bgm/96.gif'),
    97: require('@bgm/97.gif'),
    98: require('@bgm/98.gif'),
    99: require('@bgm/99.gif'),
    100: require('@bgm/100.gif'),
    101: require('@bgm/101.gif'),
    102: require('@bgm/102.gif')
  }
}
