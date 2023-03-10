const criePainelInformacoes = function (scene, paciente, positionX, positionY, batimentos) {
    const fonte = "Arial";
    const larguraDoChao = 2;
    const altura = 2;
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", { width: larguraDoChao, height: altura }, scene);
    const larguraDaTextura = larguraDoChao * 500;
    const alturaDaTextura = altura * 500;

    const dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", { width: larguraDaTextura, height: alturaDaTextura }, scene);
    const ctx = dynamicTexture.getContext();
    const tamanhoMaximo = 1; 
    ctx.font = tamanhoMaximo + "px " + fonte;
    const larguraDoTexto = ctx.measureText(paciente.nome).width;
    const borderRadiusParaFonte = larguraDoTexto / tamanhoMaximo;

    const tamanhoMaximoFonte = Math.floor(larguraDaTextura / (borderRadiusParaFonte * 5));
    const tamanhoFonte = tamanhoMaximoFonte + "px " + fonte;

    var material = new BABYLON.StandardMaterial("mat", scene);
    material.diffuseTexture = dynamicTexture;

    plane.material = material;
    plane.position.x = positionX;
    plane.rotation.y = Math.PI;
    plane.position.y = positionY;

    dynamicTexture.drawText(
        "Dados do paciente",
        larguraDaTextura * 0.25,
        alturaDaTextura * 0.1,
        '60px Arial',
        "#0000ff ",
        "#ffffff",
        true
    );
    dynamicTexture.drawText(
        "Nome:",
        larguraDaTextura * 0.1,
        alturaDaTextura * 0.25,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        paciente.Nome,
        larguraDaTextura * 0.5,
        alturaDaTextura * 0.25,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        "Data de nascimento:    ",
        larguraDaTextura * 0.1,
        alturaDaTextura * 0.35,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        "     "+ new Date(paciente.DataNascimento).convertaDateToStrDiaMesAno(),
        larguraDaTextura * 0.5,
        alturaDaTextura * 0.35,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        "Altura:",
        larguraDaTextura * 0.1,
        alturaDaTextura * 0.45,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        paciente.Altura.toString().replace('.', ',') + " cm",
        larguraDaTextura * 0.5,
        alturaDaTextura * 0.45,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        "Peso:",
        larguraDaTextura * 0.1,
        alturaDaTextura * 0.55,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        paciente.Peso + " KG",
        larguraDaTextura * 0.5,
        alturaDaTextura * 0.55,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        "Batimentos:",
        larguraDaTextura * 0.1,
        alturaDaTextura * 0.65,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
    dynamicTexture.drawText(
        batimentos + " BPM",
        larguraDaTextura * 0.5,
        alturaDaTextura * 0.65,
        tamanhoFonte,
        "#000000",
        null,
        true
    );
};

const crieAvatar = async function (scene) {
    const iluminacao2 = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
    iluminacao2.position = new BABYLON.Vector3(0, 5, 5);

    const geradorDeSombra = new BABYLON.ShadowGenerator(1024, iluminacao2);
    geradorDeSombra.useBlurExponentialShadowMap = true;
    geradorDeSombra.blurKernel = 32;

    BABYLON.SceneLoader.ImportMesh(
        "",
        "https://playground.babylonjs.com/scenes/",
        "dummy3.babylon",
        scene,
        function (newMeshes, particleSystems, skeletosAvatar, animationGroups) {
            const avatar = newMeshes[0];
            avatar.scaling.scaleInPlace(1.4);
            const skeletoAvatar = skeletosAvatar[0];

            for (let index = 0; index < newMeshes.length; index++) {
                newMeshes[index].receiveShadows = false;;
            }

            const helper = scene.createDefaultEnvironment({
                enableGroundShadow: true
            });
            helper.setMainColor(BABYLON.Color3.Gray());
            helper.ground.position.y += 0.01;

            skeletoAvatar.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
            skeletoAvatar.animationPropertiesOverride.enableBlending = true;
            skeletoAvatar.animationPropertiesOverride.blendingSpeed = 1;
            skeletoAvatar.animationPropertiesOverride.loopMode = 1;

            const idleRange = skeletoAvatar.getAnimationRange("YBot_Idle");
            const walkRange = skeletoAvatar.getAnimationRange("YBot_Walk");

            if (idleRange) scene.beginAnimation(skeletoAvatar, idleRange.from, idleRange.to, true);

            const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            const UiPanel = new BABYLON.GUI.StackPanel();
            UiPanel.width = "220px";
            UiPanel.fontSize = "14px";
            UiPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            UiPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            advancedTexture.addControl(UiPanel);

            const button = BABYLON.GUI.Button.CreateSimpleButton("but1", "Parar");
            button.paddingTop = "10px";
            button.width = "100px";
            button.height = "50px";
            button.color = "white";
            button.background = "green";
            button.onPointerDownObservable.add(() => {
                if (idleRange) scene.beginAnimation(skeletoAvatar, idleRange.from, idleRange.to, true);
            });
            UiPanel.addControl(button);

            const button1 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Andar");
            button1.paddingTop = "10px";
            button1.width = "100px";
            button1.height = "50px";
            button1.color = "white";
            button1.background = "green";
            button1.onPointerDownObservable.add(() => {
                if (walkRange) scene.beginAnimation(skeletoAvatar, walkRange.from, walkRange.to, true);
            });
            UiPanel.addControl(button1);

            const button2 = BABYLON.GUI.Button.CreateSimpleButton("but2", "Editar");
            button2.paddingTop = "10px";
            button2.width = "100px";
            button2.height = "50px";
            button2.color = "white";
            button2.background = "green";
            button2.onPointerDownObservable.add(() => {
                aoEditarPaciente();
            });
            UiPanel.addControl(button2);

            scene.beginAnimation(skeletoAvatar, walkRange.from, walkRange.to, true);
            engine.hideLoadingUI();

        }
    );
};
const crieCena = async function (engine, paciente) {
    engine.enableOfflineSupport = false;
    BABYLON.Animation.AllowMatricesInterpolation = true;

    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 4, 3, new BABYLON.Vector3(0, 1, 0), scene);
    camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = 5;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;

    const iluminacao = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    iluminacao.intensity = 1;
    iluminacao.specular = BABYLON.Color3.Black();
    iluminacao.intensity = 0.01;

    await crieAvatar(scene);

    await setInterval(async () => {
        batimentos += 1;
        await criePainelInformacoes(scene, paciente, 2, 1, gereBatimentosCardiacos())
    }, 1000);
    //await createPanelFichaMedica(scene, { "nome": 'Ficha medica', "idade": '120 BPM', 'situacao': 'Morto' }, -2, 1);
    const xrHelper = await scene.createDefaultXRExperienceAsync();

    const featuresManager = xrHelper.baseExperience.featuresManager;

    featuresManager.enableFeature(
        BABYLON.WebXRFeatureName.POINTER_SELECTION,
        "stable",
        {
            xrInput: xrHelper.input,
            enablePointerSelectionOnAllControllers: true,
        }
    );

    return scene;
};
