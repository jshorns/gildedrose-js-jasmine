var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {
  const items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  ]
  const gildedRose = new Shop(items)

  it("ages items appropriately", function() {
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("+5 Dexterity Vest");
    expect(items[0].sellIn).toEqual(9);
    expect(items[0].quality).toEqual(19);
    expect(items[1].name).toEqual("Aged Brie");
    expect(items[1].sellIn).toEqual(1);
    expect(items[1].quality).toEqual(1);
    expect(items[2].name).toEqual("Elixir of the Mongoose");
    expect(items[2].sellIn).toEqual(4);
    expect(items[2].quality).toEqual(6);
    expect(items[3].name).toEqual("Sulfuras, Hand of Ragnaros");
    expect(items[3].sellIn).toEqual(0);
    expect(items[3].quality).toEqual(80);
    expect(items[4].name).toEqual("Sulfuras, Hand of Ragnaros");
    expect(items[4].sellIn).toEqual(-1);
    expect(items[4].quality).toEqual(80);
    expect(items[5].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
    expect(items[5].sellIn).toEqual(14);
    expect(items[5].quality).toEqual(21);
    expect(items[6].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
    expect(items[6].sellIn).toEqual(9);
    expect(items[6].quality).toEqual(50);
    expect(items[7].name).toEqual("Backstage passes to a TAFKAL80ETC concert");
    expect(items[7].sellIn).toEqual(4);
    expect(items[7].quality).toEqual(50);
    
  });



});
