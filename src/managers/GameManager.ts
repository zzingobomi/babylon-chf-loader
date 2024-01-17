import {
  Engine,
  Scene,
  Color3,
  Color4,
  DirectionalLight,
  HemisphericLight,
  Vector3,
  AbstractMesh,
  FreeCamera,
  SceneLoader,
  UniversalCamera,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import { Managers } from "@src/managers/Managers";

export class GameManager {
  // babylon
  public canvas: HTMLCanvasElement;
  public engine: Engine;
  public scene: Scene;
  public camera: FreeCamera;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
  }

  public async Init() {
    await this.initScene();
    await this.initEnvironment();
    await this.initResource();

    window.onresize = () => {
      this.engine.resize();
    };

    // this.canvas.onclick = () => {
    //   this.canvas.requestPointerLock =
    //     this.canvas.requestPointerLock ||
    //     this.canvas.mozRequestPointerLock ||
    //     this.canvas.webkitRequestPointerLock;

    //   this.canvas.requestPointerLock();
    // };

    window.addEventListener("keydown", (ev) => {
      if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "I") {
        if (Inspector.IsVisible) {
          Inspector.Hide();
        } else {
          Inspector.Show(this.scene, {});
        }
      }
    });

    this.render();
  }

  private async initScene() {
    this.engine = new Engine(this.canvas, true, {
      adaptToDeviceRatio: true,
    });

    this.scene = new Scene(this.engine);
    this.camera = new UniversalCamera(
      "camera1",
      new Vector3(0, 5, -10),
      this.scene
    );
    this.camera.setTarget(Vector3.Zero());
    this.camera.attachControl(this.canvas, true);
  }

  private async initEnvironment() {
    // sky
    this.scene.clearColor = new Color4(255, 255, 255, 1);

    // ambient light
    const ambientLight = new HemisphericLight(
      "light1",
      new Vector3(0, 1, 0),
      this.scene
    );
    ambientLight.intensity = 1;
    ambientLight.groundColor = new Color3(0.13, 0.13, 0.13);
    ambientLight.specular = Color3.Black();

    // fog
    this.scene.fogMode = Scene.FOGMODE_LINEAR;
    this.scene.fogStart = 60.0;
    this.scene.fogEnd = 120.0;
    this.scene.fogColor = new Color3(0.9, 0.9, 0.85);

    // directional light
    const light = new DirectionalLight(
      "DirectionalLight",
      new Vector3(-1, -2, -1),
      this.scene
    );
    light.position = new Vector3(100, 100, 100);
    light.radius = 0.27;
    light.intensity = 2.5;
    light.autoCalcShadowZBounds = true;
  }

  private async initResource() {
    SceneLoader.Append("./", "chair.obj", this.scene, () => {
      console.log("success");
    });
  }

  private render() {
    this.engine.runRenderLoop(() => {
      if (this.scene && this.scene.activeCamera) {
        this.scene.render();
      }
    });
  }
}
