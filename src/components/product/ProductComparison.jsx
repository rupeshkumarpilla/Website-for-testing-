import { PACKAGING_FAMILIES, PACKAGING_SUMMARY } from '../../data/packaging.js';

export default function ProductComparison() {
  const columns = PACKAGING_FAMILIES.map((family) => ({
    id: family.id,
    label: family.shortName,
  }));

  const rows = [
    {
      label: 'Packaging',
      values: PACKAGING_FAMILIES.map((family) => family.format),
    },
    {
      label: 'Pack count',
      values: PACKAGING_FAMILIES.map((family) => (
        family.unitCount === null ? 'Not applicable' : String(family.unitCount)
      )),
    },
    {
      label: 'Individual portion',
      values: PACKAGING_FAMILIES.map((family) => (
        family.unitWeightGrams === null ? 'Not specified' : `${family.unitWeightGrams} g`
      )),
    },
    {
      label: 'Total content',
      values: PACKAGING_FAMILIES.map((family) => (
        family.netContent === null ? 'Size-dependent' : family.netContent.label
      )),
    },
  ];

  return (
    <div className="comparison">
      <div className="comparison__scroll">
        <table className="comparison__table">
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {columns.map((column) => (
                <th key={column.id} scope="col">{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((value, index) => (
                  <td key={`${row.label}-${columns[index].id}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="comparison__note">
        The 1 litre glass jar is a volume specification. It is not described here as 1 kg.
        {' '}{PACKAGING_SUMMARY.batchCertification}
      </p>
    </div>
  );
}
