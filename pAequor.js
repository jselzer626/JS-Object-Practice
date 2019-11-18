// Returns a random DNA base
const dnaBases = ['A', 'T', 'C', 'G']
const returnRandBase = () => {
  return dnaBases[Math.floor(Math.random() * 4)]
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//factory function to create a new instance of pAequor
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      var randomSpot = Math.floor(Math.random() * 15);
      var newBases = dnaBases.filter(item => item !== dna[randomSpot])
      dna[randomSpot] = newBases[Math.floor(Math.random() * 3)];
      return dna;
    },
    compareDNA(obj) {
      let returnPercentage = 0;
      this.dna.map((item, pos) => {
        item === obj.dna[pos] ? returnPercentage += 1/this.dna.length : '';
      });
      // logs percentage of dna that two selected specimens have in common
      console.log(`ex1 and ex2 have ${returnPercentage.toFixed(2)}% of dna in common`);
    },
    // returns true is dna is greater than 60% C or G bases
    willLikelySurvive() {
      let returnPercentage = 0;
      this.dna.forEach(item => item === 'C' || item === 'G' ? returnPercentage += 1/this.dna.length : '');
      return returnPercentage >= .6 ? true : false;
    }
  }
}

// calculates 30 instances of pAequor that return true for willLikelySurvive()
let survivalSpecimens = [];
for (let i = 0; i < 30; i++) {
  let pAequor = pAequorFactory(i, mockUpStrand())
  while (pAequor.willLikelySurvive() === false) {
    pAequor = pAequorFactory(i, mockUpStrand())
  }
  survivalSpecimens.push(pAequor);
}
