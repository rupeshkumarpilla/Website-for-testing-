# HONIESH 3D - Temporary validation: full glTF export + animation + verify animations in GLB
# Run: blender --background --python scripts/3d/validate_gltf4.py
import bpy, struct, json

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

kw = dict(
    filepath='/tmp/honiesh_val4.glb',
    export_format='GLB',
    export_materials='EXPORT',
    export_apply=True,
    export_cameras=True,
    export_lights=True,
    export_animations=True,
)
try:
    bpy.ops.export_scene.gltf(**kw)
    print("EXPORT OK")
except Exception as e:
    print("EXPORT FAILED:", str(e).split("\n")[0][:140])

# Verify GLB contents
path = '/tmp/honiesh_val4.glb'
with open(path, 'rb') as f:
    data = f.read()
magic = data[0:4]
version = struct.unpack('<I', data[4:8])[0]
length = struct.unpack('<I', data[8:12])[0]
print("magic:", magic, "version:", version, "length:", length)
# JSON chunk
off = 12
while off < length:
    chunk_len = struct.unpack('<I', data[off:off+4])[0]
    chunk_type = data[off+4:off+8]
    chunk = data[off+8:off+8+chunk_len]
    if chunk_type == b'JSON':
        doc = json.loads(chunk.decode('utf-8'))
        print("top-level keys:", sorted(doc.keys()))
        print("meshes:", len(doc.get('meshes', [])))
        print("nodes:", len(doc.get('nodes', [])))
        print("materials:", len(doc.get('materials', [])))
        print("animations:", len(doc.get('animations', [])))
        for a in doc.get('animations', []):
            print("  animation:", a.get('name'), "channels:", len(a.get('channels', [])))
            for c in a.get('channels', []):
                print("    target:", c.get('target'), "sampler:", c.get('sampler'))
    off += 8 + chunk_len
    off = (off + 3) & ~3
print("Done.")
