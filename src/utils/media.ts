import type { IMedia } from '@/types'

/**
 * The new object URL represents the specified `File` object or `Blob` object.
 *
 * @param {Blob} object A `File`, `Blob`, or `MediaSource` object to create an object URL.
 */
export function createObjectURL(object: Blob): string {
  return 'URL' in window ? URL.createObjectURL(object) : webkitURL.createObjectURL(object)
}

/**
 * GET File from list.
 *
 * @param {object} files FileList
 * @param {number} at Index of list
 */
export function getFileListAt(files: FileList | null, at: number = 0): File | null {
  if (files instanceof FileList) {
    return files.item(at)
  }

  return null
}

export async function getMediaBlob(file: string | Blob | File): Promise<IMedia> {
  if (typeof file === 'string') {
    const response = await fetch(file).then((r) => r.blob())
    return {
      url: createObjectURL(response),
      isImage: response.type.includes('image'),
      isVideo: response.type.includes('video'),
      isAudio: response.type.includes('audio')
    }
  }

  return {
    url: createObjectURL(file),
    isImage: file.type.includes('image'),
    isVideo: file.type.includes('video'),
    isAudio: file.type.includes('audio')
  }
}

export function playSound() {
  const audio = new Audio('/static/media/ww-click.mp3')
  audio.play()
}
