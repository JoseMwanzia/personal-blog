function splitMessage(message, maxLength) {
    if (message.length === 0 || maxLength < 1) return [];

    const words = message.split(' ');
    const result = [];
    let currentPart = '';
    let partNumber = 1;

    for (let word of words) {
        // If a single word is too long, return an empty array
        if (word.length > maxLength) return [];
        
        if (currentPart.length + word.length + 1 <= maxLength) {
            // Add word to the current part
            currentPart += (currentPart.length > 0 ? ' ' : '') + word;
        } else {
            // Add current part to the result with the suffix
            result.push(`${currentPart} (${partNumber}/t)`);
            currentPart = word;
            partNumber++;
        }
    }

    // Add the last part
    if (currentPart) {
        result.push(`${currentPart} (${partNumber}/t)`);
    }

    // Update the suffix to include the total number of parts
    const totalParts = result.length;
    return result.map(part => part.replace('/t', totalParts));
}

// Example usage:
const message1 = "The quick brown fox jumps";
const maxLength1 = 4;
console.log(splitMessage(message1, maxLength1));

const message2 = "Hello World";
const maxLength2 = 5;
console.log(splitMessage(message2, maxLength2));
