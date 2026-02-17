const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'public', '2_15_2026.xlsx');

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Get headers (first row)
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const headers = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
        const cell = worksheet[cellAddress];
        if (cell && cell.v) {
            headers.push(cell.v);
        }
    }

    // Get first few rows of data to infer types
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1, blankrows: false }).slice(0, 3);

    console.log(JSON.stringify({ sheetName, headers, sampleData: data }, null, 2));

} catch (error) {
    console.error('Error reading Excel file:', error);
}
