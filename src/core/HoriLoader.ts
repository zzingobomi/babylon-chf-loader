import {
  AbstractMesh,
  AssetContainer,
  IFileRequest,
  ISceneLoaderAsyncResult,
  ISceneLoaderPlugin,
  ISceneLoaderPluginAsync,
  ISceneLoaderPluginExtensions,
  ISceneLoaderPluginFactory,
  ISceneLoaderProgressEvent,
  LoadFileError,
  Scene,
  SceneLoader,
  Vector2,
  WebRequest,
} from "@babylonjs/core";
import { HoriLoadingOptions } from "./HoriLoadingOptions";
import { MTLFileLoader } from "./MtlFileLoader";

export class HoriLoader
  implements ISceneLoaderPluginAsync, ISceneLoaderPluginFactory
{
  /**
   * Defines if UVs are optimized by default during load.
   */
  public static OPTIMIZE_WITH_UV = true;
  /**
   * Invert model on y-axis (does a model scaling inversion)
   */
  public static INVERT_Y = false;
  /**
   * Invert Y-Axis of referenced textures on load
   */
  public static get INVERT_TEXTURE_Y() {
    return MTLFileLoader.INVERT_TEXTURE_Y;
  }

  public static set INVERT_TEXTURE_Y(value: boolean) {
    MTLFileLoader.INVERT_TEXTURE_Y = value;
  }

  /**
   * Include in meshes the vertex colors available in some OBJ files.  This is not part of OBJ standard.
   */
  public static IMPORT_VERTEX_COLORS = false;
  /**
   * Compute the normals for the model, even if normals are present in the file.
   */
  public static COMPUTE_NORMALS = false;
  /**
   * Optimize the normals for the model. Lighting can be uneven if you use OptimizeWithUV = true because new vertices can be created for the same location if they pertain to different faces.
   * Using OptimizehNormals = true will help smoothing the lighting by averaging the normals of those vertices.
   */
  public static OPTIMIZE_NORMALS = false;
  /**
   * Defines custom scaling of UV coordinates of loaded meshes.
   */
  public static UV_SCALING = new Vector2(1, 1);
  /**
   * Skip loading the materials even if defined in the OBJ file (materials are ignored).
   */
  public static SKIP_MATERIALS = false;

  /**
   * When a material fails to load OBJ loader will silently fail and onSuccess() callback will be triggered.
   *
   * Defaults to true for backwards compatibility.
   */
  public static MATERIAL_LOADING_FAILS_SILENTLY = true;
  /**
   * Defines the name of the plugin.
   */
  public name = "hori";
  /**
   * Defines the extension the plugin is able to load.
   */
  public extensions = ".hori";

  private _loadingOptions: HoriLoadingOptions;

  /**
   * Creates loader for .OBJ files
   *
   * @param loadingOptions options for loading and parsing OBJ/MTL files.
   */
  constructor(loadingOptions?: HoriLoadingOptions) {
    this._loadingOptions = loadingOptions || HoriLoader._DefaultLoadingOptions;
  }

  private static get _DefaultLoadingOptions(): HoriLoadingOptions {
    return {
      computeNormals: HoriLoader.COMPUTE_NORMALS,
      optimizeNormals: HoriLoader.OPTIMIZE_NORMALS,
      importVertexColors: HoriLoader.IMPORT_VERTEX_COLORS,
      invertY: HoriLoader.INVERT_Y,
      invertTextureY: HoriLoader.INVERT_TEXTURE_Y,
      UVScaling: HoriLoader.UV_SCALING,
      materialLoadingFailsSilently: HoriLoader.MATERIAL_LOADING_FAILS_SILENTLY,
      optimizeWithUV: HoriLoader.OPTIMIZE_WITH_UV,
      skipMaterials: HoriLoader.SKIP_MATERIALS,
    };
  }

  /**
   * Instantiates a hori file loader plugin.
   * @returns the created plugin
   */
  createPlugin(): ISceneLoaderPluginAsync | ISceneLoaderPlugin {
    return new HoriLoader(HoriLoader._DefaultLoadingOptions);
  }

  /**
   * If the data string can be loaded directly.
   * @returns if the data can be loaded directly
   */
  canDirectLoad?(data: string): boolean {
    return false;
  }

  /**
   * Imports one or more meshes from the loaded OBJ data and adds them to the scene
   * @param meshesNames a string or array of strings of the mesh names that should be loaded from the file
   * @param scene the scene the meshes should be added to
   * @param data the OBJ data to load
   * @param rootUrl root url to load from
   * @returns a promise containing the loaded meshes, particles, skeletons and animations
   */
  public importMeshAsync(
    meshesNames: any,
    scene: Scene,
    data: any,
    rootUrl: string
  ): Promise<ISceneLoaderAsyncResult> {
    //get the meshes from OBJ file
    return this._parseSolid(meshesNames, scene, data, rootUrl).then(
      (meshes) => {
        return {
          meshes: meshes,
          particleSystems: [],
          skeletons: [],
          animationGroups: [],
          transformNodes: [],
          geometries: [],
          lights: [],
        };
      }
    );
  }

  /**
   * Imports all objects from the loaded OBJ data and adds them to the scene
   * @param scene the scene the objects should be added to
   * @param data the OBJ data to load
   * @param rootUrl root url to load from
   * @returns a promise which completes when objects have been loaded to the scene
   */
  public loadAsync(scene: Scene, data: string, rootUrl: string): Promise<void> {
    // TODO: 여기서 data 가 이미 horifile 에서 읽은 데이터가 들어온다.
    // 결국 저 data 를 외부에서 (ex web?) 계속 읽어올수 있어야 할거 같긴한데...
    //Get the 3D model
    return this.importMeshAsync(null, scene, data, rootUrl).then(() => {
      // return void
    });
  }

  /**
   * Load into an asset container.
   * @param scene The scene to load into
   * @param data The data to import
   * @param rootUrl The root url for scene and resources
   * @returns The loaded asset container
   */
  public loadAssetContainerAsync(
    scene: Scene,
    data: string,
    rootUrl: string
  ): Promise<AssetContainer> {
    console.log("loadAssetContainerAsync");
    throw "loadAssetContainerAsync";
  }

  /**
   * Read the OBJ file and create an Array of meshes.
   * Each mesh contains all information given by the OBJ and the MTL file.
   * i.e. vertices positions and indices, optional normals values, optional UV values, optional material
   * @param meshesNames defines a string or array of strings of the mesh names that should be loaded from the file
   * @param scene defines the scene where are displayed the data
   * @param data defines the content of the obj file
   * @param rootUrl defines the path to the folder
   * @returns the list of loaded meshes
   */
  private _parseSolid(
    meshesNames: any,
    scene: Scene,
    data: string,
    rootUrl: string
  ): Promise<Array<AbstractMesh>> {
    throw "_parseSolid";
  }
}

if (SceneLoader) {
  //Add this loader into the register plugin
  SceneLoader.RegisterPlugin(new HoriLoader());
}
