import * as THREE from 'three';

/**
 * Dispose of a Three.js object and all its resources
 * 
 * @param object - Three.js object to dispose (Object3D, Geometry, Material, Texture, etc.)
 */
export function disposeObject(object: THREE.Object3D | THREE.BufferGeometry | THREE.Material | THREE.Texture | null | undefined): void {
  if (!object) return;

  // Dispose geometries
  if (object instanceof THREE.BufferGeometry) {
    object.dispose();
    return;
  }

  // Dispose materials
  if (object instanceof THREE.Material) {
    // Dispose textures used by the material
    // Access material properties safely to dispose textures
    const material = object as any;
    const textureProperties = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap', 'bumpMap', 'displacementMap', 'envMap'];
    textureProperties.forEach((prop) => {
      const texture = material[prop];
      if (texture && texture instanceof THREE.Texture) {
        texture.dispose();
      }
    });
    object.dispose();
    return;
  }

  // Dispose textures
  if (object instanceof THREE.Texture) {
    object.dispose();
    return;
  }

  // For Object3D, dispose all children and resources
  if (object instanceof THREE.Object3D) {
    // Dispose geometries
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Dispose geometry
        if (child.geometry) {
          child.geometry.dispose();
        }

        // Dispose materials
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => disposeMaterial(material));
          } else {
            disposeMaterial(child.material);
          }
        }
      }

      // Dispose lights
      if (child instanceof THREE.Light) {
        if (child.shadow) {
          if (child.shadow.map) {
            child.shadow.map.dispose();
          }
        }
      }
    });

    // Remove from parent
    if (object.parent) {
      object.parent.remove(object);
    }

    // Clear children
    while (object.children.length > 0) {
      object.remove(object.children[0]);
    }
  }
}

/**
 * Dispose of a material and all its textures
 * 
 * @param material - Material to dispose
 */
export function disposeMaterial(material: THREE.Material): void {
  if (!material) return;

  // Dispose textures used by the material
  // Access material properties safely to dispose textures
  const mat = material as any;
  const textureProperties = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap', 'bumpMap', 'displacementMap', 'envMap'];
  textureProperties.forEach((prop) => {
    const texture = mat[prop];
    if (texture && texture instanceof THREE.Texture) {
      texture.dispose();
    }
  });

  material.dispose();
}

/**
 * Dispose of a geometry
 * 
 * @param geometry - Geometry to dispose
 */
export function disposeGeometry(geometry: THREE.BufferGeometry): void {
  if (!geometry) return;
  geometry.dispose();
}

/**
 * Dispose of a texture
 * 
 * @param texture - Texture to dispose
 */
export function disposeTexture(texture: THREE.Texture): void {
  if (!texture) return;
  texture.dispose();
}

/**
 * Dispose of multiple resources
 * 
 * @param resources - Array of resources to dispose
 */
export function disposeResources(
  resources: Array<THREE.Object3D | THREE.BufferGeometry | THREE.Material | THREE.Texture | null | undefined>
): void {
  resources.forEach((resource) => disposeObject(resource));
}

/**
 * Clean up a scene by disposing all objects
 * 
 * @param scene - Scene to clean up
 */
export function disposeScene(scene: THREE.Scene): void {
  if (!scene) return;

  // Dispose all objects in the scene
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => disposeMaterial(material));
        } else {
          disposeMaterial(object.material);
        }
      }
    }
  });

  // Clear the scene
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
}

