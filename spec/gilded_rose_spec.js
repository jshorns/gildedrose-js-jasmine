var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {
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
    describe("for Confjured items", function(){
      let conjuredItems = [
        new Item("Conjured Chonky", 10, 20),
        new Item("Conjured Beans", 5, 0),
        new Item("Conjured Peanuts", 0, 4),
      ]
      it("ages items appropriately before sell-by date passed", function(){
        let gildedRose = new Shop([conjuredItems[0], conjuredItems[1]])
        let updatedConjuredItems = gildedRose.updateQuality()
        expect(updatedConjuredItems[0].name).toEqual("Conjured Chonky")
        expect(updatedConjuredItems[0].sellIn).toEqual(9)
        expect(updatedConjuredItems[0].quality).toEqual(18)
        expect(updatedConjuredItems[1].name).toEqual("Conjured Beans")
        expect(updatedConjuredItems[1].sellIn).toEqual(4)
        expect(updatedConjuredItems[1].quality).toEqual(0)

      })
      it("ages items appropriately after sell-by date passed", function(){
        let gildedRose = new Shop([conjuredItems[2]])
        let updatedConjuredItems = gildedRose.updateQuality()
        expect(updatedConjuredItems[0].name).toEqual("Conjured Peanuts")
        expect(updatedConjuredItems[0].sellIn).toEqual(-1)
        expect(updatedConjuredItems[0].quality).toEqual(0)

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
    it("does not change anything", function(){
      let gildedRose = new Shop(sulfurases)
      let newSulfurases = gildedRose.updateQuality()
      expect(newSulfurases[0].sellIn).toEqual(0)
      expect(newSulfurases[0].quality).toEqual(80)
      expect(newSulfurases[1].sellIn).toEqual(-1)
      expect(newSulfurases[1].quality).toEqual(80)
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
    it("increases quality of the passes appropriately, or returns 0 if date is passed", function(){
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
  describe("for full suite of items", function(){
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
      new Item("Conjured Elixir of the Mongoose", 5, 7),
      new Item("Conjured +5 Dexterity Vest", 10, 20)
    ]
    it("increases quality appropriately", function(){
      let gildedRose = new Shop(items)
      let updatedItems = gildedRose.updateQuality()

      expect(updatedItems[0].name).toEqual("+5 Dexterity Vest")
      expect(updatedItems[0].sellIn).toEqual(9)
      expect(updatedItems[0].quality).toEqual(19)

      expect(updatedItems[1].name).toEqual("Aged Brie")
      expect(updatedItems[1].sellIn).toEqual(1)
      expect(updatedItems[1].quality).toEqual(1)

      expect(updatedItems[2].name).toEqual("Elixir of the Mongoose")
      expect(updatedItems[2].sellIn).toEqual(4)
      expect(updatedItems[2].quality).toEqual(6)

      expect(updatedItems[3].name).toEqual("Sulfuras, Hand of Ragnaros")
      expect(updatedItems[3].sellIn).toEqual(0)
      expect(updatedItems[3].quality).toEqual(80)

      expect(updatedItems[4].name).toEqual("Sulfuras, Hand of Ragnaros")
      expect(updatedItems[4].sellIn).toEqual(-1)
      expect(updatedItems[4].quality).toEqual(80)

      expect(updatedItems[5].name).toEqual("Backstage passes to a TAFKAL80ETC concert")
      expect(updatedItems[5].sellIn).toEqual(14)
      expect(updatedItems[5].quality).toEqual(21)

      expect(updatedItems[6].name).toEqual("Backstage passes to a TAFKAL80ETC concert")
      expect(updatedItems[6].sellIn).toEqual(9)
      expect(updatedItems[6].quality).toEqual(50)

      expect(updatedItems[7].name).toEqual("Backstage passes to a TAFKAL80ETC concert")
      expect(updatedItems[7].sellIn).toEqual(9)
      expect(updatedItems[7].quality).toEqual(49)

      expect(updatedItems[8].name).toEqual("Backstage passes to a TAFKAL80ETC concert")
      expect(updatedItems[8].sellIn).toEqual(4)
      expect(updatedItems[8].quality).toEqual(50)

      expect(updatedItems[9].name).toEqual("Backstage passes to a TAFKAL80ETC concert")
      expect(updatedItems[9].sellIn).toEqual(4)
      expect(updatedItems[9].quality).toEqual(49)

      expect(updatedItems[10].name).toEqual("Conjured Elixir of the Mongoose")
      expect(updatedItems[10].sellIn).toEqual(4)
      expect(updatedItems[10].quality).toEqual(5)

      expect(updatedItems[11].name).toEqual("Conjured +5 Dexterity Vest")
      expect(updatedItems[11].sellIn).toEqual(9)
      expect(updatedItems[11].quality).toEqual(18)
    })
  })
})

