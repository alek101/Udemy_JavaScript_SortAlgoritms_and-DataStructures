class SimplePriorityQueue {
  constructor(){
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({val, priority});
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort(){
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex){
    if(!this.adjacencyList[vertex])
    this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
      this.adjacencyList[vertex1].push({node: vertex2, weight} );
      this.adjacencyList[vertex2].push({node: vertex1, weight} );
  }

  dijkstra(start, end){
    const distances={};
    const previous={}
    const visited = [];
    const queue = new SimplePriorityQueue();
    Object.keys(this.adjacencyList).forEach(node=>
      {
        if (node == start) {
          distances[start]=0;
          queue.enqueue(start, 0);
        } else {
          distances[node]=Infinity;
          queue.enqueue(node, Infinity);
        }
        previous[node]=null;
      }
    );

    let current = queue.dequeue().val;

    while(current != end){
      if(visited.indexOf(current)==-1){
        visited.push(current);
        for (let node of this.adjacencyList[current]){
          let {node: name, weight} = node;
          if(visited.indexOf(name)==-1){
            let distance=distances[current];
            distance+=weight;
            if(distance<distances[name]){
              distances[name]=distance;
              previous[name]=current;
              queue.enqueue(name,distance);
            }
          }
        }
      }
      current = queue.dequeue().val;
    }
    // console.log('distances', distances, 'previous', previous, 'vistied',visited, 'queue', queue);

    const path = [];
    let next = end;
    while (next){
      path.push(next);
      next = previous[next];
    }

    return path.reverse();
  }

  DijakstraSolution(start, finish){
    const nodes = new SimplePriorityQueue();
        const distances = {};
        const previous = {};
        let path = [] //to return at end
        let smallest;
        //build up initial state
        for(let vertex in this.adjacencyList){
            if(vertex === start){
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        // as long as there is something to visit
        while(nodes.values.length){
            smallest = nodes.dequeue().val;
            if(smallest === finish){
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while(previous[smallest]){
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            } 
            if(smallest || distances[smallest] !== Infinity){
                for(let neighbor in this.adjacencyList[smallest]){
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if(candidate < distances[nextNeighbor]){
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        //updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();     
    
  }


}

const g = new WeightedGraph();

g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")


g.addEdge("A", "B", 4)
g.addEdge("A", "C", 2)
g.addEdge("C", "D", 2)
g.addEdge("C", "F", 4)
g.addEdge("F", "E", 1)
g.addEdge("B", "E", 3)
g.addEdge("D", "E", 3)
g.addEdge("D", "F", 1)

// console.log(g.adjacencyList)

console.log(g.dijkstra("A","E"))

console.log(g.DijakstraSolution("A", "E"))