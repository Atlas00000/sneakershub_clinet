# 🎨 Fashion Configurator Client

<div align="center">

**Next.js frontend application for real-time 3D sneaker customization**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Setup](#-setup)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Hooks](#-hooks)
- [State Management](#-state-management)
- [Development](#-development)
- [Deployment](#-deployment)

---

## 🎯 Overview

The Fashion Configurator Client is a Next.js application that provides an interactive 3D web interface for customizing sneakers. Built with React Three Fiber, it enables real-time material swapping, component selection, and model visualization.

### Key Capabilities

- 🎨 **Real-time 3D Rendering** - Interactive 3D scene with Three.js
- 🎭 **Component Customization** - Select and customize individual shoe components
- 🌍 **Dynamic Environments** - Switch between HDR background environments
- 📦 **Model Management** - Load and switch between different 3D models
- 🎨 **Material Library** - Browse and apply PBR materials
- ⚡ **Performance Optimized** - Efficient rendering with texture caching

---

## ✨ Features

### 🎨 Material System
- **PBR Materials** - Physically Based Rendering for realistic materials
- **Texture Support** - Albedo, normal, roughness, and metallic maps
- **Color Customization** - Solid colors and textured materials
- **Material Categories** - Leather, rubber, fabric, metal, premium
- **Material Swatches** - Visual material previews

### 🎯 Component System
- **Automatic Detection** - Smart component identification from mesh names
- **Component Types** - Sole, Upper, Midsole, Outsole, Laces, Logo, Heel Tab, Tongue, Eyelets, Lining
- **Visual Selection** - Subtle highlighting for hovered and selected components
- **Component Labels** - Real-time hover labels showing component names
- **Click-to-Select** - Interactive component selection via mouse click
- **Material Mapping** - Apply materials to specific components

### 🌐 Environment & Models
- **HDR Backgrounds** - Realistic lighting with High Dynamic Range images
- **Multiple Models** - Switch between different sneaker models
- **Dynamic Scaling** - Automatic and manual model scaling
- **Camera Controls** - Orbit, zoom, and pan controls

### 🎛️ User Interface
- **Component Selector** - Choose which part to customize
- **Material Library** - Browse available materials
- **Background Selector** - Switch HDR environments
- **Model Selector** - Switch between 3D models
- **Mode Selector** - Toggle between blank and branded modes
- **Interactive Labels** - Hover over components to see names
- **Visual Feedback** - Subtle highlights indicate hover and selection states

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Pages                              │  │
│  │  • /configurator/branded                             │  │
│  │  • /configurator/blank                                │  │
│  │  • / (home)                                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Configurator Components                  │  │
│  │  • ComponentSelector                                 │  │
│  │  • MaterialLibrary                                   │  │
│  │  • BackgroundSelector                                │  │
│  │  • ModelSelector                                     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                Viewer Components                     │  │
│  │  • Scene (Three.js Canvas)                          │  │
│  │  • ConfiguratorViewport                             │  │
│  │  • ModelLoader                                       │  │
│  │  • CameraControls                                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Custom Hooks                        │  │
│  │  • useModelLoader                                    │  │
│  │  • useComponentIsolation                             │  │
│  │  • useMaterialSwapping                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              State Management (Zustand)             │  │
│  │  • configuratorStore                                │  │
│  │    - Component state                                │  │
│  │    - Material state                                 │  │
│  │    - Model state                                    │  │
│  │    - Background state                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Utility Libraries                   │  │
│  │  • componentMapper                                  │  │
│  │  • materialManager                                  │  │
│  │  • textureLoader                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Setup

### Prerequisites

- **Node.js** 18+
- **pnpm** (or npm/yarn)

### Installation

1. **Install dependencies**
   ```bash
   cd client
   pnpm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API URL
   ```

3. **Start development server**
   ```bash
   pnpm dev
   # Application runs on http://localhost:3000
   ```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 📁 Project Structure

```
client/
├── 📂 app/                      # Next.js App Router
│   ├── configurator/
│   │   ├── branded/            # Brand collection mode page
│   │   │   └── page.tsx
│   │   └── blank/              # Blank canvas mode page
│   │       └── page.tsx
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
│
├── 📂 components/
│   ├── configurator/           # Configurator UI components
│   │   ├── ComponentSelector.tsx
│   │   ├── MaterialLibrary.tsx
│   │   ├── MaterialSwatch.tsx
│   │   ├── BackgroundSelector.tsx
│   │   ├── ModelSelector.tsx
│   │   └── ModeSelector.tsx
│   └── viewer/                 # 3D viewer components
│       ├── Scene.tsx
│       ├── ConfiguratorViewport.tsx
│       ├── ModelLoader.tsx
│       ├── CameraControls.tsx
│       └── LoadingSpinner.tsx
│
├── 📂 hooks/                    # Custom React hooks
│   ├── useModelLoader.ts
│   ├── useComponentIsolation.ts
│   ├── useMaterialSwapping.ts
│   ├── useComponentHover.ts
│   └── useComponentLabel.ts
│
├── 📂 lib/                      # Utility libraries
│   ├── componentMapper.ts      # Component name mapping
│   ├── materialManager.ts      # Material management
│   ├── textureLoader.ts        # Texture loading utilities
│   └── cloudflare/
│       └── r2Client.ts         # R2 client (if needed)
│
├── 📂 stores/                   # Zustand state management
│   └── configuratorStore.ts
│
├── 📂 data/                     # Static data (JSON)
│   ├── materials.json          # Material definitions
│   ├── models.json             # Model definitions
│   └── backgrounds.json        # HDR background URLs
│
├── 📂 types/                    # TypeScript type definitions
│   ├── materials.ts
│   └── models.ts
│
├── 📂 public/                   # Static assets
│   └── textures/               # Local texture files
│
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

---

## 🧩 Components

### Configurator Components

#### `ComponentSelector`
Displays available components and allows selection.

**Props:** None (uses Zustand store)

**Features:**
- Lists detected components from the model
- Highlights selected component
- Shows component count per type

#### `MaterialLibrary`
Displays available materials organized by category.

**Props:** None (uses Zustand store)

**Features:**
- Material categories (leather, rubber, fabric, metal, premium)
- Material swatches with previews
- Apply materials to selected component
- Price modifiers display

#### `MaterialSwatch`
Individual material preview card.

**Props:**
- `material: Material` - Material definition
- `onSelect: () => void` - Selection handler

#### `BackgroundSelector`
Allows switching between HDR background environments.

**Props:** None (uses Zustand store)

**Features:**
- List of available HDR backgrounds
- Preview thumbnails (if available)
- Real-time environment switching

#### `ModelSelector`
Allows switching between different 3D models.

**Props:** None (uses Zustand store)

**Features:**
- List of available models
- Model metadata (name, type)
- Automatic model loading

### Viewer Components

#### `Scene`
Main Three.js canvas wrapper with environment setup.

**Props:**
- `children: React.ReactNode` - Scene content

**Features:**
- HDR environment loading
- Camera setup
- Lighting configuration

#### `ConfiguratorViewport`
Main viewport component that orchestrates model loading and material swapping.

**Props:**
- `modelPath: string` - Model URL or path
- `scale?: number` - Model scale
- `position?: [number, number, number]` - Model position
- `rotation?: [number, number, number]` - Model rotation

**Features:**
- Model loading
- Component isolation
- Material swapping integration

#### `ModelLoader`
Handles GLB model loading and component extraction.

**Props:**
- `modelPath: string` - Model URL
- `scale?: number` - Model scale
- `position?: [number, number, number]` - Model position
- `rotation?: [number, number, number]` - Model rotation
- `onLoad?: (components: ComponentInfo[]) => void` - Load callback

**Features:**
- GLB file loading with `useGLTF`
- Component extraction
- Bounding box calculation
- Scale suggestions

#### `CameraControls`
Orbit controls for camera interaction.

**Props:** None (uses default Three.js OrbitControls)

**Features:**
- Mouse/touch controls
- Zoom, pan, rotate
- Auto-rotate (optional)

#### `ComponentHighlighter`
Applies subtle visual highlighting to hovered and selected components.

**Props:**
- `componentMap: ComponentMap` - Component map
- `enabled?: boolean` - Whether highlighting is enabled
- `hoverColor?: string | number` - Hover highlight color
- `selectedColor?: string | number` - Selected highlight color
- `highlightIntensity?: number` - Highlight intensity (0-1)

**Features:**
- Subtle emissive highlighting using material properties
- Hover and selected state differentiation
- Non-intrusive design that preserves material visibility
- Automatic cleanup when materials are swapped

#### `ComponentLabelOverlay`
HTML overlay that displays component names on hover.

**Props:**
- `enabled?: boolean` - Whether labels are enabled

**Features:**
- Real-time position calculation from 3D to screen coordinates
- Visibility detection (only shows when component is in front of camera)
- Styled overlay with component names
- Non-intrusive pointer-events-none design

#### `ComponentLabelTracker`
Tracks component label positions inside Canvas context.

**Props:**
- `componentMap: ComponentMap` - Component map
- `enabled?: boolean` - Whether tracking is enabled

**Features:**
- Calculates label positions using raycasting
- Updates store with label position data
- Must be rendered inside Canvas context

---

## 🪝 Hooks

### `useModelLoader`
Custom hook for loading 3D models.

**Returns:**
- `model: GLTF | null` - Loaded model
- `loading: boolean` - Loading state
- `error: Error | null` - Error state

**Usage:**
```typescript
const { model, loading, error } = useModelLoader(modelUrl);
```

### `useComponentIsolation`
Isolates and identifies components from a loaded model.

**Parameters:**
- `model: GLTF | null` - Loaded model

**Returns:**
- `components: ComponentInfo[]` - Detected components
- `componentMap: ComponentMap` - Components grouped by type

**Usage:**
```typescript
const { components, componentMap } = useComponentIsolation(model);
```

### `useMaterialSwapping`
Handles material application to components.

**Returns:**
- `applyMaterial: (component: ComponentType, material: Material) => void`
- `clearMaterial: (component: ComponentType) => void`

**Usage:**
```typescript
const { applyMaterial, clearMaterial } = useMaterialSwapping();
```

### `useComponentHover`
Detects component hover and click interactions using raycasting.

**Parameters:**
- `componentMap: ComponentMap` - Component map
- `enabled?: boolean` - Whether hover detection is enabled
- `onHover?: (componentType: ComponentType | null) => void` - Hover callback
- `onClick?: (componentType: ComponentType | null) => void` - Click callback

**Returns:**
- `enabled: boolean` - Current enabled state

**Usage:**
```typescript
useComponentHover({
  componentMap,
  enabled: true,
  onHover: (type) => console.log('Hovered:', type),
  onClick: (type) => console.log('Clicked:', type),
});
```

### `useComponentLabel`
Calculates screen position for component labels from 3D coordinates.

**Parameters:**
- `componentMap: ComponentMap` - Component map

**Returns:**
- `LabelPosition | null` - Label position with x, y, visible, componentType, componentName

**Usage:**
```typescript
const labelPosition = useComponentLabel(componentMap);
```

---

## 🗄️ State Management

### Zustand Store (`configuratorStore`)

**State:**
- `currentMode: 'blank' | 'branded'` - Current configurator mode
- `selectedComponent: ComponentType | null` - Selected component
- `componentMap: ComponentMap` - Detected components
- `materialMap: MaterialMap` - Applied materials
- `selectedBackgroundUrl: string | null` - Current HDR background
- `selectedModelId: string | null` - Selected model ID
- `selectedModelUrl: string | null` - Selected model URL
- `selectedModelScale: number` - Model scale
- `selectedModelPosition: [number, number, number]` - Model position
- `selectedModelRotation: [number, number, number]` - Model rotation

**Actions:**
- `setMode(mode)` - Set configurator mode
- `setComponent(component)` - Select component
- `setMaterial(componentType, material)` - Apply material
- `clearMaterial(componentType)` - Remove material
- `setBackground(url)` - Set HDR background
- `setModel(id, url, scale, position, rotation)` - Set model

**Usage:**
```typescript
import { useConfiguratorStore } from '@/stores/configuratorStore';

const { selectedComponent, setComponent, setMaterial } = useConfiguratorStore();
```

---

## 💻 Development

### Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

### Development Workflow

1. **Make changes** to components or pages
2. **Hot reload** automatically updates the browser
3. **Check console** for component detection logs
4. **Test materials** by selecting components and applying materials
5. **Verify** model scaling and positioning

### Debugging

- **Browser Console** - Check for component detection logs
- **Network Tab** - Monitor texture and model loading
- **React DevTools** - Inspect component state
- **Three.js Inspector** - Debug 3D scene (if installed)

### Component Detection

The system automatically detects components from mesh names. Check the browser console for:
- Detected component types
- Mesh names and their mappings
- Unknown meshes (need naming updates)

### Material Application

Materials are applied in real-time. The system:
1. Identifies the selected component
2. Finds all meshes of that component type
3. Applies the material to those meshes
4. Updates the 3D scene

---

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

This creates an optimized production build in `.next/`.

### Start Production Server

```bash
pnpm start
```

### Deploy to Vercel

1. **Connect repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** automatically on push to main branch

### Environment Variables

Set in your deployment platform:
- `NEXT_PUBLIC_API_URL` - Backend API URL

---

## 📚 Key Concepts

### Component Mapping

Components are identified by matching mesh names to patterns:

```typescript
// Example patterns
SOLE: ['sole', 'insole', 'bottom', 'base']
UPPER: ['upper', 'suede', 'leather', 'body']
LINING: ['lining', 'satin', 'inner']
```

### Material Properties

Materials use PBR (Physically Based Rendering) properties:

```typescript
{
  color: '#ffffff',           // Base color (tint)
  map: 'albedo-url',          // Albedo texture
  normalMap: 'normal-url',    // Normal map
  roughnessMap: 'roughness-url', // Roughness map
  roughness: 0.7,            // Base roughness
  metalness: 0.0             // Base metalness
}
```

### Texture Loading

Textures are loaded with caching:

```typescript
import { loadTexture } from '@/lib/textureLoader';

const texture = await loadTexture('path/to/texture.jpg');
```

Supports:
- Full URLs (R2 public URLs)
- Relative R2 paths
- Local public folder paths

---

## 🐛 Troubleshooting

### Model Not Loading

**Check:**
- Model URL is correct
- CORS headers are configured on R2
- Network tab for errors
- Console for loading errors

### Components Not Detected

**Check:**
- Mesh names follow naming conventions
- Browser console for detection logs
- Update `componentMapper.ts` if needed

### Materials Appear Black

**Solution:**
- Ensure `color` property is `#ffffff` for textured materials
- Check texture URLs are accessible
- Verify texture maps are loaded

### Performance Issues

**Optimize:**
- Reduce texture resolution
- Use compressed GLB files
- Enable texture caching
- Reduce model complexity

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber/)
- [Three.js Documentation](https://threejs.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 📝 License

This project is private and proprietary.

---

<div align="center">

**Built with ❤️ for immersive 3D web experiences**

</div>

