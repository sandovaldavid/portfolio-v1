# Badge Component

## Description

A reusable badge component for displaying status indicators, labels, tags, and categories. Part of the Shared UI layer in the FSD architecture. Perfect for showing technology tags, status labels, notification counts, or any small piece of categorical information.

## Location

`src/shared/ui/badge/badge.astro`

## Props

| Prop      | Type                                                                                                | Default     | Required | Description                |
| --------- | --------------------------------------------------------------------------------------------------- | ----------- | -------- | -------------------------- |
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'custom'` | `'default'` | ❌       | Color variant of the badge |
| `size`    | `'sm' \| 'md' \| 'lg'`                                                                              | `'md'`      | ❌       | Size of the badge          |
| `class`   | `string`                                                                                            | -           | ❌       | Additional CSS classes     |

## Variants

| Variant     | Use Case         | Light Mode            | Dark Mode                |
| ----------- | ---------------- | --------------------- | ------------------------ |
| `default`   | Generic labels   | Gray background       | Dark gray background     |
| `primary`   | Main categories  | Blue background       | Blue with transparency   |
| `secondary` | Secondary info   | Purple background     | Purple with transparency |
| `success`   | Positive status  | Green background      | Green with transparency  |
| `warning`   | Alerts/warnings  | Yellow background     | Yellow with transparency |
| `danger`    | Errors/critical  | Red background        | Red with transparency    |
| `info`      | Information      | Cyan background       | Cyan with transparency   |
| `custom`    | **Fully custom** | **No default colors** | **Use `class` prop**     |

## Sizes

| Size | Padding       | Font Size   | Use Case                  |
| ---- | ------------- | ----------- | ------------------------- |
| `sm` | `px-2 py-0.5` | `text-xs`   | Compact lists, dense UI   |
| `md` | `px-2.5 py-1` | `text-sm`   | Default, general use      |
| `lg` | `px-3 py-1.5` | `text-base` | Prominent labels, headers |

## Features

- ✅ **7 semantic variants**: Covers all common use cases
- ✅ **3 size options**: Flexible for different contexts
- ✅ **Dark mode support**: Automatic theme adaptation
- ✅ **Slot-based content**: Can contain text, icons, or both
- ✅ **Rounded pill design**: Modern, friendly appearance
- ✅ **Accessible**: High contrast colors for readability
- ✅ **Lightweight**: No JavaScript, pure CSS

## Usage

### Basic Example

```astro
---
import { Badge } from '@/shared/ui';
---

<Badge>New</Badge>
```

### With Variants

```astro
<!-- Default -->
<Badge variant="default">Default</Badge>

<!-- Primary -->
<Badge variant="primary">Featured</Badge>

<!-- Success -->
<Badge variant="success">Active</Badge>

<!-- Warning -->
<Badge variant="warning">Beta</Badge>

<!-- Danger -->
<Badge variant="danger">Deprecated</Badge>

<!-- Info -->
<Badge variant="info">Tip</Badge>
```

### With Sizes

```astro
<!-- Small -->
<Badge size="sm">Small</Badge>

<!-- Medium (default) -->
<Badge size="md">Medium</Badge>

<!-- Large -->
<Badge size="lg">Large</Badge>
```

### With Icons

```astro
---
import { Badge } from '@/shared/ui';
import CheckIcon from '@/assets/icons/Check.astro';
---

<Badge variant="success">
	<CheckIcon class="size-3" />
	<span>Verified</span>
</Badge>
```

### Technology Tags (Common Use Case)

```astro
---
import { Badge } from '@/shared/ui';
import PythonIcon from '@/assets/icons/Python.astro';
import ReactIcon from '@/assets/icons/React.astro';
---

<div class="flex gap-2">
	<Badge variant="primary">
		<PythonIcon class="size-4" />
		Python
	</Badge>

	<Badge variant="info">
		<ReactIcon class="size-4" />
		React
	</Badge>
</div>
```

### Custom Technology Tags (Full Control)

```astro
---
import { Badge } from '@/shared/ui';
import PythonIcon from '@/assets/icons/Python.astro';
import JavaScriptIcon from '@/assets/icons/JavaScript.astro';
import DjangoIcon from '@/assets/icons/Django.astro';
---

<!-- Opción 1: Variant "custom" con clases personalizadas -->
<Badge variant="custom" class="bg-blue-500 text-white">
	<PythonIcon class="size-4" />
	Python
</Badge>

<Badge variant="custom" class="bg-yellow-500 text-black">
	<JavaScriptIcon class="size-4" />
	JavaScript
</Badge>

<Badge variant="custom" class="bg-green-600 text-white">
	<DjangoIcon class="size-4" />
	Django
</Badge>

<!-- Opción 2: Usar variantes predefinidas con clase adicional -->
<Badge variant="primary" class="!bg-blue-600"> Python (con !important) </Badge>
```

### Technology Tags with Consistent Design System

```astro
---
import { Badge } from '@/shared/ui';

// Define technology colors as a constant
const TECH_COLORS = {
	python: 'bg-blue-500 text-white',
	javascript: 'bg-yellow-500 text-black',
	django: 'bg-green-600 text-white',
	react: 'bg-cyan-500 text-white',
	typescript: 'bg-blue-700 text-white',
} as const;
---

<Badge variant="custom" class={TECH_COLORS.python}>
	<PythonIcon class="size-4" />
	Python
</Badge>

<Badge variant="custom" class={TECH_COLORS.javascript}>
	<JavaScriptIcon class="size-4" />
	JavaScript
</Badge>
```

### Status Indicators

```astro
<Badge variant="success">Online</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Offline</Badge>
```

### Notification Count

```astro
<Badge variant="danger" size="sm">3</Badge>
```

### With Custom Classes

```astro
<Badge variant="primary" class="font-bold uppercase"> Premium </Badge>
```

## Styling

The component uses Tailwind CSS with semantic color variants:

- **Base**: `rounded-full`, `inline-flex`, `items-center`, `gap-1`
- **Typography**: Font sizes based on size prop
- **Colors**: Semantic variants with light/dark mode support
- **Transitions**: Smooth 200ms color transitions

## Design Tokens

### Color System (OKLCH-based for better perception)

```text
Variants adapt to the active theme automatically:

- Gray (default): Neutral, low emphasis
- Blue (primary): Main actions, featured content
- Purple (secondary): Secondary information
- Green (success): Positive states, completed
- Yellow (warning): Caution, attention needed
- Red (danger): Errors, critical issues
- Cyan (info): Informational, tips
- Custom: Full control with class prop
```

### Custom Variant Best Practices

**✅ Recommended: Use `variant="custom"` for technology tags**

```astro
<!-- Clean and explicit -->
<Badge variant="custom" class="bg-blue-500 text-white">Python</Badge>
<Badge variant="custom" class="bg-yellow-500 text-black">JavaScript</Badge>
```

**❌ Not Recommended: Overriding variant colors**

```astro
<!-- May have specificity issues -->
<Badge variant="default" class="bg-blue-500 text-white">Python</Badge>

<!-- Requires !important (hacky) -->
<Badge variant="default" class="!bg-blue-500 !text-white">Python</Badge>
```

**Why `variant="custom"` is better:**

1. ✅ No style conflicts or specificity wars
2. ✅ Clear intent in the code
3. ✅ No need for `!important`
4. ✅ Full control over colors
5. ✅ Better performance (fewer classes to merge)

## Accessibility

- ✅ **High contrast**: All variants meet WCAG AA standards
- ✅ **Semantic HTML**: Uses `<span>` element
- ✅ **Screen reader friendly**: Text content is accessible
- ✅ **Theme-aware**: Works in light and dark modes

## FSD Compliance

- ✅ **Layer**: Shared (UI)
- ✅ **No business logic**: Pure presentational
- ✅ **No layer violations**: Standalone component
- ✅ **Generic and reusable**: Not tied to specific domains
- ✅ **Exported via Public API**: Available through `src/shared/ui/index.ts`

## Common Patterns

### Technology Stack Display

```astro
<div class="flex flex-wrap gap-2">
	{
		technologies.map(tech => (
			<Badge variant="primary">
				<tech.icon class="size-4" />
				{tech.name}
			</Badge>
		))
	}
</div>
```

### Technology Stack with Custom Colors

```astro
---
// Define your technology design tokens
const technologies = [
	{
		name: 'Python',
		icon: PythonIcon,
		colors: 'bg-blue-500 text-white',
	},
	{
		name: 'JavaScript',
		icon: JavaScriptIcon,
		colors: 'bg-yellow-500 text-black',
	},
	{
		name: 'Django',
		icon: DjangoIcon,
		colors: 'bg-green-600 text-white',
	},
];
---

<div class="flex flex-wrap gap-2">
	{
		technologies.map(tech => (
			<Badge variant="custom" class={tech.colors}>
				<tech.icon class="size-4" />
				{tech.name}
			</Badge>
		))
	}
</div>
```

### Status with Color Coding

```astro
---
const statusVariant = {
	active: 'success',
	pending: 'warning',
	inactive: 'danger',
} as const;
---

<Badge variant={statusVariant[status]}>
	{status}
</Badge>
```

### Category Tags

```astro
<div class="flex gap-2">
	<Badge variant="info">Frontend</Badge>
	<Badge variant="secondary">TypeScript</Badge>
	<Badge variant="primary">Web Development</Badge>
</div>
```

## Anti-patterns to Avoid

❌ **Don't use for large content blocks**

```astro
<!-- Bad: Too much content -->
<Badge>This is a very long description that should not be in a badge</Badge>
```

✅ **Do keep content concise**

```astro
<!-- Good: Short and clear -->
<Badge>New</Badge>
<Badge>Beta</Badge>
```

❌ **Don't use for clickable actions**

```astro
<!-- Bad: Badges should not be interactive -->
<Badge onclick="...">Click me</Badge>
```

✅ **Do use Button or Link components for actions**

```astro
<!-- Good: Use appropriate components -->
<Button size="sm">Click me</Button>
```

## Related Components

- `Button` - For interactive actions
- `Chip` - For removable/selectable tags (if implemented)
- `Tag` - Alias for Badge (if needed for clarity)

## Difference from Old Badge Component

### **Old Badge (Certification)**

The previous `badge.astro` was actually a **certification card** showing achievement images. This has been moved to `entities/badges/ui/certification-badge.astro`.

**Old (Misnamed):**

```astro
<!-- This was NOT a design system badge -->
<Badge src="/badges/certification.png" alt="GitHub Foundations" href="https://..." />
```

### **New Badge (Correct)**

The new Badge is a proper design system component for labels and tags.

**New (Correct):**

```astro
<!-- This IS a design system badge -->
<Badge variant="primary">
	<Icon />
	Label
</Badge>
```

## Migration Notes

If you were using the old Badge component for certifications, use the new `CertificationBadge` from entities:

```astro
---
// Before (incorrect usage)
import { Badge } from '@/shared/ui';
---

<Badge src="/cert.png" alt="Cert" href="..." />

// After (correct usage) import {CertificationBadge} from '@/entities/badges'; ---
<CertificationBadge src="/cert.png" alt="Cert" href="..." />
```

For actual labels/tags, use the new Badge:

```astro
---
import { Badge } from '@/shared/ui';
---

<Badge variant="success">Verified</Badge>
<Badge variant="primary">Featured</Badge>
```

---

**Created:** October 12, 2025  
**Architecture:** Feature-Sliced Design (FSD)  
**Purpose:** Design system label/tag component
