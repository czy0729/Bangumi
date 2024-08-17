/*
 * @Author: czy0729
 * @Date: 2024-08-14 06:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-16 08:04:49
 */
import React from 'react'
import { _ } from '@stores'
import { Bgm } from '../../bgm'
import ToggleImage from '../toggle-image'

export function img({ key, src, autoSize, show, onImageFallback }) {
  if (src.indexOf('/img/smiles/') === 0) {
    const index = src.match(/\/(\d+)\./)?.[1]
    if (index) return <Bgm key={key} index={index} size={18} />
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
