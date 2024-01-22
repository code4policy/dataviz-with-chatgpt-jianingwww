// main.js

// Load the data
d3.csv("311_boston_data.csv").then(function (data) {
    // Process the data and sort it by count in descending order
    const topReasons = data.sort((a, b) => b.Count - a.Count).slice(0, 10);

    // Set up the chart dimensions
    const margin = { top: 40, right: 20, bottom: 80, left: 120 }; // Adjusted left margin
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select("#chart-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add title
    svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .text("Top 10 Reasons for 311 Calls in Boston (2023)");

    // Add subtitle
    svg.append("text")
        .attr("class", "chart-subtitle")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2 + 20)
        .attr("text-anchor", "middle")
        .text("Based on data from the City of Boston");

   // Create x and y scales
    const x = d3.scaleLinear()
        .domain([0, d3.max(topReasons, d => +d.Count)])
        .range([0, width]);

    const y = d3.scaleBand()
        .domain(topReasons.map(d => d.reason))
        .range([height, 0])
        .padding(0.1);

    // Create the bars
    svg.selectAll(".bar")
        .data(topReasons)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", d => y(d.reason))
        .attr("height", y.bandwidth())
        .attr("x", 0)
        .attr("width", d => x(+d.Count));

    // Create x and y axes
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)")
        .style("font-size", "12px"); // Lower the font size of axis text

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .style("font-size", "12px"); // Lower the font size of y-axis labels

    // Add labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 20)
        .attr("text-anchor", "middle")
        .text("Count")
        .style("font-size", "14px"); // Adjust font size for the "Count" label

    svg.append("text")
        .attr("class", "footnote")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 40)
        .attr("text-anchor", "middle")
        .text("Chart created by Jianing")
        .style("font-size", "12px"); // Adjust font size for the footnote
});
