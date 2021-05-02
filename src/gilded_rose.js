class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.MAX_QUALITY = 50;
    this.MIN_QUALITY = 0;
  }
  increaseQuality(item) {
    if (item.quality < this.MAX_QUALITY) {
      item.quality ++
    }
  }
  decreaseQuality(item) {
    if (item.quality > this.MIN_QUALITY) {
      item.quality --
    }
  }
  agedBrie(agedbrie){
      this.increaseQuality(agedbrie)
      if (agedbrie.sellIn < 0) {
        this.increaseQuality(agedbrie)
      }
  }
  backstagePasses(backstagePass) {
    let sellby = backstagePass.sellIn
    switch(true) {
      case (sellby < 0):
        backstagePass.quality = 0
        break;
      case (sellby <= 5):
        for(let i = 0; i < 3; i++) {
          this.increaseQuality(backstagePass)
          }
      break;
      case (sellby <= 10 ):
        for(let i = 0; i < 2; i++) {
          this.increaseQuality(backstagePass)
          }
        break;
      default:
        this.increaseQuality(backstagePass)
    }
  }
  normalItems(item) {
    this.decreaseQuality(item)
      if (item.sellIn < 0) {
        this.decreaseQuality(item)
         }
      }
  conjuredItems(item) {
    for(let i = 0; i < 2; i++) {
    this.normalItems(item)
    }
  }

  isConjured(item) {
    if (item.name.match(/^Conjured.*$/)) {
      return true
    } else {
      return false
    }
  }

  updateQuality() {
    for (var item of this.items) {
      switch(true) {
        case (item.name === 'Sulfuras, Hand of Ragnaros'):
          break;
        case (item.name === 'Aged Brie'):
          item.sellIn --;
          this.agedBrie(item);
          break;
        case (item.name === 'Backstage passes to a TAFKAL80ETC concert'):
          item.sellIn --;
          this.backstagePasses(item);
          break;
        case (this.isConjured(item)):
          item.sellIn --;
          this.conjuredItems(item);
          break;
        default:
          item.sellIn --;
          this.normalItems(item)
          break;
      }
      // if (item.name === 'Sulfuras, Hand of Ragnaros') continue;
      // item.sellIn --;
      // if (item.name === 'Aged Brie') {
      //   this.agedBrie(item);
      //   continue;
      // };
      // if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
      //   this.backstagePasses(item);
      //   continue;
      // }
      // if (item.name.match(/^Conjured.*$/)) {
      //   this.conjuredItems(item);
      //   continue;
      // };
      // this.normalItems(item);
    };
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
