# HONIESH 3D - Authoring script: brand materials library
# Blender 5.3.0 non-interactive (--background --python)
# Produces: src/assets/3d/honiesh-honey-materials.blend
# All geometry/materials are illustrative, not product photography.
import bpy
import math
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
BLEND_DIR = os.path.join(REPO_ROOT, "src", "assets", "3d")
os.makedirs(BLEND_DIR, exist_ok=True)
BLEND_PATH = os.path.join(BLEND_DIR, "honiesh-honey-materials.blend")

COLOR = {
    "DEEP_INK": (0.1294, 0.1216, 0.1020),      # #211F1A
    "WARM_PARCHMENT": (0.9490, 0.9216, 0.8667), # #F2EBDD
    "MUTED_BRASS": (0.7020, 0.5765, 0.3608),   # #B3935C
    "HONEY_AMBER": (0.8235, 0.6275, 0.2902),   # #D2A04A
    "SOFT_CREAM": (0.9765, 0.9647, 0.9412),    # #F9F7F0
    "BOTANICAL_NEUTRAL": (0.3647, 0.3843, 0.3176), # #5D6251
}

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for m in list(bpy.data.meshes):
        bpy.data.meshes.remove(m)
    for mat in list(bpy.data.materials):
        bpy.data.materials.remove(mat)
    for act in list(bpy.data.actions):
        bpy.data.actions.remove(act)
    for w in list(bpy.data.worlds):
        bpy.data.worlds.remove(w)

def principled(name, base_color, metallic=0.0, roughness=0.5, transmission=0.0,
               ior=1.45, emission=0.0, alpha=1.0, specular=0.5):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    nodes = nt.nodes
    links = nt.links
    for n in list(nodes):
        nodes.remove(n)
    out = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.inputs['Base Color'].default_value = (*base_color, alpha)
    bsdf.inputs['Metallic'].default_value = metallic
    bsdf.inputs['Specular'].default_value = specular
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['IOR'].default_value = ior
    bsdf.inputs['Transmission'].default_value = transmission
    bsdf.inputs['Emission Strength'].default_value = emission
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat

def main():
    clear_scene()
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'

    mats = []
    mats.append(principled('Honiesh Brand - Deep Ink', COLOR['DEEP_INK'],
                           metallic=0.15, roughness=0.85))
    mats.append(principled('Honiesh Brand - Warm Parchment', COLOR['WARM_PARCHMENT'],
                           metallic=0.0, roughness=0.80))
    mats.append(principled('Honiesh Brand - Muted Brass', COLOR['MUTED_BRASS'],
                           metallic=0.85, roughness=0.40, ior=1.45))
    mats.append(principled('Honiesh Brand - Honey Amber', COLOR['HONEY_AMBER'],
                           metallic=0.10, roughness=0.30))
    mats.append(principled('Honiesh Brand - Soft Cream', COLOR['SOFT_CREAM'],
                           metallic=0.0, roughness=0.90))
    mats.append(principled('Honiesh Brand - Botanical Neutral', COLOR['BOTANICAL_NEUTRAL'],
                           metallic=0.10, roughness=0.80))
    mats.append(principled('Honiesh - Honey Liquid', COLOR['HONEY_AMBER'],
                           metallic=0.05, roughness=0.10, transmission=0.72, ior=1.47))
    mats.append(principled('Honiesh - Honey Thin', COLOR['HONEY_AMBER'],
                           metallic=0.05, roughness=0.22, transmission=0.45, ior=1.47))

    # Sample geometry so the library can be previewed/appended.
    coll = bpy.data.collections.new('Honiesh Materials Library')
    bpy.context.scene.collection.children.link(coll)
    for idx, mat in enumerate(mats):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.45, segments=24, ring_count=16,
                                             location=(idx * 1.35, 0.0, 0.45))
        obj = bpy.context.active_object
        obj.name = f'Sample {mat.name}'
        obj.data.materials.append(mat)
        obj.active_material_index = 0
        # link into library collection
        if obj.name in bpy.context.scene.collection.objects:
            bpy.context.scene.collection.objects.unlink(obj)
        coll.objects.link(obj)

    # Two honey droplets for the liquid materials.
    for idx, mat in enumerate(mats[6:8]):
        bpy.ops.mesh.primitive_uv_sphere_add(radius=0.45, segments=24, ring_count=16,
                                             location=((len(mats) - 2 + idx) * 1.35, -1.9, 0.45))
        obj = bpy.context.active_object
        obj.scale = (0.9, 0.9, 1.5)
        obj.data.transform?  # no-op placeholder removed below
        obj.name = f'Sample {mat.name}'
        obj.data.materials.append(mat)
        obj.active_material_index = 0
        if obj.name in bpy.context.scene.collection.objects:
            bpy.context.scene.collection.objects.unlink(obj)
        coll.objects.link(obj)

    bpy.ops.wm.save_as_mainfile(filepath=BLEND_PATH, check_existing=False)
    print("SAVED", BLEND_PATH)
    print("Materials:", [m.name for m in mats])

if __name__ == '__main__':
    main()
