import { useCallback, useEffect, useState } from 'react';
import type { FC } from 'react';
import { Accordion } from '../../components/accordion';
import { Alert } from '../../components/alert';
import { Avatar } from '../../components/avatar';
import { Breadcrumb } from '../../components/breadcrumb';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Checkbox } from '../../components/checkbox';
import { Divider } from '../../components/divider';
import { IconButton } from '../../components/icon-button';
import { Input } from '../../components/input';
import { Island } from '../../components/island';
import { Layout } from '../../components/layout';
import { ListItem } from '../../components/list-item';
import { Menu } from '../../components/menu';
import { Modal } from '../../components/modal';
import { NavigationIsland } from '../../components/navigation-island';
import { Page } from '../../components/page';
import { Progress } from '../../components/progress';
import type { PropDef } from '../../components/prop-table';
import { Radio, RadioGroup } from '../../components/radio';
import { Select } from '../../components/select';
import { Skeleton } from '../../components/skeleton';
import { Spinner } from '../../components/spinner';
import { Stamp } from '../../components/stamp';
import { Switch } from '../../components/switch';
import { Table } from '../../components/table';
import { Tabs } from '../../components/tabs';
import { Textarea } from '../../components/textarea';
import { Tooltip } from '../../components/tooltip';
import { ComponentSection } from '../components/component-section';
import { ComponentSidebar, componentIds } from '../components/component-sidebar';
import { PaginationDemo } from '../components/pagination-demo';
import { ToastDemo } from '../components/toast-demo';
import {
  colorInkPrimary,
  colorInkSecondary,
  colorInkTertiary,
  fontFamilyDisplay,
  fontFamilySerif,
} from '../lib/styles';

const variantProp: PropDef = {
  name: 'variant',
  type: "'primary' | 'secondary' | 'ghost' | 'danger'",
  default: "'primary'",
  description: 'Visual style variant',
};

const sizeProp: PropDef = {
  name: 'size',
  type: "'small' | 'medium' | 'large'",
  default: "'medium'",
  description: 'Component size',
};

const disabledProp: PropDef = {
  name: 'disabled',
  type: 'boolean',
  default: 'false',
  description: 'Disable interactions',
};

interface SectionDetail {
  id: string;
  title: string;
  codeExample: string;
  props?: PropDef[];
}

const sectionDetails: SectionDetail[] = [
  {
    id: 'button',
    title: 'Button',
    codeExample: `import { Button } from '@dendelion/paper-ui';

<Button variant="primary" size="medium" onClick={handleClick}>
  Primary
</Button>
<Button variant="secondary" size="small">
  Secondary
</Button>
<Button variant="danger" size="large">
  Danger
</Button>
<Button variant="ghost">Ghost</Button>`,
    props: [
      variantProp,
      sizeProp,
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Left icon element',
      },
      {
        name: 'iconRight',
        type: 'ReactNode',
        description: 'Right icon element',
      },
      {
        name: 'fullWidth',
        type: 'boolean',
        default: 'false',
        description: 'Expand to full width',
      },
      {
        name: 'onClick',
        type: '() => void',
        description: 'Click handler',
      },
      disabledProp,
      {
        name: 'wobble',
        type: 'number (0-1)',
        default: '0.5',
        description: 'Blob shape wobble intensity',
      },
    ],
  },
  {
    id: 'icon-button',
    title: 'IconButton',
    codeExample: `import { IconButton } from '@dendelion/paper-ui';

<IconButton icon={<HeartIcon />} label="Like" variant="default" />
<IconButton icon={<HeartIcon />} label="Like" variant="ghost" />
<IconButton icon={<TrashIcon />} label="Delete" variant="danger" />`,
    props: [
      {
        name: 'icon',
        type: 'ReactNode',
        required: true,
        description: 'Icon content',
      },
      {
        name: 'variant',
        type: "'default' | 'ghost' | 'danger'",
        default: "'default'",
        description: 'Visual style variant',
      },
      sizeProp,
      {
        name: 'label',
        type: 'string',
        description: 'Accessibility label',
      },
      disabledProp,
      {
        name: 'wobble',
        type: 'number (0-1)',
        default: '0.5',
        description: 'Blob shape wobble intensity',
      },
    ],
  },
  {
    id: 'stamp',
    title: 'Stamp',
    codeExample: `import { Stamp } from '@dendelion/paper-ui';

<Stamp fillColor="rgba(143, 185, 150, 0.25)" textColor="#3D5A42">
  Done
</Stamp>
<Stamp size="large" fillColor="rgba(212, 163, 115, 0.25)">
  Draft
</Stamp>

// Semantic status tag: a lower wobble plus a variant reads as a
// quieter, repeatable label instead of a one-off decorative mark.
<Stamp variant="success" dot wobble={0} size="small">
  Active
</Stamp>`,
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Stamp text content',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Stamp size',
      },
      {
        name: 'variant',
        type: "'neutral' | 'info' | 'success' | 'warning' | 'error'",
        description:
          'Semantic color shortcut for fillColor/textColor, with a matching ink ring. Lower wobble toward 0 for a status-tag look that repeats consistently.',
      },
      {
        name: 'dot',
        type: 'boolean',
        default: 'false',
        description: 'Show a leading status dot',
      },
      {
        name: 'fillColor',
        type: 'string',
        description: 'SVG blob fill color, overrides variant',
      },
      {
        name: 'textColor',
        type: 'string',
        description: 'Text color override, overrides variant',
      },
      {
        name: 'wobble',
        type: 'number (0-1)',
        default: '0.3',
        description: 'Blob shape wobble intensity',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'checkbox',
    title: 'Checkbox',
    codeExample: `import { Checkbox } from '@dendelion/paper-ui';

<Checkbox
  label="Enable notifications"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
<Checkbox label="Disabled" disabled checked={false} onChange={() => {}} />`,
    props: [
      {
        name: 'checked',
        type: 'boolean',
        required: true,
        description: 'Checked state',
      },
      {
        name: 'onChange',
        type: '(e: ChangeEvent) => void',
        required: true,
        description: 'Change handler',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Checkbox label',
      },
      {
        name: 'labelPosition',
        type: "'left' | 'right'",
        default: "'right'",
        description: 'Label position',
      },
      {
        name: 'indeterminate',
        type: 'boolean',
        default: 'false',
        description: 'Indeterminate state',
      },
      {
        name: 'wobble',
        type: 'number (0-1)',
        default: '0.4',
        description: 'Blob shape wobble intensity',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
      disabledProp,
    ],
  },
  {
    id: 'input',
    title: 'Input',
    codeExample: `import { Input } from '@dendelion/paper-ui';

<Input
  label="Project name"
  placeholder="Enter a name..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
<Input label="Email" type="email" error helperText="Invalid email address" />`,
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Field label',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Helper or error message',
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        description: 'Show error state',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Input size',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
      disabledProp,
    ],
  },
  {
    id: 'select',
    title: 'Select',
    codeExample: `import { Select } from '@dendelion/paper-ui';

<Select
  label="Texture"
  options={[
    { value: 'paper', label: 'Paper' },
    { value: 'canvas', label: 'Canvas' },
  ]}
  value={value}
  onChange={setValue}
/>`,
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Field label',
      },
      {
        name: 'options',
        type: 'SelectOption[]',
        required: true,
        description: 'Dropdown options ({ value, label, disabled? })',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder option text',
      },
      {
        name: 'value',
        type: 'string',
        description: 'Selected value (controlled)',
      },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'Initial value (uncontrolled)',
      },
      {
        name: 'onChange',
        type: '(value: string) => void',
        description: 'Called with the newly selected value',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Helper or error message',
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        description: 'Show error state',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Select size',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
      {
        name: 'texture',
        type: 'boolean | PaperTextureKey | TextureConfig',
        default: 'false',
        description: 'Dropdown background texture: a name, a config, or false to disable',
      },
      {
        name: 'width',
        type: 'string | number',
        description: 'Fixed width (e.g., 200 or "10rem"). Full width if omitted.',
      },
      disabledProp,
    ],
  },
  {
    id: 'layout',
    title: 'Layout',
    codeExample: `import { Layout, Page } from '@dendelion/paper-ui';

<Layout
  title="Paper Camp"
  subtitle="Dashboard"
  navigationItems={[
    { id: 'dash', label: 'Dashboard', path: '/' },
    { id: 'plans', label: 'Plans', path: '/plans' },
  ]}
  activeItemId="dash"
  onNavigate={(item) => navigate(item.path)}
>
  <Page>
    <h1>Content</h1>
  </Page>
</Layout>`,
    props: [
      {
        name: 'title',
        type: 'string',
        description: 'Header title',
      },
      {
        name: 'subtitle',
        type: 'string',
        description: 'Header subtitle',
      },
      {
        name: 'navigationItems',
        type: 'NavigationItem[]',
        description: 'Sidebar navigation items',
      },
      {
        name: 'activeItemId',
        type: 'string',
        description: 'Active navigation item ID',
      },
      {
        name: 'onNavigate',
        type: '(item: NavigationItem) => void',
        description: 'Navigation handler',
      },
      {
        name: 'showSidebar',
        type: 'boolean',
        default: 'true',
        description: 'Show sidebar',
      },
      {
        name: 'showHeader',
        type: 'boolean',
        default: 'true',
        description: 'Show header bar',
      },
      {
        name: 'showPage',
        type: 'boolean',
        default: 'false',
        description: 'Wrap children in a Page component',
      },
      {
        name: 'showFooter',
        type: 'boolean',
        default: 'false',
        description: 'Show footer area',
      },
      {
        name: 'background',
        type: 'LayoutBackground',
        description: 'Layout background (texture, image, or plain)',
      },
      {
        name: 'headerActions',
        type: 'ReactNode',
        description: 'Header action elements',
      },
      {
        name: 'logo',
        type: 'ReactNode',
        description: 'Custom logo element, replacing the default title/subtitle mark',
      },
      {
        name: 'footerContent',
        type: 'ReactNode',
        description: 'Custom footer content, shown when showFooter is true',
      },
      {
        name: 'navigationIsland',
        type: 'ReactNode',
        description: 'Floating element (typically a NavigationIsland) anchored to the layout',
      },
    ],
  },
  {
    id: 'page',
    title: 'Page',
    codeExample: `import { Page } from '@dendelion/paper-ui';

<Page withAccent accentColor="green">
  <h2>Journal Entry</h2>
  <p>Content on textured paper.</p>
</Page>`,
    props: [
      {
        name: 'texture',
        type: 'boolean | PaperTextureKey | TextureConfig',
        default: 'true',
        description: 'Background texture: a name, a config, or false to disable',
      },
      {
        name: 'withAccent',
        type: 'boolean',
        default: 'false',
        description: 'Show watercolor accent blob',
      },
      {
        name: 'accentColor',
        type: "'blue' | 'green' | 'amber' | 'rose' | 'slate'",
        default: "'blue'",
        description: 'Accent blob color',
      },
    ],
  },
  {
    id: 'card',
    title: 'Card',
    codeExample: `import { Card } from '@dendelion/paper-ui';

<Card texture="parchment" accent accentColor="green">
  <h3>Project Notes</h3>
  <p>Hand-written on textured paper.</p>
</Card>`,
    props: [
      {
        name: 'variant',
        type: "'default' | 'elevated'",
        default: "'default'",
        description: 'Visual elevation style',
      },
      {
        name: 'size',
        type: "'default' | 'small'",
        default: "'default'",
        description: 'Card size — small reduces padding and font size',
      },
      {
        name: 'texture',
        type: "PaperTextureKey ('white' | 'paper' | 'parchment' | 'kraft' | 'speckle' | 'canvas')",
        default: "'parchment'",
        description: 'Paper texture for the card surface',
      },
      {
        name: 'accent',
        type: 'boolean',
        default: 'false',
        description: 'Show watercolor accent blob',
      },
      {
        name: 'accentColor',
        type: "'blue' | 'green' | 'amber' | 'rose' | 'slate'",
        default: "'blue'",
        description: 'Accent blob color',
      },
    ],
  },
  {
    id: 'table',
    title: 'Table',
    codeExample: `import { Table } from '@dendelion/paper-ui';

<Table
  variant="grid"
  texture={{ texture: 'paper', ruledType: 'none' }}
  toolbar={{
    search: { placeholder: 'Find entry...', value, onChange: setQuery },
    actions: <IconButton icon={<FilterIcon />} label="Filter" />,
  }}
  columns={[
    { key: 'name', header: 'Name', width: 7, cell: (r) => r.name },
    { key: 'status', header: 'Status', width: 4, cell: (r) => r.status },
  ]}
  data={[{ name: 'Notebook', status: 'Draft' }]}
/>`,
    props: [
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Table visual style',
      },
      {
        name: 'texture',
        type: 'TextureConfig',
        description: 'Paper texture configuration',
      },
      {
        name: 'columns',
        type: 'TableColumn<T>[]',
        required: true,
        description: 'Column definitions (width in grid squares of 32px)',
      },
      {
        name: 'data',
        type: 'T[]',
        required: true,
        description: 'Row data',
      },
      {
        name: 'toolbar',
        type: 'TableToolbar',
        description: 'Search and action bar config',
      },
      {
        name: 'board',
        type: 'TableBoardColumn<T>[]',
        description: 'Renders a Kanban-style board of card lanes instead of rows, when set',
      },
      {
        name: 'expandable',
        type: 'TableExpandableConfig<T>',
        description: 'Renders an expand toggle per row with custom detail content',
      },
      {
        name: 'showExpandColumn',
        type: 'boolean',
        default: 'true',
        description: 'Show the expand-toggle column when expandable is set',
      },
      {
        name: 'rowClassName',
        type: '(row: T, index: number) => string | undefined',
        description: 'Per-row class name override',
      },
    ],
  },
  {
    id: 'island',
    title: 'Island',
    codeExample: `import { Island } from '@dendelion/paper-ui';

<Island surface="paper">
  <span>Controls go here</span>
</Island>`,
    props: [
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Content to render inside the island',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Visual style variant',
      },
    ],
  },
  {
    id: 'navigation-island',
    title: 'NavigationIsland',
    codeExample: `import { NavigationIsland } from '@dendelion/paper-ui';

<NavigationIsland
  items={[
    { id: 'dash', label: 'Dashboard', icon: <HomeIcon /> },
    { id: 'plans', label: 'Plans', icon: <FolderIcon /> },
  ]}
  activeId={activeId}
  onSelect={setActiveId}
  position="bottom"
/>`,
    props: [
      {
        name: 'items',
        type: 'NavigationIslandItem[]',
        required: true,
        description: 'Nav entries ({ id, label, icon? })',
      },
      {
        name: 'activeId',
        type: 'string',
        description: 'Currently active item id',
      },
      {
        name: 'onSelect',
        type: '(id: string) => void',
        description: 'Called when an item is clicked',
      },
      {
        name: 'position',
        type: "'top' | 'bottom'",
        default: "'bottom'",
        description: 'Fixed edge of the viewport to anchor to',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Visual style variant',
      },
    ],
  },
  {
    id: 'tabs',
    title: 'Tabs',
    codeExample: `import { Tabs } from '@dendelion/paper-ui';

<Tabs
  items={[
    { id: 'design', label: 'Design', children: <p>Design content</p> },
    { id: 'code', label: 'Code', children: <p>Code content</p> },
    { id: 'preview', label: 'Preview', children: <p>Preview content</p> },
  ]}
  activeKey="design"
  onSelect={(id) => setTab(id)}
/>`,
    props: [
      {
        name: 'items',
        type: 'TabItem[]',
        required: true,
        description: 'Tab items with id, label, optional icon, and children content',
      },
      {
        name: 'activeKey',
        type: 'string',
        description: 'Active tab ID',
      },
      {
        name: 'onSelect',
        type: '(id: string) => void',
        description: 'Tab selection handler',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        description: 'Surface style (passed to Card)',
      },
    ],
  },
  {
    id: 'alert',
    title: 'Alert',
    codeExample: `import { Alert } from '@dendelion/paper-ui';

<Alert variant="success" title="Saved">
  Your changes have been saved to the journal.
</Alert>
<Alert variant="error" title="Error" dismissible onDismiss={handleDismiss}>
  Unable to connect to the server.
</Alert>`,
    props: [
      {
        name: 'variant',
        type: "'info' | 'success' | 'warning' | 'error'",
        default: "'info'",
        description: 'Alert tone',
      },
      {
        name: 'texture',
        type: 'PaperTextureKey',
        default: "'kraft'",
        description: 'Paper texture for the background',
      },
      {
        name: 'title',
        type: 'string',
        description: 'Alert heading (Luminari font)',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'false',
        description: 'Show close button',
      },
      {
        name: 'onDismiss',
        type: '() => void',
        description: 'Dismiss handler',
      },
    ],
  },
  {
    id: 'toast',
    title: 'Toast',
    codeExample: `import { ToastProvider, useToast } from '@dendelion/paper-ui';

function SaveButton() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ variant: 'success', title: 'Saved' })}>
      Save
    </Button>
  );
}

<ToastProvider position="bottom-right">
  <SaveButton />
</ToastProvider>`,
    props: [
      {
        name: 'position',
        type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
        default: "'bottom-right'",
        description: 'Corner/edge the stack renders from (ToastProvider)',
      },
      {
        name: 'defaultDuration',
        type: 'number',
        default: '5000',
        description: 'Auto-dismiss delay in ms; a toast can override it (ToastProvider)',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style for all toasts (ToastProvider)',
      },
      {
        name: 'toast(options)',
        type: '(options: ToastOptions) => string',
        description: 'From useToast() — shows a toast, returns its id',
      },
      {
        name: 'dismiss(id)',
        type: '(id: string) => void',
        description: 'From useToast() — closes a toast early',
      },
    ],
  },
  {
    id: 'list-item',
    title: 'ListItem',
    codeExample: `import { ListItem } from '@dendelion/paper-ui';

<ListItem onClick={handleClick} icon={<Icon />}>
  Dashboard
</ListItem>
<ListItem active icon={<Dot />} action={<Stamp>3</Stamp>}>
  Notifications
</ListItem>`,
    props: [
      {
        name: 'active',
        type: 'boolean',
        default: 'false',
        description: 'Highlight active state',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        description: 'Left icon element',
      },
      {
        name: 'action',
        type: 'ReactNode',
        description: 'Right-side action element',
      },
      sizeProp,
      {
        name: 'onClick',
        type: '() => void',
        description: 'Makes the item clickable with hover/active states',
      },
      {
        name: 'wobble',
        type: 'number (0-1)',
        default: '0.5',
        description: 'Blob shape wobble intensity',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'textarea',
    title: 'Textarea',
    codeExample: `import { Textarea } from '@dendelion/paper-ui';

<Textarea
  label="Notes"
  placeholder="Write your notes..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
<Textarea label="Error" error helperText="This field is required" />`,
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Field label',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Placeholder text',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Helper or error message',
      },
      {
        name: 'error',
        type: 'boolean',
        default: 'false',
        description: 'Show error state',
      },
      sizeProp,
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Visual style variant',
      },
    ],
  },
  {
    id: 'progress',
    title: 'Progress',
    codeExample: `import { Progress } from '@dendelion/paper-ui';

<Progress value={65} />
<Progress value={42} color="#D4A373" height={8} />`,
    props: [
      {
        name: 'value',
        type: 'number',
        required: true,
        description: 'Current progress value',
      },
      {
        name: 'max',
        type: 'number',
        default: '100',
        description: 'Maximum value',
      },
      {
        name: 'color',
        type: 'string',
        description: 'Fill color (defaults to accent green)',
      },
      {
        name: 'height',
        type: 'number',
        default: '6',
        description: 'Track height in pixels',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'modal',
    title: 'Modal',
    codeExample: `import { Modal } from '@dendelion/paper-ui';

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm"
  size="medium"
>
  <p>Are you sure you want to proceed?</p>
</Modal>`,
    props: [
      {
        name: 'open',
        type: 'boolean',
        required: true,
        description: 'Modal visibility',
      },
      {
        name: 'onClose',
        type: '() => void',
        required: true,
        description: 'Close handler',
      },
      {
        name: 'title',
        type: 'string',
        description: 'Modal heading',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Modal body content',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large'",
        default: "'medium'",
        description: 'Modal width',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
      {
        name: 'texture',
        type: 'boolean | PaperTextureKey | TextureConfig',
        default: 'false',
        description: 'Background texture: a name, a config, or false to disable',
      },
    ],
  },
  {
    id: 'radio',
    title: 'Radio',
    codeExample: `import { RadioGroup } from '@dendelion/paper-ui';

<RadioGroup
  value={value}
  onChange={setValue}
  options={[
    { value: 'paper', label: 'Paper' },
    { value: 'kraft', label: 'Kraft' },
    { value: 'canvas', label: 'Canvas' },
  ]}
/>`,
    props: [
      {
        name: 'options',
        type: 'RadioOption[]',
        required: true,
        description: 'Radio choices ({ value, label, disabled? })',
      },
      {
        name: 'value',
        type: 'string',
        description: 'Selected value (controlled)',
      },
      {
        name: 'onChange',
        type: '(value: string) => void',
        description: 'Selection handler',
      },
      {
        name: 'orientation',
        type: "'vertical' | 'horizontal'",
        default: "'vertical'",
        description: 'Layout direction',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'switch',
    title: 'Switch',
    codeExample: `import { Switch } from '@dendelion/paper-ui';

<Switch label="Notifications" checked={on} onChange={(e) => setOn(e.target.checked)} />`,
    props: [
      {
        name: 'checked',
        type: 'boolean',
        description: 'On/off state',
      },
      {
        name: 'onChange',
        type: '(e: ChangeEvent) => void',
        description: 'Change handler',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Switch label',
      },
      sizeProp,
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
      disabledProp,
    ],
  },
  {
    id: 'spinner',
    title: 'Spinner',
    codeExample: `import { Spinner } from '@dendelion/paper-ui';

<Spinner size="medium" />`,
    props: [
      sizeProp,
      {
        name: 'color',
        type: 'string',
        description: 'Stroke color override',
      },
      {
        name: 'label',
        type: 'string',
        default: "'Loading'",
        description: 'Accessible status label',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'skeleton',
    title: 'Skeleton',
    codeExample: `import { Skeleton } from '@dendelion/paper-ui';

<Skeleton variant="text" />
<Skeleton variant="circle" width={48} height={48} />
<Skeleton variant="rect" height={120} />`,
    props: [
      {
        name: 'variant',
        type: "'text' | 'rect' | 'circle'",
        default: "'text'",
        description: 'Placeholder shape',
      },
      {
        name: 'width',
        type: 'number | string',
        description: 'Explicit width',
      },
      {
        name: 'height',
        type: 'number | string',
        description: 'Explicit height',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'avatar',
    title: 'Avatar',
    codeExample: `import { Avatar } from '@dendelion/paper-ui';

<Avatar name="Ada Lovelace" />
<Avatar src="/photo.jpg" alt="Ada Lovelace" />
<Avatar name="Grace Hopper" shape="square" size="large" />`,
    props: [
      {
        name: 'src',
        type: 'string',
        description: 'Image URL; falls back to initials when omitted',
      },
      {
        name: 'alt',
        type: 'string',
        description: 'Alt text for the image, or label for the initials fallback',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Used to derive initials and a deterministic accent color',
      },
      {
        name: 'size',
        type: "'small' | 'medium' | 'large' | 'xlarge'",
        default: "'medium'",
        description: 'Avatar size',
      },
      {
        name: 'shape',
        type: "'circle' | 'square'",
        default: "'circle'",
        description: 'Outline shape',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'divider',
    title: 'Divider',
    codeExample: `import { Divider } from '@dendelion/paper-ui';

<Divider />
<Divider label="or" />
<Divider orientation="vertical" />`,
    props: [
      {
        name: 'orientation',
        type: "'horizontal' | 'vertical'",
        default: "'horizontal'",
        description: 'Line direction',
      },
      {
        name: 'label',
        type: 'ReactNode',
        description: 'Optional centered label (horizontal only)',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'accordion',
    title: 'Accordion',
    codeExample: `import { Accordion } from '@dendelion/paper-ui';

<Accordion title="Shipping details" expanded={isOpen} onToggle={() => setIsOpen(!isOpen)}>
  <p>Ships within 2-3 business days.</p>
</Accordion>`,
    props: [
      {
        name: 'title',
        type: 'ReactNode',
        required: true,
        description: 'Header content, always visible',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'Collapsible body content',
      },
      {
        name: 'expanded',
        type: 'boolean',
        default: 'false',
        description: 'Whether the body is shown',
      },
      {
        name: 'onToggle',
        type: '() => void',
        description: 'Called when the header is clicked',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'tooltip',
    title: 'Tooltip',
    codeExample: `import { Tooltip } from '@dendelion/paper-ui';

<Tooltip content="Saves your changes">
  <Button>Save</Button>
</Tooltip>`,
    props: [
      {
        name: 'content',
        type: 'ReactNode',
        required: true,
        description: 'Tooltip body',
      },
      {
        name: 'children',
        type: 'ReactElement',
        required: true,
        description: 'A single focusable/hoverable trigger element',
      },
      {
        name: 'placement',
        type: "'top' | 'bottom' | 'left' | 'right'",
        default: "'top'",
        description: 'Side of the trigger to render on',
      },
      {
        name: 'delay',
        type: 'number',
        default: '300',
        description: 'Show delay in ms',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Suppress the tooltip',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'breadcrumb',
    title: 'Breadcrumb',
    codeExample: `import { Breadcrumb } from '@dendelion/paper-ui';

<Breadcrumb
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'docs', label: 'Docs', href: '/docs' },
    { id: 'current', label: 'Breadcrumb' },
  ]}
/>`,
    props: [
      {
        name: 'items',
        type: 'BreadcrumbItem[]',
        required: true,
        description:
          'Trail of { id, label, href?, onClick? }; the last item renders as the current page',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'pagination',
    title: 'Pagination',
    codeExample: `import { Pagination } from '@dendelion/paper-ui';

<Pagination page={page} totalPages={12} onPageChange={setPage} />`,
    props: [
      {
        name: 'page',
        type: 'number',
        required: true,
        description: 'Current page, 1-indexed',
      },
      {
        name: 'totalPages',
        type: 'number',
        required: true,
        description: 'Total number of pages',
      },
      {
        name: 'onPageChange',
        type: '(page: number) => void',
        required: true,
        description: 'Called with the new page number',
      },
      {
        name: 'siblingCount',
        type: 'number',
        default: '1',
        description: 'Page numbers to show on each side of the current page',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
  {
    id: 'menu',
    title: 'Menu',
    codeExample: `import { Menu } from '@dendelion/paper-ui';

<Menu
  trigger={<IconButton icon={<MoreIcon />} label="More options" variant="ghost" />}
  items={[
    { id: 'edit', label: 'Edit' },
    { id: 'duplicate', label: 'Duplicate' },
    { id: 'sep', type: 'separator' },
    { id: 'delete', label: 'Delete', danger: true, onSelect: handleDelete },
  ]}
/>`,
    props: [
      {
        name: 'trigger',
        type: 'ReactElement',
        required: true,
        description: 'A single focusable element that opens the menu on click',
      },
      {
        name: 'items',
        type: 'MenuEntry[]',
        required: true,
        description:
          'MenuItem ({ id, label, icon?, onSelect?, disabled?, danger? }) or a separator ({ id, type: "separator" })',
      },
      {
        name: 'align',
        type: "'start' | 'end'",
        default: "'start'",
        description: 'Horizontal alignment against the trigger',
      },
      {
        name: 'surface',
        type: "'paper' | 'chalkboard'",
        default: "'paper'",
        description: 'Surface style',
      },
    ],
  },
];

const detailMap = new Map(sectionDetails.map((d) => [d.id, d]));

export const ComponentsPage: FC<{
  onOpenDetail: (
    data: { title: string; codeExample: string; id: string; props?: PropDef[] } | null,
  ) => void;
  onUpdateDetail: (
    data: { title: string; codeExample: string; id: string; props?: PropDef[] } | null,
  ) => void;
  sidebarOpen?: boolean;
}> = ({ onOpenDetail, onUpdateDetail, sidebarOpen }) => {
  const [activeSection, setActiveSection] = useState('button');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [buttonWobble, setButtonWobble] = useState(0.5);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [listItemActive, setListItemActive] = useState('plans');
  const [activeTab, setActiveTab] = useState('design');
  const [modalOpen, setModalOpen] = useState(false);
  const [tableSearch, setTableSearch] = useState('');
  const [chalkboardTheme, setChalkboardTheme] = useState(false);
  const [radioValue, setRadioValue] = useState('paper');
  const [switchOn, setSwitchOn] = useState(true);
  const [navIslandActive, setNavIslandActive] = useState('dash');
  const [accordionOpen, setAccordionOpen] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      },
    );

    for (const id of componentIds) {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sidebarOpen && activeSection) {
      const detail = detailMap.get(activeSection);
      if (detail) {
        onUpdateDetail({
          title: detail.title,
          codeExample: detail.codeExample,
          id: detail.id,
          props: detail.props,
        });
      }
    }
  }, [activeSection, sidebarOpen, onUpdateDetail]);

  const handleNavigate = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleViewDetails = useCallback(
    (id: string) => {
      const detail = detailMap.get(id);
      if (detail) {
        onOpenDetail({
          title: detail.title,
          codeExample: detail.codeExample,
          id: detail.id,
          props: detail.props,
        });
      }
    },
    [onOpenDetail],
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16">
      <div className="mb-16">
        <h1
          className="text-5xl font-bold mb-6"
          style={{
            fontFamily: fontFamilyDisplay,
            color: colorInkPrimary,
            fontWeight: 700,
          }}
        >
          Components Gallery
        </h1>
        <p
          className="text-lg"
          style={{
            fontFamily: fontFamilySerif,
            color: colorInkSecondary,
            fontSize: '1.35rem',
          }}
        >
          The component set — handcrafted pieces with paper textures, ink effects, and watercolor
          washes.
        </p>
      </div>

      <div className="flex gap-10">
        <ComponentSidebar activeSection={activeSection} onNavigate={handleNavigate} />

        <div className="flex-1 min-w-0 space-y-20 pb-24">
          <ComponentSection
            id="button"
            title="Button"
            description="Interactive button with paper texture, ink-bleed border radius, and watercolor wash on hover."
            category="basic"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('button')}
          >
            <div className="flex flex-wrap items-center gap-5">
              {chalkboardTheme ? (
                <>
                  <Button surface="chalkboard" wobble={buttonWobble}>
                    Chalkboard
                  </Button>
                  <Button surface="chalkboard" disabled wobble={buttonWobble}>
                    Disabled
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" wobble={buttonWobble}>
                    Primary
                  </Button>
                  <Button variant="secondary" wobble={buttonWobble}>
                    Secondary
                  </Button>
                  <Button variant="ghost" wobble={buttonWobble}>
                    Ghost
                  </Button>
                  <Button variant="danger" wobble={buttonWobble}>
                    Danger
                  </Button>
                  <Button variant="primary" disabled wobble={buttonWobble}>
                    Disabled
                  </Button>
                </>
              )}
            </div>
          </ComponentSection>

          <ComponentSection
            id="icon-button"
            title="IconButton"
            description="Circular canvas patch button with watercolor ring on hover."
            category="basic"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('icon-button')}
          >
            <div className="flex items-center gap-5">
              {chalkboardTheme ? (
                <>
                  <IconButton
                    icon={<HeartIcon />}
                    label="Like"
                    surface="chalkboard"
                    wobble={buttonWobble}
                  />
                  <IconButton
                    icon={<TrashIcon />}
                    label="Delete"
                    surface="chalkboard"
                    wobble={buttonWobble}
                  />
                </>
              ) : (
                <>
                  <IconButton
                    icon={<HeartIcon />}
                    label="Like"
                    variant="default"
                    wobble={buttonWobble}
                  />
                  <IconButton
                    icon={<HeartIcon />}
                    label="Like"
                    variant="ghost"
                    wobble={buttonWobble}
                  />
                  <IconButton
                    icon={<TrashIcon />}
                    label="Delete"
                    variant="danger"
                    wobble={buttonWobble}
                  />
                </>
              )}
            </div>
          </ComponentSection>

          <ComponentSection
            id="stamp"
            title="Stamp"
            description="Artistic ink stamp with an organic SVG blob background. Lower the wobble and add a variant to get a quieter, repeatable status tag from the same component."
            category="basic"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('stamp')}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-5">
                {chalkboardTheme ? (
                  <>
                    <Stamp size="small" surface="chalkboard">
                      Small
                    </Stamp>
                    <Stamp surface="chalkboard">Done</Stamp>
                    <Stamp size="large" surface="chalkboard">
                      Draft
                    </Stamp>
                    <Stamp size="small" surface="chalkboard">
                      Alert
                    </Stamp>
                    <Stamp surface="chalkboard">Info</Stamp>
                  </>
                ) : (
                  <>
                    <Stamp size="small" fillColor="rgba(143, 185, 150, 0.25)" textColor="#3D5A42">
                      Small
                    </Stamp>
                    <Stamp fillColor="rgba(143, 185, 150, 0.25)" textColor="#3D5A42">
                      Done
                    </Stamp>
                    <Stamp size="large" fillColor="rgba(212, 163, 115, 0.25)" textColor="#6B5135">
                      Draft
                    </Stamp>
                    <Stamp size="small" fillColor="rgba(201, 139, 139, 0.25)" textColor="#6E3A3A">
                      Alert
                    </Stamp>
                    <Stamp fillColor="rgba(168, 155, 168, 0.25)" textColor="#6E5E6E">
                      Info
                    </Stamp>
                  </>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Stamp
                  variant="neutral"
                  wobble={0}
                  size="small"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                >
                  Neutral
                </Stamp>
                <Stamp
                  variant="info"
                  dot
                  wobble={0}
                  size="small"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                >
                  Info
                </Stamp>
                <Stamp
                  variant="success"
                  dot
                  wobble={0}
                  size="small"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                >
                  Active
                </Stamp>
                <Stamp
                  variant="warning"
                  wobble={0}
                  size="small"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                >
                  Pending
                </Stamp>
                <Stamp
                  variant="error"
                  wobble={0}
                  size="small"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                >
                  Failed
                </Stamp>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection
            id="avatar"
            title="Avatar"
            description="Circular or organic-square identity marker. Shows an image, or initials over a deterministic watercolor tint when none is given."
            category="basic"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('avatar')}
          >
            <div className="flex flex-wrap items-center gap-4">
              <Avatar
                name="Ada Lovelace"
                size="small"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
              <Avatar name="Grace Hopper" surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
              <Avatar
                name="Alan Turing"
                size="large"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
              <Avatar
                name="Margaret Hamilton"
                size="xlarge"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
              <Avatar
                name="Katherine Johnson"
                shape="square"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
              <Avatar
                src="https://i.pravatar.cc/80?img=12"
                alt="Sample user photo"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="list-item"
            title="ListItem"
            description="Versatile row component with rectangular blob background, active state, icon, and action slots. Use it for navigation, lists, or any clickable row."
            category="basic"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('list-item')}
          >
            <div className="w-full max-w-sm space-y-1">
              <ListItem
                active={listItemActive === 'plans'}
                onClick={() => setListItemActive('plans')}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                }
              >
                Plans
              </ListItem>
              <ListItem
                active={listItemActive === 'focus'}
                onClick={() => setListItemActive('focus')}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                }
              >
                Focus
              </ListItem>
              <ListItem
                active={listItemActive === 'settings'}
                onClick={() => setListItemActive('settings')}
                size="small"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                }
                action={
                  <Stamp size="small" fillColor="rgba(143,185,150,0.25)" textColor="#3D5A42">
                    New
                  </Stamp>
                }
              >
                Settings
              </ListItem>
              <ListItem surface={chalkboardTheme ? 'chalkboard' : 'paper'}>
                <span className="flex-1">Non-interactive item</span>
              </ListItem>
            </div>
          </ComponentSection>

          <ComponentSection
            id="checkbox"
            title="Checkbox"
            description="Hand-drawn checkbox with wobbly blob background, SVG stroke-dasharray animation, and ink checkmark."
            category="form"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('checkbox')}
          >
            <div className="space-y-4">
              <Checkbox
                label="Enable feature"
                checked={checked1}
                wobble={buttonWobble}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={(e) => setChecked1(e.target.checked)}
              />
              <Checkbox
                label="Already checked"
                checked={checked2}
                wobble={buttonWobble}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={(e) => setChecked2(e.target.checked)}
              />
              <Checkbox
                label="Disabled option"
                disabled
                checked={false}
                wobble={buttonWobble}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={() => {}}
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="radio"
            title="Radio"
            description="Single-select control mirroring Checkbox — circular box with an ink dot and watercolor blob."
            category="form"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('radio')}
          >
            <RadioGroup
              value={radioValue}
              onChange={setRadioValue}
              surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              options={[
                { value: 'paper', label: 'Paper' },
                { value: 'kraft', label: 'Kraft' },
                { value: 'canvas', label: 'Canvas' },
                { value: 'marble', label: 'Marble (disabled)', disabled: true },
              ]}
            />
          </ComponentSection>

          <ComponentSection
            id="switch"
            title="Switch"
            description="Toggle control with a sliding ink thumb and watercolor track when on."
            category="form"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('switch')}
          >
            <div className="flex flex-col gap-3">
              <Switch
                label="Small size"
                size="small"
                checked={switchOn}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={(e) => setSwitchOn(e.target.checked)}
              />
              <Switch
                label="Medium size (default)"
                checked={switchOn}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={(e) => setSwitchOn(e.target.checked)}
              />
              <Switch
                label="Large size"
                size="large"
                checked={switchOn}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={(e) => setSwitchOn(e.target.checked)}
              />
              <Switch
                label="Disabled"
                disabled
                checked={false}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={() => {}}
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="input"
            title="Input"
            description="Hand-drawn text field with paper texture background, ink underline on focus, and organic border radius."
            category="form"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('input')}
          >
            <div className="space-y-5 max-w-sm">
              <Input
                label="Project name"
                placeholder="Enter a name..."
                value={inputValue}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input
                label="Email"
                type="email"
                size="small"
                placeholder="small"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
              <Input
                label="Description"
                size="large"
                placeholder="large input"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
              <Input
                label="Password"
                type="password"
                error
                helperText="Must be at least 8 characters"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
              <Input
                label="Disabled"
                disabled
                placeholder="Cannot edit"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="select"
            title="Select"
            description="Paper-styled dropdown with a hand-drawn chevron icon and textured background."
            category="form"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('select')}
          >
            <div className="space-y-4 max-w-sm">
              <Select
                label="Texture"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                options={[
                  { value: 'paper', label: 'Paper' },
                  { value: 'canvas', label: 'Canvas' },
                  { value: 'parchment', label: 'Parchment' },
                  { value: 'kraft', label: 'Kraft' },
                ]}
                placeholder="Choose a texture..."
              />
              <Select
                label="Size"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                size="small"
                options={[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                ]}
                defaultValue="medium"
              />
              <Select
                label="Disabled"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                disabled
                options={[{ value: 'none', label: 'Not available' }]}
                placeholder="Cannot select"
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="textarea"
            title="Textarea"
            description="Multi-line text input with paper texture background and ink underline on focus."
            category="form"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('textarea')}
          >
            <div className="space-y-5 max-w-sm w-full">
              <Textarea
                label="Notes"
                placeholder="Write your notes..."
                value={textareaValue}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
              <Textarea
                label="Error"
                error
                helperText="This field is required"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                placeholder="example"
              />
              <Textarea
                label="Disabled"
                disabled
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                placeholder="Cannot edit"
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="page"
            title="Page"
            description="Textured paper page container with optional watercolor accent. Used as the main content surface."
            category="layout"
            onViewDetails={() => handleViewDetails('page')}
          >
            <div className="w-full max-w-lg space-y-4">
              <Page withAccent accentColor="green">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: fontFamilySerif,
                    color: colorInkPrimary,
                  }}
                >
                  Journal Entry
                </h3>
                <p
                  style={{
                    fontFamily: fontFamilySerif,
                    color: colorInkSecondary,
                    fontSize: '1.05rem',
                  }}
                >
                  The paper grain texture and watercolor accent create an organic reading surface.
                </p>
              </Page>
              <Page texture={false}>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: fontFamilySerif,
                    color: colorInkPrimary,
                  }}
                >
                  Plain Page
                </h3>
                <p
                  style={{
                    fontFamily: fontFamilySerif,
                    color: colorInkSecondary,
                    fontSize: '1.05rem',
                  }}
                >
                  No texture, just a clean paper surface.
                </p>
              </Page>
            </div>
          </ComponentSection>

          <ComponentSection
            id="layout"
            title="Layout"
            description="Page shell with sidebar navigation, header bar, and main content area. Features canvas-weave sidebar texture and mobile drawer."
            category="layout"
            onViewDetails={() => handleViewDetails('layout')}
          >
            <div
              className="w-full max-w-2xl rounded-xl overflow-hidden border"
              style={{
                height: '340px',
                borderColor: 'rgba(61, 53, 43, 0.12)',
                boxShadow: '0 4px 6px rgba(61, 53, 43, 0.08), 0 2px 4px rgba(61, 53, 43, 0.06)',
              }}
            >
              <Layout
                title="Paper Studio"
                subtitle="Dashboard"
                navigationItems={[
                  { id: 'dash', label: 'Dashboard', path: '/' },
                  { id: 'plans', label: 'Plans', path: '/plans' },
                  { id: 'settings', label: 'Settings', path: '/settings' },
                ]}
                activeItemId="dash"
                onNavigate={() => {}}
                showSidebar
                showPage
                showHeader
              >
                <div className="h-full flex items-center justify-center">
                  <span
                    style={{
                      fontFamily: fontFamilySerif,
                      color: colorInkTertiary,
                      fontSize: '1.15rem',
                    }}
                  >
                    Main content area
                  </span>
                </div>
              </Layout>
            </div>
          </ComponentSection>

          <ComponentSection
            id="card"
            title="Card"
            description="Paper surface container with pencil border and configurable elevation."
            category="layout"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('card')}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {chalkboardTheme ? (
                <>
                  <Card surface="chalkboard">
                    <h4
                      className="font-bold mb-2"
                      style={{
                        fontFamily: fontFamilySerif,
                        color: '#d4e8cb',
                        fontSize: '1.15rem',
                      }}
                    >
                      Default
                    </h4>
                    <p
                      style={{
                        fontFamily: fontFamilySerif,
                        color: '#a8c4a0',
                        fontSize: '0.95rem',
                      }}
                    >
                      Chalkboard card with pencil border.
                    </p>
                  </Card>
                  <Card surface="chalkboard">
                    <h4
                      className="font-bold mb-2"
                      style={{
                        fontFamily: fontFamilySerif,
                        color: '#d4e8cb',
                        fontSize: '1.15rem',
                      }}
                    >
                      Elevated
                    </h4>
                    <p
                      style={{
                        fontFamily: fontFamilySerif,
                        color: '#a8c4a0',
                        fontSize: '0.95rem',
                      }}
                    >
                      Chalkboard card with watercolor accent.
                    </p>
                  </Card>
                </>
              ) : (
                <>
                  <Card>
                    <h4
                      className="font-bold mb-2"
                      style={{
                        fontFamily: fontFamilySerif,
                        color: colorInkPrimary,
                        fontSize: '1.15rem',
                      }}
                    >
                      Default
                    </h4>
                    <p
                      style={{
                        fontFamily: fontFamilySerif,
                        color: colorInkSecondary,
                        fontSize: '0.95rem',
                      }}
                    >
                      Standard paper card with pencil border.
                    </p>
                  </Card>
                  <Card variant="elevated" accent accentColor="amber">
                    <h4
                      className="font-bold mb-2"
                      style={{
                        fontFamily: fontFamilySerif,
                        color: colorInkPrimary,
                        fontSize: '1.15rem',
                      }}
                    >
                      Elevated
                    </h4>
                    <p
                      style={{
                        fontFamily: fontFamilySerif,
                        color: colorInkSecondary,
                        fontSize: '0.95rem',
                      }}
                    >
                      Raised card with watercolor accent.
                    </p>
                  </Card>
                </>
              )}
            </div>
          </ComponentSection>

          <ComponentSection
            id="divider"
            title="Divider"
            description="Separator drawn as an ink stroke that fades at the ends, with an optional handwritten label."
            category="layout"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('divider')}
          >
            <div className="flex flex-col gap-6 w-full max-w-md">
              <Divider surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
              <Divider label="or" surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
              <div className="flex items-center gap-4 h-8">
                <span style={{ color: chalkboardTheme ? '#a8c4a0' : colorInkSecondary }}>Left</span>
                <Divider
                  orientation="vertical"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                />
                <span style={{ color: chalkboardTheme ? '#a8c4a0' : colorInkSecondary }}>
                  Right
                </span>
              </div>
            </div>
          </ComponentSection>

          <ComponentSection
            id="accordion"
            title="Accordion"
            description="Collapsible content section with a rotating disclosure triangle."
            category="layout"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('accordion')}
          >
            <div className="w-full max-w-md">
              <Accordion
                title="Shipping details"
                expanded={accordionOpen}
                onToggle={() => setAccordionOpen(!accordionOpen)}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              >
                <p>Ships within 2-3 business days. Free returns within 30 days.</p>
              </Accordion>
            </div>
          </ComponentSection>

          <ComponentSection
            id="table"
            title="Table"
            description="Paper-styled data table with three surface variants: grid cells with highlighted borders, ruled notebook lines, or plain minimal rows. Includes a textured toolbar with search and action slots."
            category="layout"
            onViewDetails={() => handleViewDetails('table')}
          >
            <div className="w-full max-w-2xl space-y-4">
              <Table
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                toolbar={{
                  search: {
                    placeholder: 'Search entries...',
                    value: tableSearch,
                    onChange: (v) => setTableSearch(v),
                  },
                  actions: (v) => (
                    <>
                      <IconButton
                        icon={<FilterIcon />}
                        label="Filter"
                        variant="ghost"
                        surface={v}
                        size="small"
                      />
                      <IconButton
                        icon={<DownloadIcon />}
                        label="Export"
                        variant="ghost"
                        surface={v}
                        size="small"
                      />
                    </>
                  ),
                }}
                columns={[
                  {
                    key: 'item',
                    header: 'Item',
                    width: 7,
                    cell: (r, _i, v) => (
                      <span
                        style={{
                          fontFamily: fontFamilySerif,
                          color: v === 'chalkboard' ? '#d4e8cb' : colorInkPrimary,
                          fontWeight: 600,
                        }}
                      >
                        {r.item}
                      </span>
                    ),
                  },
                  {
                    key: 'type',
                    header: 'Type',
                    width: 4,
                    cell: (r) => r.type,
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    width: 4,
                    cell: (r, _i, v) => (
                      <Stamp
                        fillColor={
                          v === 'chalkboard'
                            ? r.status === 'Done'
                              ? 'rgba(212, 232, 203, 0.15)'
                              : r.status === 'Draft'
                                ? 'rgba(232, 160, 160, 0.12)'
                                : 'rgba(232, 160, 160, 0.15)'
                            : r.status === 'Done'
                              ? 'rgba(143, 185, 150, 0.22)'
                              : r.status === 'Draft'
                                ? 'rgba(212, 163, 115, 0.22)'
                                : 'rgba(201, 139, 139, 0.22)'
                        }
                        textColor={
                          v === 'chalkboard'
                            ? r.status === 'Done'
                              ? '#d4e8cb'
                              : r.status === 'Draft'
                                ? '#e8a0a0'
                                : '#e8a0a0'
                            : r.status === 'Done'
                              ? '#3D5A42'
                              : r.status === 'Draft'
                                ? '#6B5135'
                                : '#6E3A3A'
                        }
                      >
                        {r.status}
                      </Stamp>
                    ),
                  },
                  {
                    key: 'date',
                    header: 'Date',
                    width: 3,
                    cell: (r) => r.date,
                  },
                ]}
                data={
                  [
                    { item: 'Watercolor Study', type: 'Sketch', status: 'Done', date: 'Jun 2' },
                    { item: 'Ink Portrait', type: 'Illustration', status: 'Draft', date: 'Jun 1' },
                    { item: 'Paper Texture', type: 'Asset', status: 'Review', date: 'May 30' },
                    { item: 'Canvas Weave', type: 'Pattern', status: 'Done', date: 'May 28' },
                  ].filter((row) =>
                    tableSearch
                      ? row.item.toLowerCase().includes(tableSearch.toLowerCase()) ||
                        row.type.toLowerCase().includes(tableSearch.toLowerCase())
                      : true,
                  ) as Array<{
                    item: string;
                    type: string;
                    status: string;
                    date: string;
                  }>
                }
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="island"
            title="Island"
            description="Fixed container at the bottom of the page with paper texture background. Use it to hold controls that should always be visible."
            category="navigation"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('island')}
          >
            <div className="text-center">
              <p
                style={{
                  fontFamily: fontFamilySerif,
                  color: chalkboardTheme ? '#d4e8cb' : colorInkPrimary,
                  fontSize: '1rem',
                }}
              >
                The Island is fixed at the bottom of the page.
              </p>
              <p
                style={{
                  fontFamily: fontFamilySerif,
                  color: chalkboardTheme ? '#a8c4a0' : colorInkSecondary,
                  fontSize: '0.85rem',
                  marginTop: '0.5rem',
                }}
              >
                Scroll down to see it with the Wobble and Theme controls.
              </p>
            </div>
          </ComponentSection>

          <ComponentSection
            id="navigation-island"
            title="NavigationIsland"
            description="Pill-style navigation bar with active-item highlighting. Typically passed to Layout's navigationIsland prop. Uses fixed positioning, so this preview is bounded to the box below via a CSS transform containing block."
            category="navigation"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('navigation-island')}
          >
            <div
              className="relative w-full flex items-end justify-center overflow-hidden"
              style={{ height: 100, transform: 'translateZ(0)' }}
            >
              <NavigationIsland
                items={[
                  { id: 'dash', label: 'Dashboard', icon: <HeartIcon /> },
                  { id: 'plans', label: 'Plans', icon: <FilterIcon /> },
                  { id: 'settings', label: 'Settings', icon: <DownloadIcon /> },
                ]}
                activeId={navIslandActive}
                onSelect={setNavIslandActive}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="tabs"
            title="Tabs"
            description="Button-based tab controls with Card content area. Composes Button and Card from the design system."
            category="navigation"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('tabs')}
          >
            <div className="w-full max-w-lg">
              <Tabs
                items={[
                  {
                    id: 'design',
                    label: 'Design',
                    children: (
                      <p
                        style={{
                          fontFamily: fontFamilySerif,
                          fontSize: '1rem',
                          color: chalkboardTheme ? '#d4e8cb' : colorInkSecondary,
                        }}
                      >
                        Design tools and systems for consistent visual language.
                      </p>
                    ),
                  },
                  {
                    id: 'code',
                    label: 'Code',
                    children: (
                      <p
                        style={{
                          fontFamily: fontFamilySerif,
                          fontSize: '1rem',
                          color: chalkboardTheme ? '#d4e8cb' : colorInkSecondary,
                        }}
                      >
                        Implementation details and code architecture.
                      </p>
                    ),
                  },
                  {
                    id: 'preview',
                    label: 'Preview',
                    children: (
                      <p
                        style={{
                          fontFamily: fontFamilySerif,
                          fontSize: '1rem',
                          color: chalkboardTheme ? '#d4e8cb' : colorInkSecondary,
                        }}
                      >
                        Live preview of the current configuration.
                      </p>
                    ),
                  },
                ]}
                activeKey={activeTab}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onSelect={(id) => setActiveTab(id)}
              />
            </div>
          </ComponentSection>

          <ComponentSection
            id="breadcrumb"
            title="Breadcrumb"
            description="Navigation trail rendered as ink-colored links with a chevron separator. The final crumb marks the current page."
            category="navigation"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('breadcrumb')}
          >
            <Breadcrumb
              items={[
                { id: 'home', label: 'Home', href: '#' },
                { id: 'library', label: 'Library', href: '#' },
                { id: 'components', label: 'Components', href: '#' },
                { id: 'breadcrumb', label: 'Breadcrumb' },
              ]}
              surface={chalkboardTheme ? 'chalkboard' : 'paper'}
            />
          </ComponentSection>

          <ComponentSection
            id="pagination"
            title="Pagination"
            description="Prev/next controls with a sibling-aware page range and ellipsis for long sequences."
            category="navigation"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('pagination')}
          >
            <PaginationDemo surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
          </ComponentSection>

          <ComponentSection
            id="alert"
            title="Alert"
            description="Paper-textured message box with tinted overlay and full-height accent border. Supports info, success, warning, and error tones."
            category="feedback"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('alert')}
          >
            <div className="space-y-4 max-w-lg">
              {chalkboardTheme ? (
                <Alert surface="chalkboard" title="Chalkboard">
                  This alert is styled for chalkboard surfaces.
                </Alert>
              ) : (
                <>
                  <Alert variant="info" title="Tip">
                    Use paper textures sparingly for maximum impact.
                  </Alert>
                  <Alert variant="success" title="Published">
                    Your article is now live and readable.
                  </Alert>
                  <Alert variant="warning" title="Draft">
                    This plan has not been reviewed yet.
                  </Alert>
                  <Alert variant="error" title="Failed" dismissible>
                    Could not save changes to the server.
                  </Alert>
                </>
              )}
            </div>
          </ComponentSection>

          <ComponentSection
            id="toast"
            title="Toast"
            description="Positioned, stacked notifications with auto-dismiss (pauses on hover) and manual close. Built on Alert."
            category="feedback"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('toast')}
          >
            <ToastDemo surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
          </ComponentSection>

          <ComponentSection
            id="progress"
            title="Progress"
            description="Minimal progress bar with configurable color and height."
            category="feedback"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('progress')}
          >
            <div className="w-full max-w-sm space-y-5">
              <div className="space-y-2">
                <div
                  className="flex justify-between text-sm"
                  style={{
                    fontFamily: "'Luminari', serif",
                    color: chalkboardTheme ? '#a8c4a0' : colorInkSecondary,
                  }}
                >
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <Progress
                  value={65}
                  height={6}
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                />
              </div>
              <div className="space-y-2">
                <div
                  className="flex justify-between text-sm"
                  style={{
                    fontFamily: "'Luminari', serif",
                    color: chalkboardTheme ? '#a8c4a0' : colorInkSecondary,
                  }}
                >
                  <span>Custom color</span>
                  <span>42%</span>
                </div>
                <Progress
                  value={42}
                  color="#D4A373"
                  height={8}
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                />
              </div>
              <div className="space-y-2">
                <div
                  className="flex justify-between text-sm"
                  style={{
                    fontFamily: "'Luminari', serif",
                    color: chalkboardTheme ? '#a8c4a0' : colorInkSecondary,
                  }}
                >
                  <span>Small</span>
                  <span>80%</span>
                </div>
                <Progress
                  value={80}
                  color="#C98B8B"
                  height={4}
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                />
              </div>
            </div>
          </ComponentSection>

          <ComponentSection
            id="spinner"
            title="Spinner"
            description="Indeterminate loading indicator — a rotating ink arc that respects reduced-motion."
            category="feedback"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('spinner')}
          >
            <div className="flex items-center gap-8">
              <Spinner size="small" surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
              <Spinner size="medium" surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
              <Spinner size="large" surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
            </div>
          </ComponentSection>

          <ComponentSection
            id="skeleton"
            title="Skeleton"
            description="Loading placeholder in text, rectangle, and circle variants with a paper-grain pulse."
            category="feedback"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('skeleton')}
          >
            <div className="flex items-center gap-5 w-full max-w-md">
              <Skeleton
                variant="circle"
                width={48}
                height={48}
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              />
              <div className="flex-1 space-y-2">
                <Skeleton
                  variant="text"
                  width="60%"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                />
                <Skeleton variant="text" surface={chalkboardTheme ? 'chalkboard' : 'paper'} />
                <Skeleton
                  variant="text"
                  width="80%"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                />
              </div>
            </div>
          </ComponentSection>

          <ComponentSection
            id="modal"
            title="Modal"
            description="Paper sheet overlay with textured backdrop."
            category="overlay"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('modal')}
          >
            <div className="flex flex-wrap items-center gap-5">
              <Button
                variant="primary"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                onClick={() => setModalOpen(true)}
              >
                Open Modal
              </Button>
            </div>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Journal Entry"
              size="medium"
              surface={chalkboardTheme ? 'chalkboard' : 'paper'}
            >
              <p
                style={{
                  fontFamily: fontFamilySerif,
                  color: chalkboardTheme ? '#a8c4a0' : colorInkSecondary,
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                }}
              >
                This modal sits on a textured backdrop with an organic feel. Click the backdrop or
                the close button to dismiss.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <Button
                  variant="ghost"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                  onClick={() => setModalOpen(false)}
                >
                  Save
                </Button>
              </div>
            </Modal>
          </ComponentSection>

          <ComponentSection
            id="tooltip"
            title="Tooltip"
            description="Inked label with a hand-drawn arrow, shown on hover or focus."
            category="overlay"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('tooltip')}
          >
            <div className="flex flex-wrap items-center gap-8">
              <Tooltip
                content="Saves your changes"
                placement="top"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              >
                <Button variant="primary" surface={chalkboardTheme ? 'chalkboard' : 'paper'}>
                  Top
                </Button>
              </Tooltip>
              <Tooltip
                content="Bottom placement"
                placement="bottom"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              >
                <Button variant="secondary" surface={chalkboardTheme ? 'chalkboard' : 'paper'}>
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip
                content="Left placement"
                placement="left"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              >
                <Button variant="ghost" surface={chalkboardTheme ? 'chalkboard' : 'paper'}>
                  Left
                </Button>
              </Tooltip>
              <Tooltip
                content="Right placement"
                placement="right"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
              >
                <Button variant="ghost" surface={chalkboardTheme ? 'chalkboard' : 'paper'}>
                  Right
                </Button>
              </Tooltip>
            </div>
          </ComponentSection>

          <ComponentSection
            id="menu"
            title="Menu"
            description="Anchored action menu with roving keyboard focus, separators, and a danger tone for destructive items."
            category="overlay"
            chalkboard={chalkboardTheme}
            onViewDetails={() => handleViewDetails('menu')}
          >
            <div className="flex flex-wrap items-center gap-4">
              <Menu
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                trigger={
                  <IconButton
                    icon={<MoreIcon />}
                    label="More options"
                    variant="ghost"
                    surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                  />
                }
                items={[
                  { id: 'edit', label: 'Edit' },
                  { id: 'duplicate', label: 'Duplicate' },
                  { id: 'download', label: 'Download', icon: <DownloadIcon /> },
                  { id: 'sep', type: 'separator' },
                  { id: 'archived', label: 'Archived (disabled)', disabled: true },
                  { id: 'delete', label: 'Delete', danger: true, icon: <TrashIcon /> },
                ]}
              />
              <Menu
                align="end"
                surface={chalkboardTheme ? 'chalkboard' : 'paper'}
                trigger={
                  <Button variant="secondary" surface={chalkboardTheme ? 'chalkboard' : 'paper'}>
                    Actions
                  </Button>
                }
                items={[
                  { id: 'share', label: 'Share' },
                  { id: 'export', label: 'Export', icon: <DownloadIcon /> },
                ]}
              />
            </div>
          </ComponentSection>
        </div>
      </div>

      <Island surface="paper">
        <span
          className="text-sm shrink-0"
          style={{
            fontFamily: "'Luminari', serif",
            color: colorInkPrimary,
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          Wobble
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(buttonWobble * 100)}
          onChange={(e) => setButtonWobble(Number(e.target.value) / 100)}
          className="w-32 accent-[#8FB996]"
          style={{ cursor: 'pointer' }}
        />
        <span
          className="text-xs w-10 text-right"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: colorInkSecondary,
            fontSize: '0.75rem',
          }}
        >
          {Math.round(buttonWobble * 100)}%
        </span>
        <div className="w-px h-5" style={{ backgroundColor: 'rgba(61, 53, 43, 0.15)' }} />
        <span
          className="text-sm shrink-0"
          style={{
            fontFamily: "'Luminari', serif",
            color: colorInkPrimary,
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          Theme
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="small"
            isActive={!chalkboardTheme}
            onClick={() => setChalkboardTheme(false)}
          >
            Paper
          </Button>
          <Button
            variant="ghost"
            size="small"
            isActive={chalkboardTheme}
            onClick={() => setChalkboardTheme(true)}
          >
            Chalkboard
          </Button>
        </div>
      </Island>
    </div>
  );
};

function HeartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </svg>
  );
}

export default ComponentsPage;
