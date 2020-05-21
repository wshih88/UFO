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

var filters = {};
function updateFilters(){
    var changedElement = d3.select(this).select("input");
    var elementValue = changedElement.property("value");
    var filterId = changedElement.attr("id")

    if (elementValue) {
        filters[filterId] = elementValue;
    }
    else {
        delete filters[filterId];
    }
    filterTable();
}

function filterTable() {
    let filteredData = tableData;

    Object.defineProperties(filters).forEach(([key, value]) => {
        filteredData = filteredData.filter(row=> row[key] === value)});

    buildTable(filteredData)
    };

// Attach an event to listen for the form button
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
