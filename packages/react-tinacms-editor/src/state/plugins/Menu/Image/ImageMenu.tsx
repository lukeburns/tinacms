/**

Copyright 2019 Forestry.io Inc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import React from 'react'
import { EditorView } from 'prosemirror-view'
import { MediaIcon } from '@tinacms/icons'
import { MenuButton } from '../MenuComponents'
import { insertImage } from '../../../../commands/image-commands'

interface ImageMenu {
  editorView: { view: EditorView }
  imageUpload?: () => [Promise<string>]
}

export default ({ editorView, imageUpload }: ImageMenu) => {
  if (!imageUpload) return null

  const uploadImageFn = () => {
    const imagePromises = imageUpload()
    imagePromises.forEach(promise => {
      promise.then(url => {
        const { state, dispatch } = editorView.view
        insertImage(state, dispatch, url)
        console.log(url)
      })
    })
  }

  return (
    <MenuButton onClick={uploadImageFn}>
      <MediaIcon />
    </MenuButton>
  )
}
