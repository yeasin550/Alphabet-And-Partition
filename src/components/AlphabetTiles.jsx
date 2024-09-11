import { useState } from 'react';

function AlphabetTiles() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [outputString, setOutputString] = useState('');

    const handleTileClick = (letter) => {
        let newString = outputString + letter;
        newString = newString.replace(/(.)\1{2,}/g, (match) => '_'.repeat(match.length));
        setOutputString(newString);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <div className="grid grid-cols-6 gap-4">
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        className="bg-blue-500 text-white p-4 rounded-md font-bold text-xl"
                        onClick={() => handleTileClick(letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>
            <div id="outputString" className="text-2xl">
                Output: {outputString}
            </div>
        </div>
    );
}

export default AlphabetTiles;
