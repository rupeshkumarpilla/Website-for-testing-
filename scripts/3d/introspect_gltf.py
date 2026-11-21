# HONIESH 3D - Temporary validation: list glTF export operator parameters
# Run: blender --background --python scripts/3d/introspect_gltf.py
import bpy

skipped = {'RNA', 'Name', 'Properties', 'Has Reports', 'bl_idname', 'bl_label',
           'bl_translation_context', 'bl_description', 'bl_undo_group', 'Options',
           'Idle Cursor', 'layout', 'Macros'}

for name in dir(bpy.types):
    if 'GLTF' not in name.upper():
        continue
    cls = getattr(bpy.types, name)
    rna = getattr(cls, 'bl_rna', None)
    if rna is None:
        continue
    bid = getattr(cls, 'bl_idname', '')
    if 'export' not in bid.lower():
        continue
    print(f"### {name} ({bid})")
    for p in rna.properties:
        if p.name in skipped:
            continue
        try:
            print(f"    {p.name} = {p.default!r} (enum_items={[i.name for i in p.enum_items]} if enum)")
        except Exception:
            print(f"    {p.name} = {p.default!r}")
print("Done.")
