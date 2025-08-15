/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:36:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 20:59:32
 */
import React from 'react'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { getShows } from '../../utils'
import Feedback from './feedback'
import Qiafan from './qiafan'
import Sponsor from './sponsor'
import Tips from './tips'
import Versions from './versions'
import { COMPONENT, TEXTS } from './ds'

/** 联系 */
function Contact({ navigation, filter }) {
  r(COMPONENT)

  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        {shows.say && <Feedback navigation={navigation} filter={filter} />}
        {shows.qiafan && <Qiafan navigation={navigation} filter={filter} />}
        {shows.advance && <Sponsor navigation={navigation} filter={filter} />}
        {shows.versions && <Versions navigation={navigation} filter={filter} />}
        {shows.tips && <Tips navigation={navigation} filter={filter} />}
      </>
    )
  })
}

export default Contact
