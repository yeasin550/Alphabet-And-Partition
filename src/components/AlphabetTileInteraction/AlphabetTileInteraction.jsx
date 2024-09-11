import { useState } from 'react';

const AlphabetTileInteraction = () => {
    const [outputString, setOutputString] = useState('');

    const handleTileClick = (letter) => {
        setOutputString(prevString => {
            const newString = prevString + letter;
            return processConsecutiveLetters(newString);
        });
    };

    const processConsecutiveLetters = (str) => {
        let result = '';
        let count = 1;
        for (let i = 0; i < str.length; i++) {
            if (str[i] === str[i + 1]) {
                count++;
            } else {
                if (count >= 3) {
                    result += '_'.repeat(count);
                } else {
                    result += str[i].repeat(count);
                }
                count = 1;
            }
        }
        return result;
    };

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div>
            <h1 className="text-3xl text-center mt-12 font-bold my-4 text-purple-700">
                Recursive Partitioning Layout
            </h1>
            <div className="p-4 md:w-8/12 mx-auto mt-5 border-[1px] border-red-500 mb-12">
                <div className="grid grid-cols-3 md:grid-cols-7 gap-2 mb-4">
                    {alphabet.map((letter) => (
                        <button
                            key={letter}
                            className="bg-purple-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleTileClick(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
                <div className="mt-7">
                    <h2
                        className="text-xl mb-2 text-red-600 break-words"  // Added break-words to allow wrapping
                        id="outputString"
                    >
                        <span className="font-bold text-xl text-black">Output: </span> {outputString}
                    </h2>
                </div>
            </div>

            <div className="w-48 mx-auto">
                <a href="/" className="">
                    <button className="w-48 mx-auto border-transparent py-2 px-3 rounded text-white bg-primary bg-red-500 hover:bg-red-600 focus:bg-red-700 disabled:bg-red-100 disabled:text-gray-300">
                        Home
                    </button>
                </a>
            </div>
        </div>

    );
};

export default AlphabetTileInteraction;