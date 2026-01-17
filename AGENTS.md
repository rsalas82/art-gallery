# Agent Guidelines for Art Gallery Project

This document provides coding agents with essential information about this React Native (Expo) codebase.

## Project Overview

- **Framework**: React Native with Expo (~54.0.0)
- **Router**: Expo Router v6.0.0 (file-based routing)
- **Language**: TypeScript with strict mode enabled
- **UI**: React Native 0.76.6 with React 18.3.1
- **Package Manager**: npm

## Build, Lint & Test Commands

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android device/emulator
npm run ios            # Run on iOS device/simulator
npm run web            # Run web version

# Quality Checks
npm run test:eslint    # Run ESLint with colored output
npm run test:tsc       # Run TypeScript type checking

# Combined checks (run both)
npm run test:eslint && npm run test:tsc
```

**Note**: No unit test framework is currently configured. If tests are added later, use:

```bash
npm test -- path/to/test.test.ts        # Run single test file
npm test -- --watch path/to/test.test.ts # Watch mode
```

## Code Style & Formatting

### Prettier Configuration

- **No semicolons** (`semi: false`)
- **Single quotes** for strings
- **120 character line width**
- **Trailing commas everywhere**
- **2 space indentation** (no tabs)
- **Arrow parens**: Avoid when possible (`x => x` not `(x) => x`)
- **JSX**: Closing bracket on same line as last prop

### ESLint

- Uses `eslint-config-universe` (Expo's opinionated config)
- Enforces `react-hooks/recommended` rules
- Always follow React hooks rules (dependencies, ordering, naming)

## TypeScript Guidelines

### Strict Mode

- **Strict mode enabled** - all strict type checks are on
- Never use `any` types - always provide specific types
- Explicit return type annotations on all functions and methods

### Type Definitions

- All types centralized in `src/types/types.d.ts`
- Use `interface` (not `type` aliases) for consistency
- Export all types as named exports

### Component Props

```typescript
interface Props {
  label: string
  theme?: string // Optional with ?
  onPress: () => Promise<void> | void // Union for callbacks
}

const Component = ({ label, theme, onPress }: Props) => {
  // Implementation
}
```

### State Typing

```typescript
// Explicit typing for complex types
const [users, setUsers] = useState<FlatUser[]>([])
const [pickedSticker, setPickedSticker] = useState<ImageProps | null>(null)

// Inference OK for primitives
const [showOptions, setShowOptions] = useState(false)
```

## File Structure & Naming

### Directory Structure

```
app/                    # Expo Router pages (file-based routing)
  _layout.tsx          # Root layout (underscore prefix)
  index.tsx            # Home page
  feature-name/        # Feature directory (kebab-case)
    index.tsx          # Feature route
    [id].tsx           # Dynamic route parameter
src/
  components/          # Reusable UI components
  hooks/               # Custom React hooks (useXxx)
  services/            # API/data services
  adapters/            # Data transformation layer
  types/               # TypeScript type definitions
assets/
  images/              # Static images
  fonts/               # Font files
```

### File Naming Conventions

- **Components**: `kebab-case.tsx` (e.g., `circle-button.tsx`)
- **Pages**: `index.tsx` or `[param].tsx` for dynamic routes
- **Layouts**: `_layout.tsx` (underscore prefix)
- **Hooks**: `useXxx.tsx` (camelCase with 'use' prefix)
- **Services/Adapters**: `plural-noun.ts` (e.g., `users.ts`)
- **Types**: `types.d.ts`
- **Assets**: `kebab-case` with descriptive names

## Import/Export Patterns

### Import Order

```typescript
// 1. External dependencies (Expo, React, React Native)
import { useFonts } from '@expo-google-fonts/inter'
import { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

// 2. Internal imports (components, hooks, services, types)
import Button from '../../src/components/button'
import { useUsers } from '../../src/hooks/useUsers'
import { FlatUser } from '../types/types'

// 3. Asset imports (use require())
const PlaceholderImage = require('../../assets/images/background-image.png')
```

### Export Patterns

- **Components**: Default export for the component
- **Services/Hooks**: Named exports
- **Types**: Always named exports

```typescript
// Component
export default Button

// Service
export async function getUsers(name: string): Promise<FlatUser[]> {}

// Types
export interface User {}
```

## Component Structure

```typescript
// 1. Imports
import { View, Text, StyleSheet } from 'react-native'

// 2. Types/Interfaces
interface Props {
  // Props definition
}

// 3. Component Function
const ComponentName = ({ prop1, prop2 }: Props) => {
  // State declarations
  const [state, setState] = useState()

  // Refs
  const ref = useRef()

  // Custom hooks
  const data = useCustomHook()

  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies])

  // Event handlers
  const handleEvent = () => {
    // Handle event
  }

  // Render
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  )
}

// 4. Default Export
export default ComponentName

// 5. Styles (always at bottom)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
})
```

## Error Handling

### Async Operations

```typescript
try {
  const result = await someAsyncOperation()
  // Handle success
} catch (e) {
  console.log(e) // Log errors for debugging
  // Optionally show user-facing message with alert()
}
```

### Promise Chains

```typescript
getUsers(name)
  .then(items => setUsers(items))
  .catch(() => setUsers([])) // Fail gracefully with defaults
```

### User-Facing Errors

- Use `alert()` for simple user notifications
- Provide empty arrays/default values on failures

## Styling Patterns

- Always use `StyleSheet.create()` (never inline style objects)
- Define styles at bottom of file
- Use `flex: 1` for flexible containers
- Use `gap` property for spacing (modern React Native)
- Keep consistent spacing and alignment

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16, // Modern spacing approach
  },
})
```

## Navigation (Expo Router)

```typescript
import { router, useGlobalSearchParams } from 'expo-router'

// Navigate to route
router.push({ pathname: '/users', params: { id: '123' } })

// Go back
router.back()

// Get route params
const { id, name } = useGlobalSearchParams<{ id: string; name: string }>()
```

## Environment Variables

- Client-side env vars use `EXPO_PUBLIC_` prefix
- Access via `process.env.EXPO_PUBLIC_VAR_NAME`
- Store in `.env` file (not committed to git)

## Common Patterns

### Custom Hooks

```typescript
export const useCustomHook = (param: string) => {
  const [data, setData] = useState<DataType[]>([])

  useEffect(() => {
    getService(param)
      .then(items => setData(items))
      .catch(() => setData([]))
  }, [param])

  return data
}
```

### Service Layer

```typescript
export async function getData(param: string): Promise<OutputType[]> {
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(({ results }) => {
      const data: OutputType[] = results.map((item: InputType) => adaptData(item))
      return Promise.resolve(data)
    })
}
```

### Adapter Pattern

```typescript
export function adaptData(input: InputType): OutputType {
  return {
    field1: input.nested.field,
    field2: `${input.first} ${input.last}`,
    field3: input.number.toString(),
  }
}
```

## Architecture Guidelines

### Layered Architecture

- **Presentation**: `app/` (pages) and `src/components/` (reusable components)
- **Business Logic**: `src/hooks/` (custom hooks)
- **Data Access**: `src/services/` (API calls)
- **Data Transformation**: `src/adapters/` (API response → app models)
- **Types**: Centralized in `src/types/`

### Best Practices

- Single responsibility per file/component
- Co-locate styles with components
- Functional components only (no classes)
- Modern React patterns with hooks
- Type-safe prop drilling or custom hooks for data flow
- Use `require()` for static asset imports

## Important Notes

- This project uses Expo's managed workflow
- Multi-platform support: iOS, Android, and Web
- EAS configured for builds
- No global state management (use local state and custom hooks)
- Asset imports must use `require()` syntax
- Always run `npm run test:eslint && npm run test:tsc` before committing
