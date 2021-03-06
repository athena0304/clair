import { breakpoints } from '../config'

export default {
  install (Vue) {
    const responsive = new Vue({
      data: { media: breakpoints[0] }
    })

    const setMediaAttr = media => {
      document.documentElement.setAttribute('media', media)
    }

    // create an element to listen viewport change
    if (typeof window === 'object') {
      const element = document.createElement('div')
      element.className = 'c-responsive-listener'
      document.body.appendChild(element)
      const getMediaType = _ => {
        return breakpoints[element.clientWidth]
      }
      element.addEventListener('transitionend', e => {
        const oldMedia = responsive.media
        const media = getMediaType()
        if (oldMedia === media) return // no media change
        responsive.$emit('change', media, oldMedia)
        responsive.media = media
        setMediaAttr(media)
      })
      responsive.media = getMediaType()
      setMediaAttr(responsive.media)
    }
    Vue.prototype.$clair.responsive = responsive
  }
}
