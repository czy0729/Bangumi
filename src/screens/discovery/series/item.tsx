/*
 * @Author: czy0729
 * @Date: 2022-04-16 05:40:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-20 16:43:33
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { asc } from '@utils'
import { memo, obc } from '@utils/decorators'
import Subject from './subject'

const defaultProps = {
  styles: {},
  data: [],
  subjects: {}
}

const Item = memo(({ styles, data, subjects }) => {
  if (!data.length) return null

  // 以最小的subjectId作为pid
  const id = Math.min(...data)
  const sub = data.filter(item => item !== id)
  return (
    <View>
      <Subject id={id} />
      {!!sub.length && (
        <View style={styles.sub}>
          {sub
            .sort((a, b) =>
              asc(subjects[a]?.date || '9999-99-99', subjects[b]?.date || '9999-99-99')
            )
            .map(item => (
              <Subject key={item} style={styles.subItem} id={item} />
            ))}
        </View>
      )}
    </View>
  )
}, defaultProps)

export default obc(({ item }, { $ }) => {
  const data = $.filterData(item)
  return <Item styles={memoStyles()} data={data} subjects={$.subjects(data)} />
})

const memoStyles = _.memoStyles(() => ({
  sub: {
    marginTop: -_.sm,
    paddingLeft: _.wind + 24,
    paddingBottom: _.md
  },
  subItem: {
    paddingVertical: _.md
  }
}))
