export const getRandomUsername = () => {
    // If the username has already been set in localStorage, use that 
    if (localStorage.getItem('username') !== null) { return localStorage.getItem('username') }
  
    const adverbs = ['Whimsically', 'Wackily', 'Hilariously', 'Zestily', 'Quirkily'];
    const adjectives = ['Zany', 'Boisterous', 'Eccentric', 'Ludicrous', 'Bizarre', 'Buff'];
    const paintersLastNames = ['Da Vinci', 'Van Gogh', 'Picasso', 'Rembrandt', 'Monet', 'Michelangelo'];
    
    const randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomLastName = paintersLastNames[Math.floor(Math.random() * paintersLastNames.length)];
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
  
    return `${randomAdverb}_${randomAdjective}_${randomLastName}_${randomNumber}`;
  }