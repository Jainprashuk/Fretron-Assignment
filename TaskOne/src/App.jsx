import React, { useState, useEffect } from 'react';
import FlightPath from './FlighPath';

const App = () => {
  const initialFlightPaths = {
    'Flight 1': [[1, 1], [2, 2], [3, 3]],
    'Flight 2': [[1, 1], [2, 4], [3, 2]],
    'Flight 3': [[1, 1], [4, 2], [3, 4]]
  };

  const [flightPaths, setFlightPaths] = useState(initialFlightPaths);

  function orientation(p, q, r) {
    const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    return val === 0 ? 0 : (val > 0 ? 1 : 2);
  }

  function doIntersect(p1, q1, p2, q2) {
    const o1 = orientation(p1, q1, p2);
    const o2 = orientation(p1, q1, q2);
    const o3 = orientation(p2, q2, p1);
    const o4 = orientation(p2, q2, q1);

    return (o1 !== o2 && o3 !== o4);
  }

  function addPointToAvoidIntersection(paths) {
    const updatedPaths = JSON.parse(JSON.stringify(paths)); // Deep copy of paths

    const keys = Object.keys(updatedPaths);
    const maxIterations = 10; // Limit to avoid infinite loops

    let iterations = 0;
    while (iterations < maxIterations) {
      let changed = false;

      for (let i = 0; i < keys.length; i++) {
        for (let j = i + 1; j < keys.length; j++) {
          const path1 = updatedPaths[keys[i]];
          const path2 = updatedPaths[keys[j]];

          for (let k = 0; k < path1.length - 1; k++) {
            for (let l = 0; l < path2.length - 1; l++) {
              if (doIntersect(path1[k], path1[k + 1], path2[l], path2[l + 1])) {
                const newPoint = [
                  (path1[k][0] + path1[k + 1][0]) / 2,
                  (path1[k][1] + path1[k + 1][1]) / 2
                ];

                // Add new point to both paths and avoid intersection
                path1.splice(k + 1, 0, newPoint);
                path2.splice(l + 1, 0, newPoint);
                changed = true;
                console.log(`Added point ${newPoint} to avoid intersection.`);

                // Check if adding the point resolved the intersection
                if (!doIntersect(path1[k], path1[k + 1], path2[l], path2[l + 1])) {
                  break;
                }
              }
            }
            if (changed) break;
          }
          if (changed) break;
        }
        if (changed) break;
      }

      if (!changed) break; // Exit loop if no changes were made

      iterations++;
    }

    if (iterations === maxIterations) {
      console.warn('Maximum iterations reached. Some intersections may still exist.');
    }

    return updatedPaths;
  }

  // useEffect(() => {
    // const updatedPaths = addPointToAvoidIntersection(initialFlightPaths);
    // setFlightPaths(updatedPaths);
  // }, []);

  return (
    <div>
      <h1>Flight Paths Visualization</h1>
      <FlightPath flightPaths={flightPaths} />
    </div>
  );
};

export default App;
