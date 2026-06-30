import type { FC, ReactNode } from 'react';
import type { PropDef } from '../../components/prop-table';
import { Stamp } from '../../components/stamp';
import { categoryColors } from '../lib/category-colors';
import {
  colorInkPrimary,
  colorInkSecondary,
  colorInkTertiary,
  fontFamilyDisplay,
  fontFamilyMono,
  fontFamilySerif,
  paperCardStyle,
} from '../lib/styles';

interface ComponentSectionProps {
  id: string;
  title: string;
  description: string;
  category: 'basic' | 'form' | 'layout' | 'navigation' | 'feedback' | 'overlay';
  children: ReactNode;
  chalkboard?: boolean;
  codeExample?: string;
  props?: PropDef[];
  onViewDetails?: () => void;
}

const categoryLabels: Record<string, string> = {
  basic: 'Basic',
  form: 'Form',
  layout: 'Layout',
  navigation: 'Navigation',
  feedback: 'Feedback',
  overlay: 'Overlay',
};

const chalkboardCardStyle: React.CSSProperties = {
  backgroundColor: '#2d4a35',
  borderColor: 'rgba(212, 232, 203, 0.2)',
};

export const ComponentSection: FC<ComponentSectionProps> = ({
  id,
  title,
  description,
  category,
  children,
  chalkboard = false,
  onViewDetails,
}) => {
  const catStyle = categoryColors[category];

  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h2
            className="text-3xl font-bold"
            style={{
              fontFamily: fontFamilyDisplay,
              color: colorInkPrimary,
              fontWeight: 700,
            }}
          >
            {title}
          </h2>
          <Stamp size="small" fillColor={catStyle.bg} textColor={catStyle.text}>
            {categoryLabels[category]}
          </Stamp>
        </div>
        <p
          style={{
            color: colorInkSecondary,
            fontFamily: fontFamilySerif,
            fontSize: '1.25rem',
          }}
        >
          {description}
        </p>
      </div>

      <div
        className="p-10 rounded-2xl min-h-[140px] flex items-center justify-center border mb-4"
        style={chalkboard ? chalkboardCardStyle : paperCardStyle}
      >
        {children}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onViewDetails}
          style={{
            fontFamily: fontFamilyMono,
            fontSize: '0.8rem',
            fontWeight: 500,
            color: colorInkTertiary,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
            letterSpacing: '0.03em',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colorInkPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colorInkTertiary;
          }}
        >
          View details &rarr;
        </button>
      </div>
    </section>
  );
};

export type { ComponentSectionProps, PropDef };
export default ComponentSection;
