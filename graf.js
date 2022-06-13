// const margin = {
//     top: 50,
//     right: 50,
//     bottom: 50,
//     left: 50,
// }

// const width = 900 - margin.left - margin.right
// const height = 900 - margin.top - margin.bottom
// let node  = [
//   {name: 'node1', fill : 'blue', angle: 0, x:100 , y:100, speed:1},
//   {name: 'node2', fill : 'blue', angle: 0, x:100 , y:300, speed:1},
//   {name: 'node3', fill : 'blue', angle: 0, x:300 , y:200, speed:1},
//   {name: 'node4', fill : 'blue', angle: 0, x:600 , y:200, speed:1}
// ]
// const svg = d3.select('body').append('svg')
//     .attr('width', width +margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)
//     .append('g')
//     .attr('transform', `translate(${margin.left}, ${margin.top})`)








// const giveNode = svg.selectAll("circle")
//                       .data(node)
// giveNode.enter()
//         .append('circle')
//         .attr("cx", d=>d.x)
//         .attr("cy", d=>d.y)
//         .attr("r", 20)
//         .attr('fill', d=> d.fill)


// const draw=() => {
// const giveAngle = svg.selectAll('line')
//                       .data(node)

// giveAngle.attr('transform', d=>`rotate(${d.angle},${d.x},${d.y})`)                      

// giveAngle.enter()
//           .append('line')
//           .attr("x1", d=>d.x)
//           .attr("y1", d=>d.y)
//           .attr("x2", d=>d.x+40)
//           .attr("y2", d=>d.y+40)
//           .attr('stroke', d=> d.fill)
//           .attr('stroke-width', 3)
//           .attr('transform', `rotate(0,0,0)`)  
// }
// draw()


// var i = 0;
// var timeInterval = 20;
// setInterval(function(){
//         i += 1;
//         node[0].angle+=node[0].speed
//         node[1].angle+=node[1].speed
//         node[2].angle+=node[2].speed
//         node[3].angle+=node[3].speed
//         draw()
//   },timeInterval);
