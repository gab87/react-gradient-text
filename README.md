# @_gmdev/react-gradient-text

A lightweight React component to render text with CSS gradient colors.

## Installation

```bash
npm install @_gmdev/react-gradient-text
```

## Usage

```tsx
import { ReactGradientText } from "@_gmdev/react-gradient-text";

function App() {
  return (
    <ReactGradientText
      text="Hello Gradient!"
      colors={["#ff0000", "#00ff00", "#0000ff"]}
    />
  );
}
```

## Props

| Prop        | Type          | Default      | Description                                    |
|-------------|---------------|--------------|------------------------------------------------|
| `text`      | `string`      | *required*   | Text to render                                 |
| `colors`    | `string[]`    | *required*   | Array of CSS color strings for the gradient    |
| `direction` | `string`      | `"to right"` | CSS gradient direction (e.g. `"45deg"`)        |
| `as`        | `ElementType` | `"span"`     | HTML element to render                         |
| `className` | `string`      | `undefined`  | Additional CSS class                           |
| `style`     | `CSSProperties` | `undefined` | Additional inline styles (merged with gradient) |
| `animation` | `AnimationType` | `undefined` | Animation triggered on viewport entry (`fade-in-*`, `scramble`) |
| `duration`  | `number`        | `500`        | Animation duration in milliseconds |

## Animations

Animations are triggered automatically when the element enters the viewport via `IntersectionObserver`.

**Available animations:**
- `fade-in-up`, `fade-in-down`, `fade-in-left`, `fade-in-right`
- `fade-in-top-left`, `fade-in-top-right`, `fade-in-bottom-left`, `fade-in-bottom-right`
- `scramble` — characters shuffle progressively until the final text is revealed

### Fade-in example

```tsx
<ReactGradientText
  text="Hello!"
  colors={["#667eea", "#764ba2"]}
  animation="fade-in-up"
  duration={800}
/>
```

### Scramble example

```tsx
<ReactGradientText
  text="Scramble!"
  colors={["#ff6b6b", "#4ecdc4"]}
  animation="scramble"
  duration={1000}
/>
```

## Examples

### Custom direction

```tsx
<ReactGradientText
  text="Diagonal!"
  colors={["#667eea", "#764ba2"]}
  direction="45deg"
/>
```

### As heading

```tsx
<ReactGradientText
  text="I am a heading"
  colors={["#f093fb", "#f5576c"]}
  as="h1"
/>
```

### Rainbow

```tsx
<ReactGradientText
  text="Rainbow Text"
  colors={["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"]}
/>
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run Storybook
npm run storybook

# Build the library
npm run build
```

## License

MIT
