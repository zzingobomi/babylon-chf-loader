import type { Vector2 } from "@babylonjs/core";

/**
 * Options for loading HORI/MTL files
 */
export type HoriLoadingOptions = {
  /**
   * Defines if UVs are optimized by default during load.
   */
  optimizeWithUV: boolean;
  /**
   * Defines custom scaling of UV coordinates of loaded meshes.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  UVScaling: Vector2;
  /**
   * Invert model on y-axis (does a model scaling inversion)
   */
  invertY: boolean;
  /**
   * Invert Y-Axis of referenced textures on load
   */
  invertTextureY: boolean;
  /**
   * Include in meshes the vertex colors available in some HORI files.  This is not part of HORI standard.
   */
  importVertexColors: boolean;
  /**
   * Compute the normals for the model, even if normals are present in the file.
   */
  computeNormals: boolean;
  /**
   * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
   * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
   */
  optimizeNormals: boolean;
  /**
   * Skip loading the materials even if defined in the HORI file (materials are ignored).
   */
  skipMaterials: boolean;
  /**
   * When a material fails to load HORI loader will silently fail and onSuccess() callback will be triggered.
   */
  materialLoadingFailsSilently: boolean;
};
