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

---

## Project Structure Plan

## Design Intensions

- optimized system to be able to manage updates of game elements and objects of very high quantities
- modular code, split into parts

  - easy to collaborate on
  - single responsibility
  - mostly clean and easy to understand structure without too much redundancy
  - this project can be easily adapted for another project
- use good design patterns (don't have to strictly follow industry standards but if it works and is clean its fine)

  - Composition over Inheritance:

    - Entity HAS-A Transform, HAS-A Renderable (Sprite), and HAS-A Shape2D.
  - Single responsibility and decouple stuff

    - ex: ever make Entity extend Sprite or Shape2D
  - Dependency Direction (No Circular Imports)

    - no ascending hierarchy
    - types/  <--  geometry/ & graphics/  <--  entities/  <--  managers/ & core/  <--  index.ts
  - Zero Mid-Frame Allocations at Scale:

    - Mutate Point coordinates in place during update(dt) and reuse pooled
    - Particle/projectile instances via reset() instead of calling `new` per frame
  - Consolidated Geometry:

    - Keep Point (with static Point.random()), Circle, Rectangle (covering squares), and Triangle pure and stateless regarding game rules.

### Directory Structure

```txt
src/
├── index.ts				// main script that is included by sole html page
├── CONFIG.ts				// global const configs

├── control					// user control stuff
│   ├── ControlMapper.ts	// maps input to control actions
│   └── InputManager.ts		// manages/receives player control input

├── core					// core engines and stuff that are (for entire game and not specific stuff e.g entities, geometry)
│   ├── Canvas.ts			// game canvas
│   ├── GameLoop.ts			// class (may not have to be) for managing updating the game (loop)
│   ├── ObjectPool.ts		// template for creating pools for game-objects (e.g players, entities, particles)
│   ├── SpatialGrid.ts		// spatial grid for containing bottom "real-space layer" game objects
│   └── Updateable.ts		// contract for updateable game objects (e.g particles, player, walls) for managers

├── entities				// bottom/real-space layer stuff
│   ├── Collideable.ts		// contract for collideable game objects
│   ├── CollisionManager.ts	// class (could be singleton) for managing collision between objects
│   ├── Entity.ts			// class for defining "entities," base real-space objects
│   ├── EntityManager.ts	// class (could be singleton) for managing entity pooling (spawning entities, sending dead to limbo, reusing dead)
│   ├── Kinematic2D.ts		// contract for 2d kinematic quantities for real-space game objects (should be entities)
│   └── ParticleManager.ts	// class (could singleton?) for managing particles spawning and pooling

├── geometry				// shapes
│   ├── Circle.ts			// circle shape? deprecate?
│   ├── Particle.ts			// class for defining particles (top view layer, no interaction)
│   ├── Point.ts			// DEPRECATED: used to define kinematic quantities
│   ├── RandomPoint.ts		// DEPRECATED remove/fuse into point or smth idk
│   ├── Rectangle.ts		// rectangle shape? deprecate?
│   └── Triangle.ts			// triangle shape? deprecate?

├── graphics				// rendering related stuff, (NOT restricted to top view layer)
│   ├── AssetLoader.ts		// class (could singleton?) managing asset loading, mostly used at start to make sure needed assets are loaded
│   ├── Render2DData.ts		// contract for 2d renderable element quantities
│   ├── Renderable.ts		// class for renderable element (does not matter layer)
│   └── Sprite.ts			// a renderable element for images

└── lib						// stateless functions (for sharing, decoupling & simplify responsibility)
    └── randomInt.ts
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
