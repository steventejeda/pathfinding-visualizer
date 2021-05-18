//To implement the A star search algorithm. For more info please refer to:
// https://en.wikipedia.org/wiki/A*_search_algorithm

function aStar(start, end) { 
    //This will contain nodes that the search function has to visit
    let openSet = [];
    //This will contain nodes that has already been visited by the search function
    let closedSet = [];
    //This will contain the shortest path.
    let path = [];
    let visitedNodes = [];


    openSet.push(start);
    //Loop through all of the elements of the openSet
    while(openSet.length > 0) { 
        let leastIndex = 0;
        for(let openIndex = 0; openIndex < openSet.length; openIndex++) { 
        //Check if 
            if(openSet[openIndex].f < openSet[leastIndex].f) { 
                leastIndex = openIndex;
            }
        }
    
    let current = openSet[leastIndex];
    visitedNodes.push(current);
    if(current === end) {
        let tempVal = current;
        path.push(tempVal);
        while(tempVal.previous) { 
            path.push(tempVal.previous);
            tempVal = tempVal.previous;
        }
        // console.log(path)
        return {path, visitedNodes}

        // console.log("Done!, Path found!")
    }
    //Remove the current element from the openSet using the filter method. Loop through all of the openSet elements except the current element.
    //The current element will be removed from the openSet array and pushed through the closedSet array.
    openSet = openSet.filter(element => element !== current);
    closedSet.push(current);
    
    //

    let neighbors = current.neighbors; 
    for(let index = 0; index < neighbors.length; index++ ){

        let neighbor = neighbors[index];
        //Check if closedSet includes neighbor, if it does the search function can move on. 
        if(!closedSet.includes(neighbor)) { 
            let tempG = current.g + 1;
            let newPath = false;
            //If openSet includes neighbor then the g value will be updated.
            if(openSet.includes(neighbor)) { 
                if(tempG < neighbor.g) { 
                    neighbor.g = tempG;
                    newPath = true;
                }
            } else { 
                neighbor.g = tempG;
                newPath = true;
                openSet.push(neighbor)
            }

            if(newPath) { 
                neighbor.h = heruistic(neighbor, end);
                neighbor.f = neighbor.h + neighbor.g;
                neighbor.previous = current;
            }
        }
    }

    }

    return {path, visitedNodes, error: "No path found!"}
}
//Heruistic meaining = self discovery.
//Utilizing the manhattan distance formula to calculate the distance between two points. 
//Read more here: https://xlinux.nist.gov/dads/HTML/manhattanDistance.html

function heruistic(a,b) { 
    let result = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
    return result;
}

export default aStar;