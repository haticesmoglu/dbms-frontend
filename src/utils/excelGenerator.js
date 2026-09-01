export function exportTableToExcel(tableName = 'table_name', columns = []) {
  if (!columns || columns.length === 0) return;

  const headers = [
    'Kolon Adi',
    'Veri Tipi',
    'Primary Key',
    'Nullable',
    'Varsayilan Deger',
    'Auto Increment',
  ];

  const rows = columns.map((col) =>
    [
      `"${col.name || ''}"`,
      `"${col.type || ''}"`,
      `"${col.isPrimaryKey ? 'EVET' : 'HAYIR'}"`,
      `"${col.isNullable ? 'NULL' : 'NOT NULL'}"`,
      `"${col.defaultValue || 'None'}"`,
      `"${col.isAutoIncrement ? 'EVET' : 'HAYIR'}"`,
    ].join(';')
  );

  const csvContent = [headers.join(';'), ...rows].join('\r\n');
  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${tableName}_kolonlar.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
