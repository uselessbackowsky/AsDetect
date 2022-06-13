
const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  }
  
  const width = 900 - margin.left - margin.right
  const height = 900 - margin.top - margin.bottom
  const graph = {
    node: [
        {index: 1, x: 440.6008523792291, y: 323.5197252262524, vy: 0.00018539033100000625, vx: -0.00003328192749235002},
        {index: 2, x: 465.53242076690395, y: 304.2625275669971, vy: 0.0001383596846577187, vx: 0.000016383410874471187},
        {index: 3, x: 427.27926828357374, y: 280.8517513041226, vy: 0.0001478673556690297, vx: 0.000019238285378447417}
    ],
    link : [
        { source: 0, target: 1 },
        { source: 1, target: 2 },
        { source: 2, target: 0 },
    ]
  }
const svg = d3.select('body').append('svg')
.attr('width', width +margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)
.append('g')
.attr('transform', `translate(${margin.left}, ${margin.top})`)

link = svg
.selectAll(".link")
.data(graph.link)
.join("line")
.classed("link", true)

node = svg
.selectAll(".node")
.data(graph.node)
.join("circle")
.attr("r", 12)
.classed("node", true)
.classed("fixed", d => d.fx !== undefined)

const simulation = d3
.forceSimulation()
.nodes(graph.node)
.force("charge", d3.forceManyBody())
.force("center", d3.forceCenter(width / 2, height / 2))
.force("link", d3.forceLink(graph.link))
.on("tick", tick);

function tick() {
link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
}


let rot = [{name: 'rotor', angle:0, vx:0, vy:0 }]

let img = svg.append('g')

let rotor = img.append("svg:image")
.data(rot)
.attr('class', 'img1')
.attr("xlink:href", "C:/Users/uselessbackowsky/Desktop/ротор.png")
.attr("x", "20")    
.attr("y", "0")
.attr("width", "70")
.attr("height", "70")
.attr('transform', d=> `rotate(${0},${55},${40})`)


const drag = d3
.drag()
.on("start", dragstart)
.on("drag", dragged);

node.call(drag).on("click", click);


const drage = d3.drag()
img.call(drage).on("click", rotate)

const pi = Math.PI

setInterval(rotate, 20) 
let alfa = 0
function rotate (event) {
  let rect =d3.select('img1')
  // let alfa = Math.atan2(event.y-210, event.x-188)*180/pi
  console.log(alfa)
  // console.log(event.y)
  // console.log(event.x)

  rect
  .attr('transform', `rotate(${alfa}, ${55}, ${40})`)
  alfa++

}


function click(event, d) {
    delete d.fx;
    delete d.fy;
    d3.select(this).classed("fixed", false);
    simulation.alpha(1).restart();
  }

  function dragstart() {
    d3.select(this).classed("fixed", true);
  }

  function dragged(event, d) {
    d.fx = clamp(event.x, 0, width);
    d.fy = clamp(event.y, 0, height);
    simulation.alpha(1).restart();
  }
  function clamp(x, lo, hi) {
    return x < lo ? lo : x > hi ? hi : x;
  }






// let img = svg.selectAll('img').data([0])
// img.enter()
//     .append("svg:image")
//     .attr("xlink:href", "C:/Users/uselessbackowsky/Desktop/Статор.png")
//     .attr("x", "60")
//     .attr("y", "60")
//     .attr("width", "300")
//     .attr("height", "300");



//     img.call(d3.drag())
//     .on('start',start)
//     .on('drag',draged)
    
//     function start () {
//       console.log(this)
//       console.log(d3.event.x)
//     }
//     function draged () {
//       console.log(this)
//       console.log(d3.event.x)
//     }