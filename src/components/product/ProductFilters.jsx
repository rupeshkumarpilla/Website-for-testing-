export default function ProductFilters({ values, options, resultCount, totalCount, onChange, onReset }) {
  const sizeDisabled = values.packaging !== 'all' && values.packaging !== 'glass-jars';

  return (
    <details className="filter-panel" open>
      <summary className="filter-panel__summary">
        <span>Refine products</span>
        <span className="filter-panel__count">{resultCount} / {totalCount}</span>
      </summary>
      <div className="filter-panel__body">
        <fieldset className="filter-group">
          <legend id="filter-flavour-legend">Flavour</legend>
          <select
            id="filter-flavour"
            aria-labelledby="filter-flavour-legend"
            value={values.flavour}
            onChange={(event) => onChange('flavour', event.target.value)}
          >
            <option value="all">All flavours</option>
            {options.flavours.map((flavour) => (
              <option key={flavour.value} value={flavour.value}>{flavour.label}</option>
            ))}
          </select>
        </fieldset>

        <fieldset className="filter-group">
          <legend id="filter-packaging-legend">Packaging</legend>
          <select
            id="filter-packaging"
            aria-labelledby="filter-packaging-legend"
            value={values.packaging}
            onChange={(event) => onChange('packaging', event.target.value)}
          >
            <option value="all">All packaging</option>
            {options.packagingFamilies.map((family) => (
              <option key={family.value} value={family.value}>{family.label}</option>
            ))}
          </select>
        </fieldset>

        <fieldset className="filter-group">
          <legend id="filter-size-legend">Glass jar size</legend>
          <select
            id="filter-size"
            aria-labelledby="filter-size-legend"
            value={values.size}
            disabled={sizeDisabled}
            onChange={(event) => onChange('size', event.target.value)}
          >
            <option value="all">All sizes</option>
            {options.glassJarSizes.map((size) => (
              <option key={size.value} value={size.value}>{size.label}</option>
            ))}
          </select>
          {sizeDisabled && (
            <p className="filter-group__hint">Size applies to glass jars only.</p>
          )}
        </fieldset>

        <button type="button" className="button button--secondary filter-panel__reset" onClick={onReset}>
          Reset filters
        </button>
      </div>
    </details>
  );
}
