<template>
    <div>
        <h2>VTK Cone Example</h2>
        <div ref="vtkContainer" class="vtk-container"></div>
    </div>
</template>

<script>
import '@kitware/vtk.js/favicon';
import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkConeSource from '@kitware/vtk.js/Filters/Sources/ConeSource';

export default {
    name: 'TrameCone',
    mounted() {
        try {
            const vtkContainer = this.$refs.vtkContainer;

            if (!vtkContainer) {
                console.error('vtkContainer is not defined');
                return;
            }

            // Create VTK components
            const renderWindow = vtkRenderWindow.newInstance();
            const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
            openGLRenderWindow.setContainer(vtkContainer);
            renderWindow.addView(openGLRenderWindow);

            const renderWindowInteractor = vtkRenderWindowInteractor.newInstance();
            renderWindowInteractor.setView(openGLRenderWindow);
            renderWindowInteractor.initialize();
            renderWindowInteractor.bindEvents(vtkContainer);

            const renderer = vtkRenderer.newInstance();
            renderWindow.addRenderer(renderer);

            const coneSource = vtkConeSource.newInstance({ height: 1.0 });
            const mapper = vtkMapper.newInstance();
            mapper.setInputConnection(coneSource.getOutputPort());

            const actor = vtkActor.newInstance();
            actor.setMapper(mapper);
            renderer.addActor(actor);
            renderer.resetCamera();

            // Ensure rendering and interactor setup
            renderWindow.render();
            if (!renderWindowInteractor.isAnimating()) {
                renderWindowInteractor.start();
            }
        } catch (error) {
            console.error('Error in mounted hook:', error);
        }
    },
};
</script>

<style scoped>
.vtk-container {
    width: 100%;
    height: 400px;
    border: 1px solid #ccc;
    margin-top: 20px;
}
</style>
