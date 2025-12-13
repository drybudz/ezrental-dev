import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source) => {
  return builder.image(source)
}

/**
 * Convert Sanity hotspot coordinates to CSS object-position
 * Hotspot coordinates are normalized (0-1), we convert to percentages
 */
export const getHotspotPosition = (hotspot) => {
  if (!hotspot || typeof hotspot.x === 'undefined' || typeof hotspot.y === 'undefined') {
    return 'center'; // Default to center if no hotspot
  }
  
  // Convert normalized coordinates (0-1) to percentages
  const x = hotspot.x * 100;
  const y = hotspot.y * 100;
  
  return `${x}% ${y}%`;
}
