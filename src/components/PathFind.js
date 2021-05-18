import React, {useState, useEffect} from 'react'

//Variables for columns and rows for the grid
const cols = 5; 
const rows = 5;

const PathFind = () => {
    const [Grid, setGrid] = useState([]);
    
    //Function to create a grid and render on the screen.
    const initializeGrid = () => { 
        const grid = new Array(cols);

        //For each column will contain an array of rows.
        for(let columns = 0; columns < cols; columns++) { 
            grid[columns] = new Array(rows);
        }
        createSpot(grid)

    };

    const createSpot = (grid) => { 

           //Loop through two dimensional utilizing the inner loop and outer loop
           for(let inner = 0; inner < cols; inner++) { 
            for(let outer = 0; outer < rows; outer++) { 
                grid[inner][outer] = new Spot(inner, outer);
            }
        }


    }
    //Spot Constructor
    function Spot(row, col) { 
        this.row = row;
        this.column = col;
        //think of names. Playing a role in the algorithm
        this.g = 0;
        this.f = 0;
        this.h = 0;

    }

    return (
        <div>
            <h1>Pathfind Component</h1>
        </div>
    )
}

export default PathFind
