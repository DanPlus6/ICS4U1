# 1---interfaces

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run live
```

To type check:

```bash
bun check
```

Run `bun fmt` to format the code.

This project was created using `bun init` in bun v1.4.4. [Bun](https:#bun.com) is a fast all-in-one JavaScript runtime.

---------------------------

## Project Structure Plan

### Directory Structure

```txt
src/  
├── CONFIG.ts                   // Global constants (canvas dimensions, FPS, physics)  
├── index.ts                    // Application entry point; initializes & starts engine  
├── core/                       // Engine plumbing & spatial primitives  
│   ├── Canvas.ts               // Wraps HTMLCanvasElement & CanvasRenderingContext2D  
│   ├── GameLoop.ts             // requestAnimationFrame driver & delta-time (dt) math  
│   ├── *Transform.ts*          // World-space position, rotation, and scale  
│   ├── ObjectPool.ts           // Reusable memory pool to avoid GC spikes  
│   └── SpatialGrid.ts          // Broad-phase spatial partitioning for fast collisions  
├── control/                    // Hardware input & abstract game actions  
│   ├── InputManager.ts         // Raw keyboard, mouse, and pointer event listeners  
│   └── ControlMapper.ts        // Maps raw inputs to game actions (e.g., "JUMP", "FIRE")  
├── graphics/                   // Visual rendering & asset management  
│   ├── AssetLoader.ts          // Promise-based preloader & cache for HTMLImageElements  
│   └── Sprite.ts               // Renders HTMLImageElements (supports sprite sheet crops)  
├── geometry/                   // Pure 2D mathematical shapes & hitboxes  
│   ├── Point.ts                // 2D coordinate & vector math
│   ├── Circle.ts               // Circle math & collision bounds  
│   ├── Rectangle.ts            // AABB rectangle math (replaces separate Square class)  
│   └── Triangle.ts             // Polygon/triangle math & collision bounds  
├── entities/                   // World-space actors & high-volume effects  
│   ├── *CollisionManager.ts*   // Resolves overlaps using SpatialGrid + Shape2D bounds  
│   ├── Entity.ts               // Abstract base class for active world objects  
│   ├── *EntityManager.ts*      // Manages entity lifecycle, deferred spawn/despawn, render  
│   ├── Particle.ts             // Lightweight primitive data struct for visual particles  
│   └── *ParticleManager.ts*    // Pooled, swap-and-pop batch updater & renderer  
├── types/                      // Pure interfaces & contracts (zero runtime logic)  
│   ├── Point2D.ts              // { x: number; y: number }  
│   ├── Shape2D.ts              // Area, perimeter, containsPoint(), getBoundingBox()  
│   ├── Updatable.ts            // { isAlive: boolean; update(dt: number): void }  
│   ├── Renderable.ts           // { render(ctx: CanvasRenderingContext2D, transform?): void }  
│   └── Collidable.ts           // { layer: number; mask: number; getBounds(); onCollision() }  
└── utils/                      // Stateless pure helper functions  
```

## Interfaces/Contracts

* Point2D
  * Purpose: Minimal spatial coordinate contract { x: number; y: number }.
  * Benefit: Allows functions to accept Point instances, mouse coordinates, or
    plain object literals interchangeably.

* Shape2D
  * Purpose: Standardizes geometric queries (calculateArea, calculatePerimeter,
    containsPoint, getBoundingBox).
  * Benefit: Decouples collision math from concrete entity classes.

* Updatable
  * Purpose: Standardizes time-stepped simulation:
      isAlive: boolean
      update(dt: number): void
  * Benefit: Allows GameLoop and managers to tick entities, particle systems,
    and timers uniformly.

* Renderable
  * Purpose: Standardizes canvas drawing:
      render(ctx: CanvasRenderingContext2D, transform?: Transform): void
  * Benefit: Completely decouples Entity from Sprite. An Entity can render a
    static Sprite, AnimatedSprite, ShapeRenderer, HealthBar, or nothing at all.

* Collidable
  * Purpose: Connects world entities to Shape2D hitboxes:
      layer: number
      mask: number
      getBounds(): Shape2D | undefined
      onCollision(other: Collidable): void
  * Benefit: CollisionManager resolves hits without knowing concrete subclasses.

## Core Engines

* Canvas (core/Canvas.ts)
  * Owns the canvas DOM element, 2D rendering context (ctx), resizing, and
    frame clearing (clear()).

* GameLoop (core/GameLoop.ts)
  * Owns requestAnimationFrame, calculates clamped deltaTime (dt) in seconds,
    and drives the frame pipeline:
      1. Input polling
      2. EntityManager.update(dt) & ParticleManager.update(dt)
      3. CollisionManager.resolve(...)
      4. Canvas.clear()
      5. EntityManager.render(ctx) & ParticleManager.render(ctx)

* Transform (core/Transform.ts)
  * Holds position (Point), rotation (radians), and scale (Point).
  * Shared by Entity and passed into Renderable.render() so transforms stay
    consistent without duplicating x/y/angle fields.

* AssetLoader (graphics/AssetLoader.ts)
  * Asynchronously loads and caches HTMLImageElements by string key before
    gameplay starts, ensuring Sprite never deals with raw onload callbacks.

* Sprite (graphics/Sprite.ts)
  * Implements Renderable.
  * Wraps a preloaded HTMLImageElement plus optional source crop coordinates
    (sx, sy, sw, sh) for sprite sheets. Knows how to draw onto ctx, but has
    zero knowledge of game physics or entity state.

## Entities, Particles and Managers

* Entity (entities/Entity.ts) [Abstract Base Class]
  * Implements: Updatable, Renderable, Collidable
  * Composition (Has-A relationships):
    * transform: Transform
    * visual?: Renderable   (e.g., Sprite, AnimatedSprite, or undefined)
    * collider?: Shape2D    (e.g., Circle, Rectangle, Triangle)
  * Role: Coordinates world-space behavior in update(dt) and delegates drawing
    to visual.render() and bounds checking to collider.

* EntityManager (entities/EntityManager.ts)
  * Implements: Updatable, Renderable
  * Responsibilities:
    * Maintains active entities[] list.
    * Uses deferred queues (pendingAdd / swap-and-pop removal of !isAlive)
        so spawning or killing entities mid-frame never corrupts iteration.
    * Feeds active Collidable entities to CollisionManager.
    * Sorts by zIndex (if needed) and calls entity.render(ctx).

* Particle (entities/Particle.ts)
  * Lightweight flat data struct (x, y, vx, vy, age, lifetime, size, color,
    isAlive) with a reset(...) method. Avoids heavy object/sprite overhead.

* ParticleManager (entities/ParticleManager.ts)
  * Implements: Updatable, Renderable
  * Responsibilities:
    * Pre-allocates a fixed pool of Particle instances (zero runtime GC spikes).
    * emit(x, y, count, config) activates pooled slots via particle.reset().
    * Updates active slice [0 .. activeCount - 1] and removes expired
        particles in O(1) time via swap-and-pop.
    * Batch-renders active particles directly to ctx, minimizing expensive
        ctx.save() / ctx.restore() and fillStyle state changes.

* CollisionManager & SpatialGrid (managers/CollisionManager.ts, core/SpatialGrid.ts)
  * SpatialGrid buckets active Collidable entities into grid cells each frame
    to avoid O(N^2) all-pairs checks.
  * CollisionManager filters pairs via bitmask (layer & mask), tests Shape2D
    intersections, and triggers onCollision() callbacks.

## Design Intensions

1. Composition over Inheritance:
   Entity HAS-A Transform, HAS-A Renderable (Sprite), and HAS-A Shape2D.
   Never make Entity extend Sprite or Shape2D.

2. Dependency Direction (No Circular Imports):
   types/  <--  geometry/ & graphics/  <--  entities/  <--  managers/ & core/  <--  index.ts
   (Lower layers never import from higher layers.)

3. Zero Mid-Frame Allocations at Scale:
   Mutate Point coordinates in place during update(dt) and reuse pooled
   Particle/projectile instances via reset() instead of calling `new` per frame.

4. Consolidated Geometry:
   Keep Point (with static Point.random()), Circle, Rectangle (covering squares),
   and Triangle pure and stateless regarding game rules.
