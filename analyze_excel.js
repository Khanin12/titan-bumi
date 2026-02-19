const XLSX = require('xlsx');
const workbook = XLSX.readFile('c:/Users/ASUS/Documents/PKL/titanbumi/public/2_15_2026.xlsx');
console.log('Sheet Names:', workbook.SheetNames);
workbook.SheetNames.forEach(name => {
    const sheet = workbook.Sheets[name];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log(`\nSheet: ${name}`);
    console.log('Columns:', data[0]);
});
