/*
 * @Author: czy0729
 * @Date: 2022-01-21 13:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 21:21:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { getShows } from '../../utils'
import AppZhinan from './app-zhinan'
import Privacy from './privacy'
import RepoGithub from './repo-github'
import RepoTopic from './repo-topic'
import ServerStatus from './server-status'
import Tips from './tips'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 更多 */
function Zhinan({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting hd='更多' arrow highlight filter={filter} onPress={setTrue} />
      <ActionSheet show={state} title='更多' onClose={setFalse}>
        {shows.topic && <RepoTopic filter={filter} setFalse={setFalse} />}
        {shows.tips && <Tips filter={filter} setFalse={setFalse} />}
        {shows.serverStatus && <ServerStatus filter={filter} />}
        {shows.github && <RepoGithub filter={filter} />}
        {shows.zhinan && <AppZhinan filter={filter} setFalse={setFalse} />}
        {/* {shows.notion && <Roadmap filter={filter} setFalse={setFalse} />} */}
        {/* {shows.jihua && <Question filter={filter} />} */}
        {shows.privacy && <Privacy filter={filter} setFalse={setFalse} />}
      </ActionSheet>
    </>
  )
}

export default observer(Zhinan)
