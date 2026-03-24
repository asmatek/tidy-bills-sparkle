@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 222 47% 6%;
    --foreground: 220 20% 95%;

    --card: 222 40% 8%;
    --card-foreground: 220 20% 95%;

    --popover: 222 40% 8%;
    --popover-foreground: 220 20% 95%;

    --primary: 192 100% 50%;
    --primary-foreground: 222 47% 6%;

    --secondary: 22 100% 55%;
    --secondary-foreground: 0 0% 100%;

    --muted: 222 30% 14%;
    --muted-foreground: 215 20% 60%;

    --accent: 192 100% 50%;
    --accent-foreground: 222 47% 6%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --border: 220 20% 14%;
    --input: 220 20% 14%;
    --ring: 192 100% 50%;

    --radius: 0.75rem;

    --sidebar-background: 222 47% 6%;
    --sidebar-foreground: 220 20% 95%;
    --sidebar-primary: 192 100% 50%;
    --sidebar-primary-foreground: 222 47% 6%;
    --sidebar-accent: 222 30% 14%;
    --sidebar-accent-foreground: 220 20% 95%;
    --sidebar-border: 220 20% 14%;
    --sidebar-ring: 192 100% 50%;

    /* Custom Nova tokens */
    --navy: 222 47% 6%;
    --deep: 222 40% 8%;
    --electric: 192 100% 50%;
    --gold: 22 100% 55%;
    --warm: 22 100% 60%;
    --glass: 0 0% 100%;
    --glass-border: 0 0% 100%;

    /* Gradients */
    --gradient-electric: linear-gradient(135deg, hsl(192 100% 50%), hsl(192 100% 40%));
    --gradient-gold: linear-gradient(135deg, hsl(22 100% 55%), hsl(22 100% 60%));
    --gradient-hero: radial-gradient(ellipse 80% 60% at 50% 0%, hsl(192 100% 50% / 0.12) 0%, transparent 70%),
                     radial-gradient(ellipse 60% 40% at 80% 80%, hsl(22 100% 55% / 0.08) 0%, transparent 60%);
    --gradient-glow-electric: 0 0 40px hsl(192 100% 50% / 0.15);
    --gradient-glow-gold: 0 0 40px hsl(22 100% 55% / 0.15);

    /* Fonts */
    --font-heading: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 700;
    letter-spacing: -0.02em;
  }
}

@layer utilities {
  .text-gradient-electric {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, hsl(var(--electric)), hsl(192 100% 70%));
  }

  .text-gradient-gold {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, hsl(var(--gold)), hsl(var(--warm)));
  }

  .glass-card {
    background: hsl(var(--glass) / 0.04);
    border: 1px solid hsl(var(--glass-border) / 0.08);
    backdrop-filter: blur(16px);
  }

  .glass-card-electric {
    background: hsl(var(--glass) / 0.04);
    border: 1px solid hsl(var(--electric) / 0.15);
    backdrop-filter: blur(16px);
  }

  .glass-card-gold {
    background: hsl(var(--glass) / 0.04);
    border: 1px solid hsl(var(--gold) / 0.15);
    backdrop-filter: blur(16px);
  }

  .hero-grid-bg {
    background-image: linear-gradient(hsl(var(--electric) / 0.04) 1px, transparent 1px),
                       linear-gradient(90deg, hsl(var(--electric) / 0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 75%);
  }

  .glow-electric {
    box-shadow: var(--gradient-glow-electric);
  }

  .glow-gold {
    box-shadow: var(--gradient-glow-gold);
  }

  .section-padding {
    @apply px-[5vw] py-16 md:py-24;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Grid animation */
@keyframes gridDrift {
  from { background-position: 0 0; }
  to { background-position: 60px 60px; }
}

.animate-grid-drift {
  animation: gridDrift 20s linear infinite;
}
