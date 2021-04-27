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
  }
  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality ++
    }
  }
  decreaseQuality(item) {
    if (item.quality > 0) {
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
    if (backstagePass.sellIn < 0) {
      backstagePass.quality = 0
      return
    }
    this.increaseQuality(backstagePass)
    if (backstagePass.sellIn < 10) {
      this.increaseQuality(backstagePass)
    }
    if (backstagePass.sellIn < 5 ) {
      this.increaseQuality(backstagePass)
    }
  }
  updateQuality() {
    for (var item of this.items) {
      if (item.name === 'Sulfuras, Hand of Ragnaros') continue
      item.sellIn = item.sellIn - 1;
      if (item.name === 'Aged Brie') {
        this.agedBrie(item)
        continue
      }
      if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.backstagePasses(item)
        continue
      }
      this.decreaseQuality(item)
      if (item.sellIn < 0) {
        this.decreaseQuality(item)
         }
      }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
