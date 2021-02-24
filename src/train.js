class Item {
  constructor(name = "item", sellIn = 0, quality = 0) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  updateQuality() {
    console.log("quality");
  }
}
class NormalItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
  updateQuality() {}
  updateSellIn() {
    console.log("Normal sell in");
  }
}

const item = new Item();
item.updateQuality();
const normal = new NormalItem();
normal.updateQuality();
normal.updateSellIn();
