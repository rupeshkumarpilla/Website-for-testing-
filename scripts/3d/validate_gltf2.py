# HONIESH 3D - Temporary validation: glTF export kwarg combos
# Run: blender --background --python scripts/3d/validate_gltf2.py
import bpy

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
bpy.ops.mesh.primitive_cube_add(size=1)

tests = [
    dict(export_format='GLB'),
    dict(export_format='GLB', export_materials=True),
    dict(export_format='GLB', export_apply=True),
    dict(export_format='GLB', export_animations=True),
    dict(export_format='GLB', export_materials=True, export_apply=True, export_animations=True),
]
for i, kw in enumerate(tests):
    fp = f'/tmp/honiesh_val_{i}.glb'
    kw['filepath'] = fp
    try:
        bpy.ops.export_scene.gltf(**kw)
        size = os.path.getsize(fp) if hasattr(__import__('os'), 'path') else 0
        print(i, "OK ->", fp)
    except Exception as e:
        print(i, "FAIL ->", str(e).split("\n")[0][:140])
print("Done.")
