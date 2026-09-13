import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IconType } from '../icons'
import { getShows } from '../../utils'
import CnFirst from './cn-first'
import S2T from './s2t'
import Spacing from './spacing'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 文本处理 */
function Text({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting
        icon={<IconType />}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
        {...TEXTS.text}
      />
      <ActionSheet
        show={state}
        title={TEXTS.text.hd}
        height={filter ? 440 : 640}
        onClose={setFalse}
      >
        {shows.cnFirst && <CnFirst filter={filter} />}
        {shows.s2t && <S2T filter={filter} />}
        {shows.spacing && <Spacing filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(Text)
