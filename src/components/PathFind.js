import React, {useState, useEffect} from 'react'
import Node from './Node'
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
    
    //Function to create a grid and render on the screen.
    const initializeGrid = () => { 
        const grid = new Array(rows);
        //For each column will contain an array of rows.
        for(let columns = 0; columns < rows; columns++) { 
            grid[columns] = new Array(cols);
        }
        createSpot(grid);

        setGrid(grid);

    };

    //To initiliaze grid before anything else is rendered.
    useEffect(() => { 
       initializeGrid();
        }, []);


    const createSpot = (grid) => { 
           //Loop through two dimensional utilizing the inner loop and outer loop
           for(let inner = 0; inner < rows; inner++) { 
            for(let outer = 0; outer < cols; outer++) { 
                grid[inner][outer] = new Spot(inner, outer);
            }
        }


    }
    //Spot Constructor
    function Spot(row, col) { 
        this.row = row;
        this.column = col;
        //If the row and cols equals to the starting point, becomes true. Otherwise false.
        this.start = this.row === start_row && this.column === start_col
        //If the row and cols equals to the end point, becomes true. Otherwise false.
        this.end = this.row === end_row && this.column === end_col
        //think of names. Playing a role in the algorithm
        this.g = 0;
        this.f = 0;
        this.h = 0;

    }
 //Grid with Node
const nodeGrid = (
    <div>
        {Grid.map((row, rowIndex) =>  {
            return (
            <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => { 
                //Destructuring the start and end of the grid. To loop through each element of the grid.
                const {start, end} = col;
                return <Node key={colIndex} start={start} end={end} row={rowIndex} col={colIndex} />;
            })}
            </div>
            );
        })}
    </div>
);

    return (
        <div className="wrapper">
            <h1>Pathfind Component</h1>
            {nodeGrid}
        </div>
    )
}

export default PathFind
