export function generateinitials(name){
    // Split the name into words
    const words = name?.split(' ')

    // Initialize variables to store initials
    let firstInitial = '';
    let secondInitial = '';

    firstInitial = words[0][0].toUpperCase();

    // Get the second initial from the last word
    if(words.length > 1){
        secondInitial = words[1][0].toUpperCase();
    }

    return firstInitial+secondInitial
}