/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:31:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:04:36
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Item from './item'
import { memoStyles } from './styles'

export default obc(({ subjectId, ...folder }, { $, navigation }: Ctx) => {
  const {
    _loaded,
    name,
    name_cn,
    images,
    type,
    eps_count = 0,
    rank,
    rating
  } = $.subject(subjectId)
  const { status = { name: '' } } = $.collection(subjectId)
  return (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      loaded={_loaded}
      subjectId={subjectId}
      name={name}
      name_cn={name_cn}
      images={images}
      type={type}
      eps_count={eps_count}
      air_date={$.airDate(subjectId)}
      rank={rank}
      rating={rating}
      collection={status.name}
      folder={folder}
      smb={$.current.smb}
      url={$.url}
    />
  )
})
