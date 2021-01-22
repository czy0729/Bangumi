/*
 * @Author: czy0729
 * @Date: 2019-05-29 04:03:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:33:04
 */
import React from 'react'
import { ScrollView } from 'react-native'
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
      <ScrollView
        style={style}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data
          .filter((item, index) => index > 0)
          .map(item => (
            <CoverSm
              key={item.subjectId}
              title={title}
              src={item.cover || IMG_DEFAULT}
              cn={findSubjectCn(item.title, item.subjectId)}
              data={item}
            />
          ))}
      </ScrollView>
      {!!friendsChannel.length && (
        <ScrollView
          contentContainerStyle={styles.contentContainerStyleSm}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {friendsChannel
            .filter(item => item.cover !== '/img/no_img.gif')
            .map(item => (
              <CoverXs
                key={`${item.userId}|${item.id}`}
                title={title}
                avatar={$.friendsMap[item.userId]?.avatar}
                data={item}
              />
            ))}
        </ScrollView>
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
