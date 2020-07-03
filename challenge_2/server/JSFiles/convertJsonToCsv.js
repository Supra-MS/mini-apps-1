const incomingJSON = require('../samples/sales_report');

const convertJSONToCSV = (incomingJSON) => {
  let csv = '';
  let csvArr = [];

  let csvFieldsArray = Object.keys(incomingJSON);
  csvFieldsArray.pop();
  let csvFields = csvFieldsArray.join(',');
  csvArr.push(csvFields);

  let csvValuesArray = Object.values(incomingJSON);
  let childrenValues = csvValuesArray.pop();
  let csvValues = csvValuesArray.join(',');
  csvArr.push(csvValues);

  const recurseJSONValues = (childrenValues) => {
    if (childrenValues.length) {
      childrenValues.forEach(child => {
        let csvValuesArray = Object.values(child);
        let childValues = csvValuesArray.pop();
        let csvValues = csvValuesArray.join(',');
        csvArr.push(csvValues);
        recurseJSONValues(childValues);
      });
    }
  }

  if (Array.isArray(childrenValues)) {
    recurseJSONValues(childrenValues);
  }

  csv = csvArr.join('\n');
  return csv;
}

// convertJSONToCSV(incomingJSON);
module.exports = convertJSONToCSV;