import type { FC, ReactNode } from 'react';
import { Button } from '../../components/button';
import {
  colorAccentGreen,
  colorInkPrimary,
  colorInkSecondary,
  fontFamilyDisplay,
} from '../lib/styles';

interface ComponentItem {
  id: string;
  title: string;
}

interface ComponentGroup {
  category: string;
  items: ComponentItem[];
}

const componentGroups: ComponentGroup[] = [
  {
    category: 'Basic',
    items: [
      { id: 'button', title: 'Button' },
      { id: 'icon-button', title: 'IconButton' },
      { id: 'stamp', title: 'Stamp' },
      { id: 'list-item', title: 'ListItem' },
    ],
  },
  {
    category: 'Form',
    items: [
      { id: 'checkbox', title: 'Checkbox' },
      { id: 'input', title: 'Input' },
      { id: 'select', title: 'Select' },
      { id: 'textarea', title: 'Textarea' },
    ],
  },
  {
    category: 'Layout',
    items: [
      { id: 'page', title: 'Page' },
      { id: 'layout', title: 'Layout' },
      { id: 'card', title: 'Card' },
      { id: 'table', title: 'Table' },
    ],
  },
  {
    category: 'Navigation',
    items: [
      { id: 'navigation-island', title: 'Island' },
      { id: 'tabs', title: 'Tabs' },
    ],
  },
  {
    category: 'Feedback',
    items: [
      { id: 'alert', title: 'Alert' },
      { id: 'progress', title: 'Progress' },
    ],
  },
  {
    category: 'Overlay',
    items: [{ id: 'modal', title: 'Modal' }],
  },
];

interface ComponentSidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

function ActiveDot(): ReactNode {
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full"
      style={{ backgroundColor: colorAccentGreen }}
    />
  );
}

export const ComponentSidebar: FC<ComponentSidebarProps> = ({ activeSection, onNavigate }) => {
  return (
    <aside className="hidden lg:block w-72 shrink-0">
      <div
        className="sticky top-28 max-h-[calc(100vh-10rem)] overflow-y-auto pr-5"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#CBC8C1 transparent',
        }}
      >
        <nav className="space-y-8">
          {componentGroups.map((group) => (
            <div key={group.category}>
              <h3
                className="text-sm font-semibold uppercase tracking-wider mb-4 px-4"
                style={{
                  color: colorInkSecondary,
                  fontFamily: fontFamilyDisplay,
                  letterSpacing: '0.06em',
                }}
              >
                {group.category}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <Button
                      type="button"
                      variant="ghost"
                      size="small"
                      isActive={activeSection === item.id}
                      onClick={() => onNavigate(item.id)}
                      icon={activeSection === item.id ? <ActiveDot /> : undefined}
                    >
                      {item.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export const componentIds = componentGroups.flatMap((g) => g.items.map((i) => i.id));

export default ComponentSidebar;
