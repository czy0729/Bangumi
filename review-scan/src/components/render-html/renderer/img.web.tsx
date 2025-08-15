/*
 * @Author: czy0729
 * @Date: 2024-08-14 06:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 12:52:20
 */
import React from 'react'
import { _, rakuenStore } from '@stores'
import { Bgm } from '../../bgm'
import LinkImage from '../link-image'
import ToggleImage from '../toggle-image'

export function img({ key, src, alt, autoSize, show, onImageFallback }) {
  let index: number
  if (src.indexOf('/img/smiles/') === 0) {
    index = Number(src.match(/\/(\d+)\./)?.[1])
  } else if (/^\(bgm\d+\)$/.test(alt)) {
    index = Number(alt.match(/(\d+)/)?.[1]) - 23
  }
  if (index) return <Bgm key={key} index={index} size={18} />

  if (!Number(rakuenStore.setting.autoLoadImageV2 || 0)) {
    return <LinkImage key={key} style={_.mt.xs} src={src || ''} />
  }

  return (
    <ToggleImage
      key={key}
      style={_.mt.xs}
      src={src || ''}
      autoSize={autoSize}
      placeholder={false}
      imageViewer
      show={show}
      onImageFallback={() => onImageFallback(src)}
    />
  )
}
