/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:26:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:17:36
 *
 * 系列分组: 主条目与子条目
 */
import { useMemo } from 'react'
import { View } from 'react-native'
import { Divider } from '@components'
import { asc } from '@utils'
import { memo } from '@utils/decorators'
import { FROZEN_ARRAY, FROZEN_OBJECT } from '@constants'
import Subject from '../subject'
import SubList from './sub-list'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

type Props = typeof DEFAULT_PROPS

export default memo(
  ({
    data = FROZEN_ARRAY as unknown as Props['data'],
    index = 0,
    subjects = FROZEN_OBJECT
  }: Props) => {
    /** 以最小的 subjectId 作为 pid, 其余子项按放送日期排序 */
    const { id, sub } = useMemo(() => {
      if (!data.length) return { id: 0, sub: [] as Props['data'] }

      const _id = Math.min(...(data as number[]))
      const _sub = data
        .filter(item => item !== _id)
        .sort((a, b) => asc(subjects[a]?.date || '9999-99-99', subjects[b]?.date || '9999-99-99'))

      return { id: _id, sub: _sub }
    }, [data, subjects])

    if (!data.length) return null

    return (
      <>
        <View>
          <Subject id={id} section={index} />
          {!!sub.length && <SubList id={id} index={index} sub={sub} />}
        </View>
        <Divider />
      </>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)
