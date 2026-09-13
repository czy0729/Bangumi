/*
 * @Author: czy0729
 * @Date: 2022-01-21 12:10:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 22:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IconFilter } from '../icons'
import { getShows } from '../../utils'
import FilterDefault from './filter-default'
import FilterNSFW from './filter-nsfw'
import HideScore from './hide-score'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 内容过滤 */
function Custom({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting
        icon={<IconFilter />}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
        {...TEXTS.custom}
      />
      <ActionSheet
        show={state}
        title={TEXTS.custom.hd}
        height={filter ? 400 : 560}
        onClose={setFalse}
      >
        {shows.hideScore && <HideScore filter={filter} />}
        {shows.filterDefault && <FilterDefault filter={filter} />}
        {shows.filter18x && <FilterNSFW filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(Custom)
