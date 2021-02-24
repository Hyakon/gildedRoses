class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  updateQuality() {
    this.sellIn--;
    this.quality--;
    if (this.sellIn < 0) this.quality--;
    if (this.quality < 0) this.quality = 0;
  }
}

class SuperItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
  updateQuality() {
    this.sellIn--;
    this.quality++;
    if (this.sellIn < 0) this.quality++;
    if (this.name == "Backstage passes to a TAFKAL80ETC concert") {
      if (this.sellIn < 11) {
        this.quality = this.quality + 1;
      }
      if (this.sellIn < 5) {
        this.quality = this.quality + 1;
      }
      if (this.sellIn < 0) {
        this.quality = 0;
      }
    }
    if (this.quality >= 50) this.quality = 50;
  }
}

class LegendaryItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
  updateQuality() {}
}

class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
  updateQuality() {
    this.sellIn--;
    this.quality -= 2;
    if (this.sellIn < 0) this.quality -= 2;
    if (this.quality < 0) this.quality = 0;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    this.items.forEach((item) => {
      item.updateQuality();
    });
    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
  SuperItem,
  LegendaryItem,
  ConjuredItem,
};
