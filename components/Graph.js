class Graph {
  constructor(){
    this.adjacencyList = {}
  }

  addVertex(vertex){
    if(!this.adjacencyList[vertex])
    this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1,vertex2){
    if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]){
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
    }
  }

  removeEdge(vertex1,vertex2){
    if(this.adjacencyList[vertex1] && this.adjacencyList[vertex2]){
      const i1 = this.adjacencyList[vertex1].indexOf(vertex2);
      const i2 = this.adjacencyList[vertex2].indexOf(vertex1);
      this.adjacencyList[vertex1].splice(i1,1);
      this.adjacencyList[vertex2].splice(i2,1);
    }
  }

  removeVertex(vertex){
    const list = this.adjacencyList[vertex].slice();
    if(list.length > 0){
      for(let conn of list){
        this.removeEdge(conn, vertex);
      }
    } 
    delete this.adjacencyList[vertex];
  }

  dfs_r(start_vertex){
    if (start_vertex==null) return undefined;
    const result=[];
    const visited={};
    // option adjestancyList = this.adjestancyList that this thing
    function helper(vertex){
      if(!vertex || visited[vertex]) return null;
      result.push(vertex);
      visited[vertex]=true;
      if(this.adjacencyList[vertex]){
        for(const conn of this.adjacencyList[vertex]){
          helper.call(this, conn);
        }
      }
    }
    helper.call(this,start_vertex);

    return result;
  }

  dfs_i(start_vertex){
    if (start_vertex==null) return undefined;
    const result=[];
    const visited={};
    const stack=[start_vertex];

    while (stack.length>0){
      let vertex=stack.pop();
      result.push(vertex);
      visited[vertex]=true;
      if(this.adjacencyList[vertex]){
        for(const conn of this.adjacencyList[vertex]){
          if(!visited[conn]){
            stack.push(conn);
          }
        }
      }
    }
    return result;
  }

  bfs(start_vertex){
    if (start_vertex==null) return undefined;
    const result=[];
    const visited={};
    const queue=[start_vertex];

    while (queue.length>0){
      let vertex=queue.shift();
      result.push(vertex);
      visited[vertex]=true;
      if(this.adjacencyList[vertex]){
        for(const conn of this.adjacencyList[vertex]){
          if(!visited[conn]){
            queue.push(conn);
          }
        }
      }
    }
    return result;
  }
}

const g = new Graph();

g.addVertex("Tokyo");
g.addVertex("Dallas");
g.addVertex("Aspen");
g.addEdge("Tokyo","Dallas");
g.addEdge("Tokyo","Aspen");
g.removeEdge("Tokyo","Aspen");
g.addVertex("Delete");
g.addEdge("Tokyo","Delete");
g.addEdge("Dallas","Delete");
g.removeVertex("Delete");
g.addEdge("Dallas","Aspen");
console.log(g.adjacencyList);
console.log(g.dfs_r("Aspen"));
console.log(g.dfs_i("Aspen"));
console.log(g.bfs("Aspen"));