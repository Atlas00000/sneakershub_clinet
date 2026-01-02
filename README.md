# 🎨 SneakersHub Client

<div align="center">

**Next.js frontend application for real-time 3D sneaker customization**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

[Features](#-features) • [Architecture](#-architecture) • [Setup](#-setup) • [Testing](#-testing) • [Development](#-development)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Setup](#-setup)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Hooks](#-hooks)
- [State Management](#-state-management)
- [Performance Optimizations](#-performance-optimizations)
- [Testing](#-testing)
- [Development](#-development)
- [Deployment](#-deployment)

---

## 🎯 Overview

The SneakersHub Client is a Next.js application that provides an interactive 3D web interface for customizing sneakers. Built with React Three Fiber, it enables real-time material swapping, component selection, and photorealistic model visualization.

### Key Capabilities

- 🎨 **Real-time 3D Rendering** - Interactive 3D scene with Three.js and React Three Fiber
- 🎭 **Component Customization** - Select and customize individual shoe components
- 🌍 **Dynamic Environments** - Switch between HDR background environments
- 📦 **Model Management** - Load and switch between different 3D models
- 🎨 **Material Library** - Browse and apply PBR materials with texture maps
- ⚡ **Performance Optimized** - Efficient rendering with lazy loading and caching
- 📱 **Responsive Design** - Dedicated mobile and desktop layouts

---

## ✨ Features

### 🎨 Material System

- **PBR Materials** - Physically Based Rendering for realistic materials
- **Texture Maps** - Support for albedo, normal, roughness, and metallic maps
- **Material Library** - Extensive collection organized by category
- **Search & Filter** - Find materials by name, category, or description
- **Real-time Application** - Instant material swapping with visual feedback
- **Multi-Mesh Support** - Applies materials to all meshes of a component type

### 🎯 Component System

- **Automatic Detection** - Smart component identification from mesh names
- **Component Types** - Sole, Upper, Midsole, Outsole, Laces, Logo, Heel Tab, Tongue, Eyelets, Lining
- **Visual Feedback** - Subtle highlighting for hovered and selected components
- **Component Labels** - Hover labels showing component names in real-time
- **Click-to-Select** - Interactive component selection via mouse click
- **Circular Selectors** - Clean, minimalistic circular selector design

### 🌐 Viewer Features

- **HDR Backgrounds** - Realistic lighting with High Dynamic Range images
- **Multiple Models** - Switch between different sneaker models
- **Dynamic Scaling** - Automatic and manual model scaling
- **Camera Controls** - Orbit, zoom, and pan controls with smooth animations
- **Model Persistence** - Remembers selected model across sessions
- **Error Boundaries** - Graceful error handling with fallback UI

### 🎭 User Interface

- **Glassmorphic Design** - Modern, sleek UI with glassmorphism effects
- **Animated Transitions** - Smooth animations with Framer Motion
- **Responsive Layout** - Dedicated mobile and desktop layouts
- **Loading States** - Skeleton loaders and progress indicators
- **Error Handling** - Comprehensive error boundaries and fallback UI
- **Accessibility** - Keyboard navigation and ARIA labels

---

## 🏗️ Architecture

### Component Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Page Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Home       │  │  Branded     │  │   Blank      │ │
│  │   Page       │  │  Config      │  │   Config     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                 Layout Components                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Configurator │  │   Desktop    │  │   Mobile     │ │
│  │   Layout     │  │   Layout     │  │   Layout     │ │
│  │              │  │              │  │              │ │
│  │  • TopBar    │  │  • Sidebar   │  │  • Drawer    │ │
│  │  • Sidebar   │  │  • Content   │  │  • FAB       │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              Feature Components                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Viewer     │  │ Configurator │  │   Material   │ │
│  │              │  │              │  │   Library    │ │
│  │  • Scene     │  │  • Model     │  │              │ │
│  │  • Model     │  │  • Component │  │  • Search    │ │
│  │  • Camera    │  │  • Background│  │  • Filter    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│                  UI Components                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Button     │  │    Input     │  │    Panel     │ │
│  │   Card       │  │   Skeleton   │  │   Modal      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Interaction
       ↓
  UI Component
       ↓
  Zustand Store (State Management)
       ↓
  Custom Hook (Business Logic)
       ↓
  Three.js / API (Side Effects)
       ↓
  State Update
       ↓
  UI Re-render
```

---

## 🚀 Setup

### Prerequisites

- **Node.js** 18+
- **pnpm** (recommended) or npm/yarn

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NODE_ENV=development
   ```

4. **Start development server**
   ```bash
   pnpm dev
   # → http://localhost:3000
   ```

5. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

---

## 📁 Project Structure

```
client/
├── 📂 app/                      # Next.js App Router
│   ├── configurator/           # Configurator pages
│   │   ├── branded/            # Brand collection mode
│   │   └── blank/              # Blank canvas mode
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
│
├── 📂 components/              # React components
│   ├── configurator/           # Configurator UI components
│   │   ├── BackgroundSelector.tsx
│   │   ├── ComponentSelector.tsx
│   │   ├── MaterialLibrary.tsx
│   │   └── ModelSelector.tsx
│   ├── viewer/                 # 3D viewer components
│   │   ├── Scene.tsx
│   │   ├── ModelLoader.tsx
│   │   ├── ConfiguratorViewport.tsx
│   │   └── CameraControls.tsx
│   ├── layout/                 # Layout components
│   │   ├── ConfiguratorLayout.tsx
│   │   ├── DesktopLayout.tsx
│   │   ├── MobileLayout.tsx
│   │   └── TopBar.tsx
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Panel.tsx
│   │   └── Skeleton.tsx
│   ├── error/                  # Error boundary components
│   │   ├── ErrorBoundary.tsx
│   │   └── ErrorFallback.tsx
│   └── loading/                # Loading components
│       └── LoadingScreen.tsx
│
├── 📂 hooks/                   # Custom React hooks
│   ├── useModelLoader.ts       # Model loading logic
│   ├── useMaterialSwapping.ts  # Material application
│   ├── useComponentIsolation.ts # Component detection
│   ├── useModelPersistence.ts  # localStorage persistence
│   └── useDebounce.ts          # Debouncing utility
│
├── 📂 lib/                     # Utility libraries
│   ├── api/                    # API client
│   │   ├── client.ts
│   │   └── materials.ts
│   ├── three/                  # Three.js utilities
│   │   └── disposeUtils.ts
│   ├── componentMapper.ts      # Component name mapping
│   ├── materialManager.ts      # Material management
│   ├── textureLoader.ts        # Texture loading
│   └── queryClient.ts          # React Query configuration
│
├── 📂 stores/                  # Zustand stores
│   └── configuratorStore.ts    # Main application state
│
├── 📂 types/                   # TypeScript type definitions
│   ├── materials.ts
│   └── models.ts
│
├── 📂 data/                    # Static data (JSON)
│   ├── materials.json
│   ├── models.json
│   └── backgrounds.json
│
└── 📂 public/                  # Static assets
    └── textures/
```

---

## 🧩 Components

### Configurator Components

#### MaterialLibrary
Browse and search materials with category filtering.

**Features:**
- Search by name, description, or category
- Category-based filtering
- Lazy loading for performance
- Debounced search input

#### ComponentSelector
Select shoe components for customization.

**Features:**
- Circular selector design
- Component icons/emojis
- Hover tooltips
- Click-to-select interaction

#### ModelSelector
Choose from available 3D models.

**Features:**
- Grid layout with model previews
- Model information tooltips
- Model persistence (localStorage)

#### BackgroundSelector
Switch between HDR environments.

**Features:**
- Visual previews with gradients
- Real-time environment switching
- Hover tooltips with descriptions

### Viewer Components

#### Scene
Main Three.js scene wrapper with HDR environment.

#### ModelLoader
Loads and displays 3D models from Cloudflare R2.

**Features:**
- GLB file loading
- Automatic component detection
- Error handling
- Loading states

#### ConfiguratorViewport
Integrates model loading with material swapping.

**Features:**
- Material application to components
- Component hover detection
- Error boundaries

---

## 🪝 Hooks

### useModelLoader
Loads 3D models from URLs with error handling.

```typescript
const { scene, error, isLoading } = useModelLoader(modelPath);
```

### useMaterialSwapping
Applies materials to model components in real-time.

```typescript
useMaterialSwapping({
  componentMap,
  scene,
  onSwapComplete: (type, material) => console.log('Applied', material.name)
});
```

### useComponentIsolation
Extracts and identifies components from loaded models.

```typescript
const { components, componentMap } = useComponentIsolation(scene);
```

### useModelPersistence
Persists selected model to localStorage.

```typescript
useModelPersistence(); // Automatically saves/loads model selection
```

### useDebounce
Debounces values for performance optimization.

```typescript
const debouncedSearch = useDebounce(searchQuery, 300);
```

---

## 📦 State Management

### Zustand Store

The application uses Zustand for lightweight, performant state management.

**Store Structure:**
```typescript
{
  // Mode state
  currentMode: 'blank' | 'branded',
  selectedBrand?: string,
  
  // Component state
  selectedComponent: ComponentType | null,
  hoveredComponent: ComponentType | null,
  componentMap: ComponentMap,
  
  // Material state
  materialMap: MaterialMap,
  
  // Background state
  selectedBackgroundUrl: string | null,
  
  // Model state
  selectedModelId: string | null,
  selectedModelUrl: string | null,
  selectedModelScale: number,
  selectedModelPosition: [number, number, number],
  selectedModelRotation: [number, number, number],
}
```

**Usage:**
```typescript
import { useConfiguratorStore } from '@/stores/configuratorStore';

const { selectedComponent, setComponent, materialMap } = useConfiguratorStore();
```

---

## ⚡ Performance Optimizations

### Lazy Loading

- **Code Splitting** - MaterialLibrary loaded on-demand
- **Dynamic Imports** - React.lazy() for component splitting
- **Texture Lazy Loading** - Intersection Observer for images

### Caching

- **React Query** - API response caching
- **Texture Caching** - Material instance caching
- **Component Cache** - Memoized component maps

### Resource Management

- **Three.js Cleanup** - Proper disposal of geometries, materials, textures
- **Memory Leak Prevention** - useThreeCleanup hook
- **Debounced Inputs** - Reduced re-renders and API calls

### Optimization Techniques

- **Memoization** - useMemo and useCallback for expensive computations
- **Virtual Scrolling** - For large material lists (if needed)
- **Bundle Optimization** - Tree shaking and code splitting

---

## 🧪 Testing

### Testing Philosophy

We follow industry best practices for frontend testing:

- **Component Testing** - Test components in isolation
- **Integration Testing** - Test component interactions
- **E2E Testing** - Test complete user workflows
- **Visual Regression** - Ensure UI consistency
- **Performance Testing** - Monitor rendering performance

### Testing Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| **Jest** | Test runner and assertion library | Unit and integration tests |
| **React Testing Library** | Component testing utilities | React component tests |
| **Playwright** | End-to-end testing framework | E2E user flow tests |
| **@testing-library/user-event** | User interaction simulation | User interaction tests |

### Test Structure

```
tests/
├── unit/                    # Unit tests
│   ├── hooks/
│   ├── lib/
│   └── utils/
├── integration/             # Integration tests
│   ├── components/
│   └── features/
├── e2e/                    # End-to-end tests
│   └── workflows/
└── utils/                  # Test utilities
    └── test-utils.tsx
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e
```

### Test Examples

#### Component Test

```typescript
import { render, screen } from '@testing-library/react';
import MaterialSwatch from '@/components/configurator/MaterialSwatch';

describe('MaterialSwatch', () => {
  it('should render material color correctly', () => {
    const material = {
      id: 'test-material',
      name: 'Test Material',
      properties: { color: '#FF0000' }
    };
    
    render(<MaterialSwatch material={material} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveStyle({ backgroundColor: '#FF0000' });
  });
});
```

#### Hook Test

```typescript
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
  it('should debounce value updates', () => {
    jest.useFakeTimers();
    
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    );
    
    expect(result.current).toBe('initial');
    
    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Still initial
    
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(result.current).toBe('updated'); // Now updated
    
    jest.useRealTimers();
  });
});
```

#### Integration Test

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MaterialLibrary from '@/components/configurator/MaterialLibrary';

describe('MaterialLibrary Integration', () => {
  it('should filter materials by search query', async () => {
    const user = userEvent.setup();
    
    render(<MaterialLibrary />);
    
    const searchInput = screen.getByPlaceholderText('Search textures...');
    await user.type(searchInput, 'leather');
    
    await waitFor(() => {
      const materials = screen.getAllByRole('button');
      expect(materials.length).toBeGreaterThan(0);
    });
  });
});
```

### Test Coverage Goals

| Category | Target Coverage |
|----------|----------------|
| **Components** | >80% |
| **Hooks** | >85% |
| **Utilities** | >90% |
| **Overall** | >80% |

---

## 💻 Development

### Available Scripts

```bash
pnpm dev      # Start development server (port 3000)
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
pnpm test     # Run tests
pnpm test:watch  # Run tests in watch mode
pnpm test:coverage  # Run tests with coverage
```

### Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make changes**
   - Write clean, type-safe code
   - Follow component patterns
   - Add tests for new features

3. **Test locally**
   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```

4. **Commit and push**
   ```bash
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

### Code Style

- Use TypeScript for all files
- Follow React best practices (hooks rules, etc.)
- Use functional components
- Keep components small and focused
- Extract reusable logic to hooks
- Use meaningful variable names

### Debugging

- **React DevTools** - Inspect component tree and state
- **React Query DevTools** - Monitor API cache state
- **Browser Console** - Check for errors and logs
- **Network Tab** - Monitor asset loading
- **Performance Tab** - Analyze rendering performance

---

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Environment Variables

Required environment variables for production:

```env
NEXT_PUBLIC_API_URL=https://your-api-url.com
NODE_ENV=production
```

### Deployment Platforms

- **Vercel** (Recommended)
  - Automatic deployments on push
  - Edge functions support
  - Optimized Next.js builds

- **Netlify**
  - Static site hosting
  - Build plugins support

- **Self-hosted**
  - Docker container
  - Node.js server

📖 For detailed deployment instructions, see the main [README.md](../README.md#-deployment)

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

<div align="center">

**Built with ❤️ using Next.js and Three.js**

[Main README](../README.md) · [Server README](../server/README.md)

</div>
