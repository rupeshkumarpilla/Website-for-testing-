# HONIESH 3D - Blender API introspection (temporary helper)
# Run: blender --background --python scripts/3d/introspect_blender.py
import bpy

def show(label, obj):
    print(f"\n--- {label} ---")
    try:
        props = obj.bl_rna.properties
    except Exception as e:
        print("  unavailable:", e)
        return
    for p in props:
        try:
            print(f"  {p.name} = {p.default!r}")
        except Exception:
            print(f"  {p.name} = (no default)")

print("BLENDER VERSION:", bpy.app.version)

show("export_scene.gltf", bpy.types.EXPORT_SCENE_OT_gltf)
show("render.ffmpeg", bpy.context.scene.render.ffmpeg)
show("render.image_settings", bpy.context.scene.render.image_settings)
show("cycles settings", bpy.context.scene.cycles)
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    print("\n--- cycles preferences ---")
    print("  compute_device_type:", prefs.compute_device_type)
    print("  devices:", [d.name for d in prefs.devices])
except Exception as e:
    print("\ncycles addon not available:", e)

print("\nDone.")
