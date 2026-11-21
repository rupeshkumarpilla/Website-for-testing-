# HONIESH 3D - Temporary validation: glTF export enum kwarg guesses
# Run: blender --background --python scripts/3d/validate_gltf3.py
import bpy

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=1)

base = dict(filepath='/tmp/honiesh_val3.glb', export_format='GLB')

variants = [
    dict(),
    dict(export_materials='EXPORT'),
    dict(export_materials='NONE'),
    dict(export_apply='MODIFIERS'),
    dict(export_apply='ALL'),
    dict(export_apply='NONE'),
    dict(export_animations='EXPORT'),
    dict(export_animations='NONE'),
    dict(export_animations='ALL'),
    dict(export_materials='EXPORT', export_apply='MODIFIERS', export_animations='EXPORT'),
]
for i, extra in enumerate(variants):
    kw = dict(base); kw.update(extra)
    try:
        bpy.ops.export_scene.gltf(**kw)
        print(i, "OK", extra)
    except Exception as e:
        print(i, "FAIL", extra, "->", str(e).split("\n")[0][:100])
print("Done.")
