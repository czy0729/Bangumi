/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 06:15:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { getShows } from '../../utils'
import Feedback from './feedback'
import Qiafan from './qiafan'
import Sponsor from './sponsor'
import Versions from './versions'
import { COMPONENT, TEXTS } from './ds'

import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../types'

/** 联系 */
function Contact({ navigation, filter }: WithNavigation<WithFilterProps>) {
  r(COMPONENT)

  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      {shows.say && <Feedback navigation={navigation} filter={filter} />}
      {shows.qiafan && <Qiafan navigation={navigation} filter={filter} />}
      {shows.advance && <Sponsor navigation={navigation} filter={filter} />}
      {shows.versions && <Versions navigation={navigation} filter={filter} />}
    </>
  )
}

export default observer(Contact)
