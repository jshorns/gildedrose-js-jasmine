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
  agedBrie(agedbrie){
      if (agedbrie.quality < 49) {
        agedbrie.quality ++
      }
      if (agedbrie.sellIn < 0 && agedbrie.quality < 49) {
        agedbrie.quality ++
      }
  }
  updateQuality() {
    for (var item of this.items) {
      if (item.name === 'Sulfuras, Hand of Ragnaros') return item
      item.sellIn = item.sellIn - 1;
      if (item.name === 'Aged Brie') {
        this.agedBrie(item)
        continue
      }
      if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0) {
            item.quality --;
        }
      } else {
        if (item.quality < 50) {
          item.quality ++;
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality ++;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality ++;
              }
            }
          }
        }
      }
      if (item.sellIn < 0) {
          if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0) {
                item.quality --;
            }
          } else {
            item.quality = 0;
          }
        } 
        }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
