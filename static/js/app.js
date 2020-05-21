// import the data from data.js
const tableData = data;
// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data){
    // Clearing out any pre-existing data.
    tbody.html("");
    // Looping through each object in the data.
    // Append a row and cells for each value in the row.
    data.forEach((dataRow) => {
        // Append a row to the table body.
        let row = tbody.append("tr");

        // Loop thru each field in the dataRow
        // Adding each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

function handleClick() {
    // Grab datetime value from filter.
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;

    // Apply 'filter' to table data to keep only rows 
    //with 'datetime' matches the filter value
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
}
// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);
