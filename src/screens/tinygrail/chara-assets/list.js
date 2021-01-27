/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:10:28
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import ItemTemple from '../_/item-temple'
import ItemEdit from './item-edit'
import { tabs } from './store'

const event = {
  id: '我的持仓.跳转'
}

function List({ id }, { $, navigation }) {
  const { ico, _loaded } = $.myCharaAssets
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const { page } = $.state
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
      scrollToTop={id === tabs[page].key}
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

export default obc(List)
