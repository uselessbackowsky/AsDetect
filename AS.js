const grid = {
  node : {
    num: [1,2,3,4,5,6],
    type: ['gen','gen','nag','gen','nag','gen'],
    sta: [1,1,1,1,1,1]
  },
  line: [
  [1,1,1,0,0,0],
  [1,1,1,0,0,0],
  [1,1,1,1,0,0],
  [0,0,1,1,1,0],
  [0,0,0,1,1,1],
  [0,0,0,0,1,1]
  ]}
grid.node.delta = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
const graf = {
  node: [],
  line: []
}
for  (i in grid.node.num) {
  if (grid.node.type[i]==='gen') {
    graf.node.push(grid.node.num[i])
  }
}
let syncGr1 = []
let syncGr2 = []
const syncGr = () => {
  syncGr1 = []
  syncGr2 = []
  grid.node.delta[0].forEach((el,i) => {
    if (el<90) {syncGr1.push(graf.node[i])}
    else {syncGr2.push(graf.node[i])}
  });
}
syncGr()
const adj = []
grid.line.forEach((el,j) => {
  const buff =[]
  el.forEach((el,i)=>{
    if(el>0) {buff.push(i+1)}
  })
  adj.push(buff)
})
graf.visited = []
const giveVisited = ()=> {
for (i in grid.node.num) {
  graf.visited[i]=false
}}
giveVisited()
const visited =(num) => {
  i = grid.node.num.indexOf(num)
  if (graf.visited[i]) {return true}
  graf.visited[i] = true
}

const dfs = (adj, v, t,n=0) => {
	if(v === t) return true
	if(visited(v)) return false
  if(grid.node.type[v-1]==='gen'&&n!=0) return false
  n++
	for(let neighbor of adj[v-1]) {
		if(!graf.visited[neighbor-1]) {
			let reached = dfs(adj, neighbor, t,n)
			if(reached)  return true
		}
	}
	return false
}

const grafLine = () => {
  for (let i =0; i<graf.node.length; i++) {
    graf.line[i] = []
    for (let j =0; j<graf.node.length; j++) {
      if (dfs(adj,graf.node[i],graf.node[j])) {
        graf.line[i][j]=1
      }
      else {graf.line[i][j]=0}
      giveVisited()
    }
  }}
grafLine()

const asDetect =() => {
 let asDetectLine = []
 syncGr1.forEach(el => {
   syncGr2.forEach(k=>{
     let i = graf.node.indexOf(el)
     let j = graf.node.indexOf(k)
     if(graf.line[i][j]) {
       asDetectLine.push([el,k])
     }
   })
 })
 return asDetectLine
}

let asDetectLine = asDetect()
console.log(asDetectLine)



const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50,
}

const width = 900 - margin.left - margin.right
const height = 900 - margin.top - margin.bottom
let node  = [
{name: 'node1', fill : 'blue', angle: 0, x:100 , y:100, speed:2},
{name: 'node2', fill : 'blue', angle: 0, x:100 , y:300, speed:2},
{name: 'node4', fill : 'blue', angle: 0, x:300 , y:200, speed:1},
{name: 'node6', fill : 'blue', angle: 0, x:600 , y:200, speed:1}
]
let line = []
n=0
for (let i=0; i<graf.line.length;i++) {
        for (let j=0; j<graf.line.length;j++) {
          line[n]={}
          if(graf.line[i][j]) {
            line[n].name = node[i].name +" - " + node[j].name
            line[n].x1 = node[i].x
            line[n].y1 = node[i].y
            line[n].x2 = node[j].x
            line[n].y2 = node[j].y
            line[n].fill = 'black' 
            n++          
          }
        }
      }
console.log(line)




const svg = d3.select('body').append('svg')
  .attr('width', width +margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

const giveGrafLine = svg.selectAll('grafline')
  .data(line)
const grafLindeAdd=giveGrafLine.enter()
  .append('line')
  .attr('class', 'grafline')
  .attr('x1', d=>d.x1)
  .attr('x2', d=>d.x2)
  .attr('y1', d=>d.y1)
  .attr('y2', d=>d.y2)
  .attr('stroke', d=> d.fill)
  .attr('stroke-width', 5)

const giveAngle = svg.selectAll('AngleLine')
  .data(node)
  
const angleAdd = giveAngle.enter()
        .append('line')
        .attr('class', 'AngleLine')
        .attr("x1", d=>d.x)
        .attr("y1", d=>d.y)
        .attr("x2", d=>d.x+40)
        .attr("y2", d=>d.y+40)
        .attr('stroke-width', 3) 

const giveNode = svg.selectAll("circle")
        .data(node)
      
const nodeAdd = giveNode.enter()
      .append('circle')
      .attr("cx", d=>d.x)
      .attr("cy", d=>d.y)
      .attr("r", 20)
      .attr('fill', d=> d.fill)


const draw=() => {

nodeAdd.merge(giveNode)
        .attr('fill', d=> d.fill)  
grafLindeAdd.merge(giveGrafLine)
            .attr('stroke', d=> d.fill)
angleAdd.merge(giveAngle)
          .attr('transform', d=>`rotate(${d.angle},${d.x},${d.y})`)
         .attr('stroke', d=> d.fill)               
      }

const updatedelta =() => {
  for (let i=0; i<grid.node.delta.length;i++) {
    if(syncGr1.includes(graf.node[i])) {
      node[i].fill = 'blue'
    }
    else {node[i].fill = 'red'}
    for (let j=0; j<grid.node.delta.length;j++) {
      grid.node.delta[i][j] = Math.abs(node[i].angle - node[j].angle)
    }
  }
  line.forEach((el,i)=>{
    for (let j =0; j<asDetectLine.length; j++) {
      // console.log(`node${asDetectLine[j][0]} - node${asDetectLine[j][1]}`)
      if (el.name == `node${asDetectLine[j][0]} - node${asDetectLine[j][1]}`||el.name == `node${asDetectLine[j][1]} - node${asDetectLine[j][0]}` ){
        el.fill = 'red'
      }
    }
  })
}

const buttonStart = document.getElementById('btn')
console.log(buttonStart)
let start = true

const startAs = (i=0, timeInterval=20) => {
  setInterval(function(){
    i += 1;
    if (start) {
      node[0].angle+=0
      node[1].angle+=0
      node[2].angle+=0
      node[3].angle+=0
    }
    else {
      node[0].angle+=node[0].speed
      node[1].angle+=node[1].speed
      node[2].angle+=node[2].speed
      node[3].angle+=node[3].speed
    }
    updatedelta()
    draw()
    syncGr()
    asDetect()
    asDetectLine=asDetect()
},timeInterval);
}



function changeStart() {
    startAs()
    start=!start
    if (!start) {
      buttonStart.innerHTML = 'STOP'
    }
    else {buttonStart.innerHTML = 'START'}
}
buttonStart.addEventListener('click', changeStart)
