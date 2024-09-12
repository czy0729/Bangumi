/*
 * @Author: czy0729
 * @Date: 2022-01-21 13:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-11 19:46:13
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { getShows } from '../../utils'
import AppZhinan from './app-zhinan'
import Privacy from './privacy'
import RepoGithub from './repo-github'
import RepoTopic from './repo-topic'
import ServerStatus from './server-status'
import { COMPONENT, TEXTS } from './ds'

/** 更多 */
function Zhinan({ navigation, filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='更多' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='更多' onClose={setFalse}>
          {shows.topic && <RepoTopic navigation={navigation} filter={filter} setFalse={setFalse} />}
          {shows.serverStatus && <ServerStatus navigation={navigation} filter={filter} />}
          {shows.github && <RepoGithub filter={filter} />}
          {shows.zhinan && (
            <AppZhinan navigation={navigation} filter={filter} setFalse={setFalse} />
          )}
          {/* {shows.notion && <Roadmap navigation={navigation} filter={filter} setFalse={setFalse} />} */}
          {/* {shows.jihua && <Question filter={filter} />} */}
          {shows.privacy && <Privacy navigation={navigation} filter={filter} setFalse={setFalse} />}
        </ActionSheet>
      </>
    )
  })
}

export default Zhinan
