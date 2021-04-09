var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {
  let items = [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 47),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    new Item("Backstage passes to a TAFKAL80ETC concert", 5, 46),
  ]
// some tests here - that sellIn ALWAYS goes down by 1, that quality NEVER goes above 50 and that quality is NEVER negative. start with the most straightforward cases.
  describe("updateQuality", function(){
    describe("for normal items", function(){
      let normalItems = [
        new Item("Chonky", 10, 20),
        new Item("Beans", 5, 0),
        new Item("Peanuts", 0, 4),
      ]
      it("ages items appropriately before sell-by date passed", function(){
        let gildedRose = new Shop([normalItems[0], normalItems[1]])
        let updatedItems = gildedRose.updateQuality()
        expect(updatedItems[0].name).toEqual("Chonky")
        expect(updatedItems[0].sellIn).toEqual(9)
        expect(updatedItems[0].quality).toEqual(19)
        expect(updatedItems[1].name).toEqual("Beans")
        expect(updatedItems[1].sellIn).toEqual(4)
        expect(updatedItems[1].quality).toEqual(0)

      })
      it("ages items appropriately after sell-by date passed", function(){
        let gildedRose = new Shop([normalItems[2]])
        let updatedItems = gildedRose.updateQuality()
        expect(updatedItems[0].name).toEqual("Peanuts")
        expect(updatedItems[0].sellIn).toEqual(-1)
        expect(updatedItems[0].quality).toEqual(2)

      })
    })
    describe("for brie", function(){
      let bries = [
        new Item("Aged Brie", 5, 4),
        new Item("Aged Brie", -1, 3)
      ]
      it("increases quality of the brie", function(){
        let gildedRose = new Shop(bries)
        let newBrie = gildedRose.updateQuality()
        expect(newBrie[0].sellIn).toEqual(4)
        expect(newBrie[0].quality).toEqual(5)
        expect(newBrie[1].sellIn).toEqual(-2)
        expect(newBrie[1].quality).toEqual(5)
      })
    })
  })
  describe("for Sulfuras, Hand of Ragnaros", function(){
    let sulfurases = [
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
    ]
    it("increases quality of the brie", function(){
      let gildedRose = new Shop(sulfurases)
      let newBrie = gildedRose.updateQuality()
      expect(sulfurases[0].sellIn).toEqual(0)
      expect(sulfurases[0].quality).toEqual(80)
      expect(sulfurases[1].sellIn).toEqual(-1)
      expect(sulfurases[1].quality).toEqual(80)
    })
  })
  describe("for backstage passes", function(){
    let backstagePasses = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 46),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 43),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 46),
    ]
    it("increases quality of the brie", function(){
      let gildedRose = new Shop(backstagePasses)
      let newBP = gildedRose.updateQuality()
      expect(newBP[0].sellIn).toEqual(14)
      expect(newBP[0].quality).toEqual(21)
      expect(newBP[1].sellIn).toEqual(9)
      expect(newBP[1].quality).toEqual(48)
      expect(newBP[2].sellIn).toEqual(4)
      expect(newBP[2].quality).toEqual(46)
      expect(newBP[3].sellIn).toEqual(9)
      expect(newBP[3].quality).toEqual(50)
      expect(newBP[4].sellIn).toEqual(-1)
      expect(newBP[4].quality).toEqual(0)
    })
  })
})

