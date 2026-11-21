# HONIESH 3D - Temporary validation: glTF export + animation kwargs
# Run: blender --background --python scripts/3d/validate_gltf_export.py
import bpy

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

bpy.ops.mesh.primitive_cube_add(size=1)
obj = bpy.context.active_object
obj.animation_data_create()
obj.keyframe_insert(data_path='location', frame=1)
obj.location.z = 2.0
obj.keyframe_insert(data_path='location', frame=10)
bpy.context.scene.frame_start = 1
bpy.context.scene.frame_end = 10

kwargs = dict(
    filepath='/tmp/honiesh_validate_export.glb',
    export_format='GLB',
    export_materials=True,
    export_apply=True,
    export_cameras=True,
    export_lights=True,
    export_animations=True,
    export_frame_range='ALL',
)
try:
    bpy.ops.export_scene.gltf(**kwargs)
    print("EXPORT OK with frame_range='ALL'")
except TypeError as e:
    print("TYPE ERROR:", e)
    kwargs.pop('export_frame_range', None)
    kwargs.pop('export_frame_start', None)
    kwargs.pop('export_frame_end', None)
    kwargs.pop('export_frame_step', None)
    try:
        bpy.ops.export_scene.gltf(**kwargs)
        print("EXPORT OK without frame kwargs")
    except Exception as e2:
        print("EXPORT FAILED:", e2)
except Exception as e:
    print("EXPORT FAILED:", e)

print("Done.")
