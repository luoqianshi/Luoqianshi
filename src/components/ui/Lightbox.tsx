import { useCallback, useEffect, useState } from 'react'

export interface LightboxImage {
  /** 高清原图 */
  path: string
  /** 列表已缓存的缩略图，放大时先显示它再淡入原图 */
  thumb?: string
  caption: string
  label: string
}

interface LightboxProps {
  images: LightboxImage[]
  index: number
  /** 证书等私密图片：禁用右键与拖拽保存，并叠加水印 */
  secure?: boolean
  onClose: () => void
  onIndexChange: (index: number) => void
}

/** 证书放大查看：缩略图 -> 原图渐进加载，支持左右切换与 Esc 关闭 */
export default function Lightbox({
  images,
  index,
  secure = false,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const [loaded, setLoaded] = useState(false)

  const step = useCallback(
    (delta: number) => {
      if (images.length === 0) return
      onIndexChange((index + delta + images.length) % images.length)
    },
    [images.length, index, onIndexChange]
  )

  useEffect(() => {
    setLoaded(false)
  }, [index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, step])

  const current = images[index]
  if (!current) return null

  const placeholder = current.thumb
  const guardProps = secure
    ? { draggable: false, onContextMenu: (e: React.MouseEvent) => e.preventDefault() }
    : {}
  const guardClass = secure ? 'img-guard' : ''

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 p-4 cursor-zoom-out"
      onClick={onClose}
      onContextMenu={secure ? (e) => e.preventDefault() : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={current.label}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {placeholder ? (
          <>
            <img
              src={placeholder}
              alt=""
              aria-hidden="true"
              {...guardProps}
              className={`block max-w-full max-h-[76vh] object-contain rounded-lg bg-white blur-[3px] transition-opacity duration-500 ${
                loaded ? 'opacity-0' : 'opacity-100'
              } ${guardClass}`}
            />
            <img
              src={current.path}
              alt={current.label}
              loading="eager"
              decoding="async"
              onLoad={() => setLoaded(true)}
              {...guardProps}
              className={`absolute inset-0 h-full w-full object-contain rounded-lg bg-white transition-opacity duration-500 ${
                loaded ? 'opacity-100' : 'opacity-0'
              } ${guardClass}`}
            />
          </>
        ) : (
          <img
            src={current.path}
            alt={current.label}
            loading="eager"
            decoding="async"
            onLoad={() => setLoaded(true)}
            {...guardProps}
            className={`block max-w-full max-h-[76vh] object-contain rounded-lg bg-white shadow-2xl transition-opacity duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${guardClass}`}
          />
        )}
        {secure && <span aria-hidden="true" className="cert-watermark absolute inset-0 rounded-lg" />}
      </div>

      <div
        className="mt-4 max-w-2xl text-center text-sm text-white/85 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-medium">{current.label}</p>
        {current.caption && <p className="mt-1 text-white/60">{current.caption}</p>}
        <p className="mt-1 text-xs text-white/45">
          {loaded ? '' : '原图加载中 · '}
          {index + 1} / {images.length}
        </p>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="上一张"
            onClick={(e) => {
              e.stopPropagation()
              step(-1)
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/25 text-white/80 hover:bg-white/10 transition-colors"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="下一张"
            onClick={(e) => {
              e.stopPropagation()
              step(1)
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/25 text-white/80 hover:bg-white/10 transition-colors"
          >
            ›
          </button>
        </>
      )}

      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute right-4 top-4 h-9 w-9 rounded-full border border-white/25 text-white/80 hover:bg-white/10 transition-colors"
      >
        ×
      </button>
    </div>
  )
}
