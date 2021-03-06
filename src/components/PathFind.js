import React, {useState, useEffect} from 'react'
import Node from './Node'
import aStar from "../aStar"
import '../styles/PathFind.css'

//Variables for columns and rows for the grid
const cols = 25; 
const rows = 10;

//Varibles to specify where does rows and cols start and end.
const start_row = 0;
const start_col = 0;
const end_row = rows-1;
const end_col = cols-1;

const PathFind = () => {
    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([]);
    const [visitedNodes, setVisitedNodes] = useState([]);

    const createSpot = (grid) => { 
        //Loop through two dimensional utilizing the inner loop and outer loop
        for(let outer = 0; outer < rows; outer++) { 
         for(let inner = 0; inner < cols; inner++) { 
             grid[outer][inner] = new Spot(outer, inner);
         }
     }
 }
 //Add Neighbors 
 const addNeighbors = (grid) => { 
     //looping through rows and columns to have the ability to add neighbors
     for(let row = 0; row < rows; row++){ 
         for(let column = 0; column < cols; column++) {
             grid[row][column].addNeighbors(grid)
         }

     }
 }
    //Function to create a grid and render on the screen.
    const initializeGrid = () => { 
        const grid = new Array(rows);
        //For each column will contain an array of rows.
        for(let columns = 0; columns < rows; columns++) { 
            grid[columns] = new Array(cols);
        }
        createSpot(grid);
        setGrid(grid);
        addNeighbors(grid);

        const start = grid[start_row][start_col];
        const end = grid[end_row][end_col];
        start.isWall = false;
        end.isWall = false;
        let path = aStar(start, end);
        setPath(path.path);
        setVisitedNodes(path.visitedNodes);

    };
    //To initiliaze grid before anything else is rendered.
    useEffect(() => { 
       initializeGrid();
        }, []);
    //Spot Constructor - could be a seperate file.
    function Spot(row, col) { 
        this.row = row;
        this.column = col;
        //If the row and cols equals to the starting point, becomes true. Otherwise false.
        this.start = this.row === start_row && this.column === start_col
        //If the row and cols equals to the end point, becomes true. Otherwise false.
        this.end = this.row === end_row && this.column === end_col
        //Will be used in the heuristic function to calculate the manhattan distance. Playing a role in the algorithm
        this.g = 0;
        this.f = 0;
        this.h = 0;
        //Neighbors will determine the specific spot that the color will have
        this.neighbors = [];
        //
        this.isWall = false;
        if(Math.random(1) < 0.2) { 
            this.isWall = true;
        }
        this.previous = undefined;
        this.addNeighbors = function(grid)
        {
            let row = this.row;
            let column = this.column;
            // Conditionals to ensure that grid limitations are set. 
            if (row > 0) this.neighbors.push(grid[row-1][column]);
            if (row < rows - 1) this.neighbors.push(grid[row+1][column]);
            if (column > 0) this.neighbors.push(grid[row][column-1]);
            if (column < cols - 1) this.neighbors.push(grid[row][column+1]);
        }
    }
 //Grid with Node
const nodeGrid = (
    <div>
        {Grid.map((row, rowIndex) =>  {
            return (
            <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => { 
                //Destructuring the start and end of the grid. To loop through each element of the grid.
                const {start, end, isWall} = col;
                return <Node 
                key={colIndex} 
                start={start} 
                end={end} 
                row={rowIndex} 
                col={colIndex} 
                isWall = {isWall}
                />;
            })}
            </div>
            );
        })}
    </div>
);

    const visualizeShortestPath = (shortestPath) =>  {
        for(let short = 0; short < shortestPath.length; short++) { 
            setTimeout(() => { 
                const node = shortestPath[short];
                document.getElementById(`node-${node.row}-${node.column}`).className="node node-shortest-path";
            }, 10 * short)
        }
       
    }

    const visualizePath = () => { 
        for(let short = 0; short <= visitedNodes.length; short++) { 
         if(short === visitedNodes.length) { 
            setTimeout(() => { 
             visualizeShortestPath(Path);
            }, 20 * short);
        } else { 
            setTimeout(() =>  {
                const node = visitedNodes[short];
                document.getElementById(`node-${node.row}-${node.column}`).className="node node-visited";
            }, 20 * short)
        }
    }
}

    console.log(Path)

    return (
        <div className="wrapper">
            <h1>Path Finding Visualizer using the A* Search Algorithm</h1>
            {nodeGrid}
            <br/>
            <button onClick={visualizePath}>Visualize Path</button>
        </div>
    );
}

export default PathFind
