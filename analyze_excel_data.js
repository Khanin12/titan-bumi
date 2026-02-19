const XLSX = require('xlsx');
const workbook = XLSX.readFile('c:/Users/ASUS/Documents/PKL/titanbumi/public/2_15_2026.xlsx');

const sheets = ['Sheet1', 'Lembar2'];
sheets.forEach(name => {
    const sheet = workbook.Sheets[name];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log(`\n--- Sheet: ${name} ---`);
    data.slice(0, 10).forEach((row, i) => {
        console.log(`Row ${i}:`, row);
    });
});
