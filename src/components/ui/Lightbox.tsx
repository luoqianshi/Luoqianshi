import { useCallback, useEffect } from 'react'

export interface LightboxImage {
  path: string
  caption: string
  label: string
}

interface LightboxProps {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onIndexChange: (index: number) => void
}

/** 证书放大查看：支持左右切换与 Esc 关闭 */
export default function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const step = useCallback(
    (delta: number) => {
      if (images.length === 0) return
      onIndexChange((index + delta + images.length) % images.length)
    },
    [images.length, index, onIndexChange]
  )

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

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 p-4 cursor-zoom-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.label}
    >
      <img
        src={current.path}
        alt={current.label}
        className="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain bg-white"
        onClick={(e) => e.stopPropagation()}
      />

      <div
        className="mt-4 max-w-2xl text-center text-sm text-white/85 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-medium">{current.label}</p>
        {current.caption && <p className="mt-1 text-white/60">{current.caption}</p>}
        <p className="mt-1 text-xs text-white/45">
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
