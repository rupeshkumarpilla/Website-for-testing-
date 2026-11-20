import { FLAVOURS } from '../../data/flavours.js';
import { GLASS_JAR_SIZES } from '../../data/packaging.js';
import { findProductConfiguration } from '../../data/products.js';

function VariantOption({ name, label, checked, onSelect }) {
  return (
    <label className="variant-option">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
      />
      <span>{label}</span>
    </label>
  );
}

export default function ProductVariantSelector({ product, onSelect }) {
  const handleFlavour = (flavourId) => {
    const next = findProductConfiguration({
      packagingId: product.packagingId,
      flavourId,
      sizeId: product.sizeId,
    });
    if (next) onSelect(next.id);
  };

  const handleSize = (sizeId) => {
    const next = findProductConfiguration({
      packagingId: 'glass-jars',
      flavourId: product.flavourId,
      sizeId,
    });
    if (next) onSelect(next.id);
  };

  return (
    <div className="variant-selector">
      <fieldset className="variant-selector__group">
        <legend>Flavour</legend>
        <div className="variant-selector__options">
          {FLAVOURS.map((flavour) => (
            <VariantOption
              key={flavour.id}
              name="product-flavour"
              label={flavour.name}
              checked={product.flavourId === flavour.id}
              onSelect={() => handleFlavour(flavour.id)}
            />
          ))}
        </div>
      </fieldset>

      {product.packagingId === 'glass-jars' && (
        <fieldset className="variant-selector__group">
          <legend>Glass jar size</legend>
          <div className="variant-selector__options">
            {GLASS_JAR_SIZES.map((size) => (
              <VariantOption
                key={size.id}
                name="product-size"
                label={size.label}
                checked={product.sizeId === size.id}
                onSelect={() => handleSize(size.id)}
              />
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
}
