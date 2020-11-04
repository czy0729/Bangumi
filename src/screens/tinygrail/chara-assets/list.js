/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-04 15:13:06
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { observer } from '@utils/decorators'
import ItemTemple from '../_/item-temple'
import ItemEdit from './item-edit'

const event = {
  id: '我的持仓.跳转'
}

function List({ id }, { $, navigation }) {
  const { ico, _loaded } = $.myCharaAssets
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const isChara = id === 'chara'
  const isTemple = id === 'temple'
  let data
  if (isChara) {
    data = $.charaList
  } else if (isTemple) {
    data = $.temple
  } else {
    data = ico
  }

  const numColumns = isTemple ? 3 : undefined
  return (
    <ListView
      key={String(numColumns)}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={(item, index) => String(index)}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={data}
      numColumns={numColumns}
      renderItem={({ item, index }) => {
        if (isTemple) {
          const needResetMarginLeft = _.isPad && index % 3 === 0
          return (
            <ItemTemple
              style={
                needResetMarginLeft && {
                  marginLeft: _.wind + _._wind
                }
              }
              index={index}
              {...item}
              onPress={() => {
                t('我的持仓.跳转', {
                  to: 'TinygrailSacrifice',
                  monoId: item.id
                })

                navigation.push('TinygrailSacrifice', {
                  monoId: `character/${item.id}`
                })
              }}
            />
          )
        }

        return (
          <ItemEdit
            index={index}
            item={item}
            type={id}
            users={id === 'ico' ? 'ico' : undefined} // 这里api有bug
            event={event}
          />
        )
      }}
      onHeaderRefresh={() =>
        isTemple ? $.fetchTemple() : $.fetchMyCharaAssets()
      }
    />
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)
