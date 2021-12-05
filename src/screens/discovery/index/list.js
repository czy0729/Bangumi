/*
 * @Author: czy0729
 * @Date: 2019-05-29 04:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-05 11:16:34
 */
import React from 'react'
import { HorizontalList } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import { findSubjectCn, getCoverLarge } from '@utils/app'
import { IMG_DEFAULT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import SectionTitle from './section-title'
import CoverLg from './cover-lg'
import CoverSm from './cover-sm'
import CoverXs from './cover-xs'

const dataCache = {}
const initialRenderNumsSm = _.device(Math.floor(_.window.contentWidth / 140) + 1, 0)
export const initialRenderNumsXs = _.device(
  Math.floor(_.window.contentWidth / 86) + 1,
  0
)

const defaultProps = {
  styles: {},
  style: {},
  type: 'anime',
  list: [],
  friendsChannel: [],
  friendsMap: {}
}

const List = memo(({ styles, style, type, list, friendsChannel, friendsMap }) => {
  rerender('Discovery.List.Main')

  const data = dataCache[type] || list.sort(() => 0.5 - Math.random()) || []
  if (!dataCache[type] && data.length) dataCache[type] = data

  const title = MODEL_SUBJECT_TYPE.getTitle(type)
  return (
    <>
      <SectionTitle title={title} type={type} />
      <CoverLg
        title={title}
        src={getCoverLarge(data[0].cover) || IMG_DEFAULT}
        cn={findSubjectCn(data[0].title, data[0].subjectId)}
        data={data[0]}
      />
      <HorizontalList
        style={style}
        contentContainerStyle={styles.contentContainerStyle}
        data={data.filter((item, index) => index > 0)}
        initialRenderNums={initialRenderNumsSm}
        renderItem={item => (
          <CoverSm
            key={item.subjectId}
            title={title}
            src={item.cover || IMG_DEFAULT}
            cn={findSubjectCn(item.title, item.subjectId)}
            data={item}
          />
        )}
      />
      {!!friendsChannel.length && (
        <HorizontalList
          contentContainerStyle={styles.contentContainerStyleSm}
          data={friendsChannel.filter(item => item.cover !== '/img/no_img.gif')}
          initialRenderNums={initialRenderNumsXs}
          renderItem={item => (
            <CoverXs
              key={`${item.userId}|${item.id}`}
              title={title}
              avatar={friendsMap[item.userId]?.avatar}
              data={item}
            />
          )}
        />
      )}
    </>
  )
}, defaultProps)

export default obc(({ style, type = 'anime' }, { $ }) => {
  rerender('Discovery.List')

  const { dragging } = $.state
  if (dragging) return null

  const list = $.home[type]
  if (!list.length) return null

  return (
    <List
      styles={memoStyles()}
      style={style}
      type={type}
      list={list}
      friendsChannel={$.friendsChannel(type)}
      friendsMap={$.friendsMap}
    />
  )
})

const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingVertical: _.space + 4,
    paddingRight: _.windSm - _._wind,
    paddingLeft: _.windSm
  },
  contentContainerStyleSm: {
    paddingRight: _.windSm - _._wind,
    paddingBottom: _.space + 4,
    paddingLeft: _.windSm
  }
}))
