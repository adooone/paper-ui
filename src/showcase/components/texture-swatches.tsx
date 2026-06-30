import { useCallback } from 'react';
import type { FC } from 'react';
import { CopyButton } from '../../components/copy-button';
import { Swatch } from '../../components/swatch';
import {
  type PaperTextureKey,
  type RuledColorKey,
  type RuledType,
  type TextureConfig,
  buildTextureStyles,
  getRuledColorByKey,
  getTextureByKey,
  ruledColors,
  textures,
} from '../lib/textures';

export interface TextureSwatchesProps {
  value: TextureConfig;
  onChange: (config: TextureConfig) => void;
  compact?: boolean;
  showPreview?: boolean;
}

export const TextureSwatches: FC<TextureSwatchesProps> = ({
  value,
  onChange,
  compact = false,
  showPreview = false,
}) => {
  const currentTexture =
    (value.texture ? getTextureByKey(value.texture) : undefined) ?? textures[0];
  const currentRuledColor =
    (value.ruledColor ? getRuledColorByKey(value.ruledColor) : undefined) ?? ruledColors[0];

  const setTexture = useCallback(
    (texture: PaperTextureKey) => onChange({ ...value, texture }),
    [value, onChange],
  );
  const setRuledType = useCallback(
    (ruledType: RuledType) => onChange({ ...value, ruledType }),
    [value, onChange],
  );
  const setRuledColor = useCallback(
    (ruledColor: RuledColorKey) => onChange({ ...value, ruledColor }),
    [value, onChange],
  );

  const swatchSize = compact ? 'w-10 h-10' : 'w-14 h-14';
  const gap = compact ? 'gap-2' : 'gap-3';

  const previewStyles = showPreview ? buildTextureStyles(value) : {};

  const ruledLabelText =
    value.ruledType === 'none'
      ? currentTexture.name
      : `${currentTexture.name} with ${currentRuledColor.name} ${value.ruledType === 'lines' ? 'Lines' : 'Grid'}`;

  const classValue =
    value.ruledType === 'none'
      ? `bg-${value.texture}-texture`
      : value.ruledType === 'lines'
        ? `bg-${value.texture}-texture bg-ruled-${value.ruledColor}-lines`
        : `bg-${value.texture}-texture bg-ruled-${value.ruledColor}-grid`;

  return (
    <div className="space-y-3">
      {showPreview && (
        <div
          className="rounded-2xl flex items-center justify-center"
          style={{
            ...previewStyles,
            height: compact ? 160 : 240,
            border: '2px solid rgba(61, 53, 43, 0.15)',
            boxShadow: '0 10px 15px rgba(61, 53, 43, 0.1), 0 4px 6px rgba(61, 53, 43, 0.08)',
          }}
        >
          <div
            className="text-center"
            style={{ fontFamily: "'Luminari', serif", color: '#1A1917' }}
          >
            <div className={compact ? 'text-5xl mb-2' : 'text-7xl mb-3'}>P</div>
            <div
              className={compact ? 'text-sm' : 'text-base'}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#68635C',
              }}
            >
              {currentTexture.name}
              {value.ruledType !== 'none' && ` / ${value.ruledType}`}
            </div>
          </div>
        </div>
      )}

      <div className={`flex flex-wrap ${gap}`}>
        {textures
          .filter((t) => t.key !== 'chalkboard')
          .map((texture) => (
            <Swatch
              key={texture.key}
              active={value.texture === texture.key}
              className={swatchSize}
              title={texture.name}
              onClick={() => setTexture(texture.key)}
              style={{
                backgroundColor: texture.color,
                backgroundImage: texture.bg,
                backgroundRepeat: 'repeat',
                backgroundSize: '100px 100px',
              }}
            />
          ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span
            className="text-xs shrink-0"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#A8A399',
              fontSize: compact ? '1rem' : '1.15rem',
            }}
          >
            Choose ruled type
          </span>
          <div className={`flex items-center ${gap}`}>
            <Swatch
              active={value.ruledType === 'none'}
              className={swatchSize}
              title="Plain"
              onClick={() => setRuledType('none')}
              style={{
                backgroundColor: currentTexture.color,
                backgroundImage: currentTexture.bg,
                backgroundRepeat: 'repeat',
                backgroundSize: '100px 100px',
              }}
            />
            <Swatch
              active={value.ruledType === 'lines'}
              className={swatchSize}
              title="Lines"
              onClick={() => setRuledType('lines')}
              style={{
                backgroundColor: currentTexture.color,
                backgroundImage: `${currentTexture.bg}, repeating-linear-gradient(180deg, transparent, transparent 8px, rgba(168,200,216,0.6) 8px, rgba(168,200,216,0.6) 10px)`,
                backgroundRepeat: 'repeat',
                backgroundSize: '100px 100px',
              }}
            />
            <Swatch
              active={value.ruledType === 'grid'}
              className={swatchSize}
              title="Grid"
              onClick={() => setRuledType('grid')}
              style={{
                backgroundColor: currentTexture.color,
                backgroundImage: `${currentTexture.bg}, repeating-linear-gradient(180deg, transparent, transparent 8px, rgba(168,200,216,0.5) 8px, rgba(168,200,216,0.5) 10px), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(168,200,216,0.5) 8px, rgba(168,200,216,0.5) 10px)`,
                backgroundRepeat: 'repeat',
                backgroundSize: '100px 100px',
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-xs shrink-0"
            style={{
              fontFamily: "'Caveat', cursive",
              color: '#A8A399',
              fontSize: compact ? '1rem' : '1.15rem',
            }}
          >
            Choose color of the line
          </span>
          <div className={`flex items-center ${gap}`}>
            {ruledColors.map((color) => {
              const isDisabled = value.ruledType === 'none';
              const isActive = value.ruledColor === color.key && !isDisabled;
              const lineZoom =
                value.ruledType === 'grid'
                  ? `linear-gradient(180deg, transparent 52%, ${color.value} 52%, ${color.value} 62%, transparent 62%), linear-gradient(90deg, transparent 52%, ${color.value} 52%, ${color.value} 62%, transparent 62%)`
                  : `linear-gradient(180deg, transparent 52%, ${color.value} 52%, ${color.value} 62%, transparent 62%)`;
              return (
                <Swatch
                  key={color.key}
                  active={isActive}
                  disabled={isDisabled}
                  className={swatchSize}
                  title={isDisabled ? `${color.name} — select Lines or Grid` : color.name}
                  onClick={() => {
                    if (!isDisabled) setRuledColor(color.key);
                  }}
                  style={{
                    backgroundColor: '#FAF8F0',
                    backgroundImage: isDisabled ? 'none' : lineZoom,
                    backgroundSize: '100% 100%',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <p
        className="text-center"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          color: '#68635C',
          fontSize: '1.1rem',
        }}
      >
        {ruledLabelText}
      </p>

      <div
        className="rounded-xl border w-full overflow-hidden"
        style={{
          backgroundColor: '#FAF8F0',
          borderColor: 'rgba(61, 53, 43, 0.12)',
        }}
      >
        <div
          className="px-3 py-1.5 text-xs flex items-center justify-between border-b"
          style={{
            backgroundColor: '#F5F1E6',
            borderColor: 'rgba(61, 53, 43, 0.12)',
            color: '#68635C',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <span>Tailwind class</span>
          <CopyButton text={classValue} />
        </div>
        <pre
          className="p-3 text-xs overflow-x-auto"
          style={{
            color: '#1A1917',
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.6,
            whiteSpace: 'pre',
            wordWrap: 'normal',
          }}
        >
          <code>{classValue}</code>
        </pre>
      </div>
    </div>
  );
};

export default TextureSwatches;
