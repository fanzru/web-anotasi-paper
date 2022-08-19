import exportFromJSON from 'export-from-json';

export const exportData = (
  Data: Array<object>,
  FileName: string,
  Fields?: string[]
) => {
  const data = Data;
  const fileName = FileName;
  const exportType = 'csv';
  const fields = Fields;
  exportFromJSON({ data, fileName, exportType });
};
