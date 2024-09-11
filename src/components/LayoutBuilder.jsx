/* eslint-disable react/prop-types */
import { useState } from 'react';
import Split from 'react-split';

// Generate a random color
const randomColor = () => {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Partition = ({ id, color, onRemove, onSplit }) => {
  return (
    <div
      className="relative flex justify-center items-center h-full border border-black"
      style={{ backgroundColor: color }}
    >
      <div className="absolute top-2 right-2 space-x-2">
        <button onClick={() => onSplit(id, 'V')} className="bg-blue-500 text-white px-2 py-1 rounded">
          V
        </button>
        <button onClick={() => onSplit(id, 'H')} className="bg-green-500 text-white px-2 py-1 rounded">
          H
        </button>
        <button onClick={() => onRemove(id)} className="bg-red-500 text-white px-2 py-1 rounded">
          -
        </button>
      </div>
    </div>
  );
};

function LayoutBuilder() {
  const [partitions, setPartitions] = useState([{ id: 1, color: randomColor(), direction: null }]);

  // Split the partition either vertically or horizontally
  const splitPartition = (id, direction) => {
    setPartitions((prev) =>
      prev.flatMap((p) =>
        p.id === id
          ? [
            { ...p, id: p.id, color: p.color, direction }, // Old partition retains color
            { id: Date.now(), color: randomColor(), direction }, // New partition gets random color
          ]
          : p
      )
    );
  };

  // Remove partition by ID
  const removePartition = (id) => {
    if (partitions.length > 1) {
      setPartitions((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center mt-12 font-bold my-4 text-purple-700">
        Recursive Partitioning Layout
      </h1>
      <div className="h-72 w-full md:w-8/12 mx-auto mt-5">
        {partitions.length > 0 && (
          <Split
            direction={partitions.length > 1 && partitions[0].direction === 'H' ? 'horizontal' : 'vertical'}
            sizes={new Array(partitions.length).fill(100 / partitions.length)} // Dynamically calculate sizes
            minSize={100} // Minimum size to prevent collapsing
            gutterSize={10} // Gutter size between partitions
            snapOffset={10} // Snap to 1/4, 1/2, and 3/4 ratios
            className="flex h-full w-full"
          >
            {partitions.map((partition) => (
              <Partition
                key={partition.id}
                id={partition.id}
                color={partition.color}
                onSplit={splitPartition}
                onRemove={removePartition}
              />
            ))}
          </Split>
        )}
      </div>
      <div className="w-48 mx-auto mt-12">
        <a href="/">
          <button className="w-48 border-transparent py-2 px-3 rounded text-white bg-red-500 hover:bg-red-600 focus:bg-red-700">
            Home
          </button>
        </a>
      </div>
    </div>
  );
}

export default LayoutBuilder;
