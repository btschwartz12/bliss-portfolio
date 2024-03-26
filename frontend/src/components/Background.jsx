function getRandomBgType() {
    const types = [
      { 'type': 'circle', 'num': 1 },
      { 'type': 'thick', 'num': 1 },
    ]
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }



export { getRandomBgType };