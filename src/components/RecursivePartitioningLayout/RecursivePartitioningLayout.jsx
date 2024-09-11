/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import  { useState, useRef } from 'react';

const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const Partition = ({ onSplit, onRemove, depth }) => {
    const [color] = useState(getRandomColor());
    const [splitDirection, setSplitDirection] = useState(null);
    const [ratio, setRatio] = useState(50);
    const containerRef = useRef(null);

    const handleSplit = (direction) => {
        setSplitDirection(direction);
        onSplit(direction);
    };

    const handleResize = (e) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const { left, top, width, height } = container.getBoundingClientRect();
        const isVertical = splitDirection === 'vertical';
        const mousePos = isVertical ? e.clientX - left : e.clientY - top;
        const containerSize = isVertical ? width : height;
        let newRatio = (mousePos / containerSize) * 100;

        // Snap to 25%, 50%, 75%
        if (newRatio > 20 && newRatio < 30) newRatio = 25;
        else if (newRatio > 45 && newRatio < 55) newRatio = 50;
        else if (newRatio > 70 && newRatio < 80) newRatio = 75;

        setRatio(newRatio);
    };

    if (splitDirection) {
        const flexDirection = splitDirection === 'vertical' ? 'flex-row' : 'flex-col';
        return (
            <div className={`flex ${flexDirection} w-full h-full relative`} ref={containerRef}>
                <div style={{ flex: `0 0 ${ratio}%` }}>
                    <Partition onSplit={onSplit} onRemove={onRemove} depth={depth + 1} />
                </div>
                <div
                    className="absolute z-10 cursor-col-resize"
                    style={{
                        [splitDirection === 'vertical' ? 'left' : 'top']: `${ratio}%`,
                        [splitDirection === 'vertical' ? 'width' : 'height']: '4px',
                        [splitDirection === 'vertical' ? 'height' : 'width']: '100%',
                    }}
                    onMouseDown={() => {
                        const handleMouseMove = (e) => handleResize(e);
                        const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                        };
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                    }}
                />
                <div style={{ flex: `0 0 ${100 - ratio}%` }}>
                    <Partition onSplit={onSplit} onRemove={onRemove} depth={depth + 1} />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative" style={{ backgroundColor: color }}>
            <div className="space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleSplit('vertical')}>V</button>
                <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleSplit('horizontal')}>H</button>
            </div>
            {depth > 0 && (
                <button
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded"
                    onClick={onRemove}
                >
                    -
                </button>
            )}
        </div>
    );
};

const RecursivePartitioningLayout = () => {
    const [partitions, setPartitions] = useState([{ id: 0 }]);
    const [nextId, setNextId] = useState(1);

    const handleSplit = (id, direction) => {
        setPartitions(prevPartitions => {
            const index = prevPartitions.findIndex(p => p.id === id);
            if (index === -1) return prevPartitions;

            const newPartitions = [...prevPartitions];
            newPartitions.splice(index, 1, { id: nextId }, { id: nextId + 1 });
            setNextId(nextId + 2);
            return newPartitions;
        });
    };

    const handleRemove = (id) => {
        setPartitions(prevPartitions => prevPartitions.filter(p => p.id !== id));
    };

    return (
        <div className=" p-4">
            <div className="w-full h-full border-2 border-gray-300">
                {partitions.map(partition => (
                    <Partition
                        key={partition.id}
                        onSplit={(direction) => handleSplit(partition.id, direction)}
                        onRemove={() => handleRemove(partition.id)}
                        depth={0}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecursivePartitioningLayout;