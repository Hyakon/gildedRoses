var {
  Shop,
  Item,
  SuperItem,
  LegendaryItem,
  ConjuredItem,
} = require("../src/gilded_rose.js");
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Qualite d'un item ne peut pas etre negative", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 0));
    listItems.push(new Item("Mana Cake", 3, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 0 },
      { sellIn: 2, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité et de 1 sellIn d'item normaux perime", function () {
    listItems.push(new Item("+5 Dexterity Vest", 0, 20));
    listItems.push(new Item("Mana Cake", 0, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 18 },
      { sellIn: -1, quality: 4 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new SuperItem("Aged Brie", 20, 30));
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 20, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Qualite max 50", function () {
    listItems.push(new SuperItem("Aged Brie", -1, 49));
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 2, 49)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -2, quality: 50 },
      { sellIn: 1, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Sulfura reste intacte", function () {
    listItems.push(new LegendaryItem("Sulfuras", Infinity, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ sellIn: Infinity, quality: 80 }];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Augmenter la qualité de 2 pour Aged Brie si perime et 0 Backstage si perime", function () {
    listItems.push(new SuperItem("Aged Brie", 0, 30));
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 0, 100)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -1, quality: 32 },
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Augmenter la qualité de 3 pour Backstage passes si il reste 5 jours", function () {
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 5, 30)
    );
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 3, 30)
    );
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 6, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 4, quality: 33 },
      { sellIn: 2, quality: 33 },
      { sellIn: 5, quality: 32 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("qualité 0 pour Backstage passes si perime", function () {
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 1, 40)
    );
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 0, 30)
    );
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", -1, 50)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 0, quality: 43 },
      { sellIn: -1, quality: 0 },
      { sellIn: -2, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Augmenter la qualité de 2 pour Backstage passes si il reste 10 jours", function () {
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 10, 30)
    );
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 11, 30)
    );
    listItems.push(
      new SuperItem("Backstage passes to a TAFKAL80ETC concert", 12, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 32 },
      { sellIn: 10, quality: 31 },
      { sellIn: 11, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Baisser de 4 la qualité et de 1 sellIn d'item conjured perime", function () {
    listItems.push(new ConjuredItem("Conjured Dark Blade", 1, 30));
    listItems.push(new ConjuredItem("Conjured Dark Blade", 0, 20));
    listItems.push(new ConjuredItem("Conjured Dark Blade", -1, 40));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 0, quality: 28 },
      { sellIn: -1, quality: 16 },
      { sellIn: -2, quality: 36 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
  it("Baisser de 2 la qualité et de 1 sellIn d'item conjured", function () {
    listItems.push(new ConjuredItem("Conjured Dark Blade", 10, 30));
    listItems.push(new ConjuredItem("Conjured Dark Blade", 11, 20));
    listItems.push(new ConjuredItem("Conjured Dark Blade", 12, 40));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 28 },
      { sellIn: 10, quality: 18 },
      { sellIn: 11, quality: 38 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});
