/*
 * @Author: czy0729
 * @Date: 2019-05-29 04:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-24 20:13:01
 */
import React from 'react'
import { HorizontalList } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { findSubjectCn, getCoverLarge } from '@utils/app'
import { IMG_DEFAULT } from '@constants'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import SectionTitle from './section-title'
import CoverLg from './cover-lg'
import CoverSm from './cover-sm'
import CoverXs from './cover-xs'

const dataCache = {}
const initialRenderNumsSm = _.isPad
  ? 0
  : Math.floor(_.window.contentWidth / 140) + 1
const initialRenderNumsXs = _.isPad
  ? 0
  : Math.floor(_.window.contentWidth / 86) + 1

function List({ style, type }, { $ }) {
  if (!$.home[type].length) {
    return null
  }

  const data =
    dataCache[type] || $.home[type].sort(() => 0.5 - Math.random()) || []
  if (!dataCache[type] && data.length) {
    dataCache[type] = data
  }

  const title = MODEL_SUBJECT_TYPE.getTitle(type)
  const friendsChannel = $.friendsChannel(type)
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
              avatar={$.friendsMap[item.userId]?.avatar}
              data={item}
            />
          )}
        />
      )}
    </>
  )
}

export default obc(List, {
  type: 'anime'
})

const styles = _.create({
  contentContainerStyle: {
    paddingVertical: _.space + 4,
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind
  },
  contentContainerStyleSm: {
    paddingRight: _.wind - _._wind,
    paddingBottom: _.space + 4,
    paddingLeft: _.wind
  }
})
