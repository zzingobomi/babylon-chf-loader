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
  MeshBuilder,
  ArcRotateCamera,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import { Managers } from "@src/managers/Managers";

export class GameManager {
  // babylon
  public canvas: HTMLCanvasElement;
  public engine: Engine;
  public scene: Scene;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
  }

  public async Init() {
    await this.initScene();
    await this.initResource();

    window.onresize = () => {
      this.engine.resize();
    };

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
    this.scene.createDefaultCameraOrLight(true, true, true);
    this.scene.createDefaultEnvironment();
    const helperCamera = this.scene.activeCamera as ArcRotateCamera;
    helperCamera.radius = 5;
  }

  private async initResource() {
    SceneLoader.Append("./", "cubetest.hori", this.scene, () => {
      console.log("success");
    });
    // SceneLoader.Append("./", "cube.obj", this.scene, () => {
    //   console.log("success");
    // });
  }

  private render() {
    this.engine.runRenderLoop(() => {
      if (this.scene && this.scene.activeCamera) {
        this.scene.render();
      }
    });
  }
}
