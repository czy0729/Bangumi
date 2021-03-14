/*
 * @Author: czy0729
 * @Date: 2021-03-03 22:48:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-14 19:05:50
 */
import React from 'react'
import { Avatar } from '@screens/_'
import { _, tinygrailStore } from '@stores'
import { tinygrailOSS } from '@utils/app'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'

function Icon({ id, monoId, name, icon, event }, { navigation }) {
  const styles = memoStyles()
  const favor = tinygrailStore.collected(id)
  return (
    <Avatar
      style={styles.avatar}
      src={tinygrailOSS(icon)}
      name={name}
      borderWidth={favor ? 2 : 0}
      borderColor={favor ? '#ffc107' : 'transparent'}
      onPress={() => {
        t(event.id, {
          to: 'Mono',
          monoId: monoId || id,
          ...event.data
        })

        navigation.push('Mono', {
          monoId: `character/${monoId || id}`,
          _name: name
        })
      }}
    />
  )
}

export default obc(Icon)

const memoStyles = _.memoStyles(_ => ({
  avatar: {
    marginTop: _.md,
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  }
}))
