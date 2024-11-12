# Particle Garden

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Three](https://img.shields.io/badge/Three-Latest-orange)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Latest-purple)

<!-- ![Prettier](https://img.shields.io/badge/Prettier-Formatted-ff69b4) -->

Hello and welcome to Particle Garden, a falling sand style simulator created using TypeScript, React and Three.js

## Preview

![App Preview](.docs/preview.png)

## Features

- ✅ **Customizable Materials and Behaviour**: allows for fine grained custom physics
- ✅ **TypeScript**: Ensures type safety across the entire project

## Getting Started

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/kabirsync/particlegarden.git
   cd particlegarden
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```

### Development

Run all apps:

```sh
pnpm run dev
```

### Building

Build web & backend apps:

```sh
pnpm run build
```

Build desktop app:

```sh
pnpm --filter desktop build:linux
pnpm --filter desktop build:win
pnpm --filter desktop build:mac
```
