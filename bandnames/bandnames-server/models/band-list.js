const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [
      new Band("Twenty One Pilots"),
      new Band("Imagine Dragons"),
      new Band("Kazzabe agrupacion"),
    ];
  }
  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increseVotes(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.votes++;
      }
      return band;
    });
  }
  changeName(id, newName) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
  }
}

module.exports = BandList;
