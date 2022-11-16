import { Component, OnInit } from '@angular/core';
import { Product } from '../../_models/product.model';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css'],
})
export class ListStockComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  data: any = [{
    "id": 1,
    "buying_price": 966,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Broccoli - Fresh",
    "quantity": 340,
    "re_order_level": 69,
    "selling_price": 456
  }, {
    "id": 2,
    "buying_price": 474,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Bread Base - Toscano",
    "quantity": 867,
    "re_order_level": 79,
    "selling_price": 447
  }, {
    "id": 3,
    "buying_price": 120,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Ham - Smoked, Bone - In",
    "quantity": 305,
    "re_order_level": 69,
    "selling_price": 119
  }, {
    "id": 4,
    "buying_price": 149,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Foam Espresso Cup Plain White",
    "quantity": 920,
    "re_order_level": 43,
    "selling_price": 266
  }, {
    "id": 5,
    "buying_price": 747,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Beer - Pilsner Urquell",
    "quantity": 674,
    "re_order_level": 58,
    "selling_price": 242
  }, {
    "id": 6,
    "buying_price": 179,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Chocolate - Milk Coating",
    "quantity": 280,
    "re_order_level": 37,
    "selling_price": 525
  }, {
    "id": 7,
    "buying_price": 852,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Pimento - Canned",
    "quantity": 135,
    "re_order_level": 14,
    "selling_price": 434
  }, {
    "id": 8,
    "buying_price": 971,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Tortillas - Flour, 10",
    "quantity": 824,
    "re_order_level": 19,
    "selling_price": 713
  }, {
    "id": 9,
    "buying_price": 563,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Wine - Zinfandel California 2002",
    "quantity": 479,
    "re_order_level": 68,
    "selling_price": 238
  }, {
    "id": 10,
    "buying_price": 387,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Pork - Caul Fat",
    "quantity": 747,
    "re_order_level": 70,
    "selling_price": 931
  }, {
    "id": 11,
    "buying_price": 764,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Tea - Apple Green Tea",
    "quantity": 471,
    "re_order_level": 18,
    "selling_price": 447
  }, {
    "id": 12,
    "buying_price": 113,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Ice Cream - Strawberry",
    "quantity": 362,
    "re_order_level": 23,
    "selling_price": 958
  }, {
    "id": 13,
    "buying_price": 469,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Gingerale - Schweppes, 355 Ml",
    "quantity": 147,
    "re_order_level": 41,
    "selling_price": 179
  }, {
    "id": 14,
    "buying_price": 205,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Eggplant - Asian",
    "quantity": 956,
    "re_order_level": 34,
    "selling_price": 699
  }, {
    "id": 15,
    "buying_price": 939,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "French Kiss Vanilla",
    "quantity": 359,
    "re_order_level": 60,
    "selling_price": 312
  }, {
    "id": 16,
    "buying_price": 511,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Juice - Mango",
    "quantity": 447,
    "re_order_level": 42,
    "selling_price": 245
  }, {
    "id": 17,
    "buying_price": 284,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Waffle Stix",
    "quantity": 174,
    "re_order_level": 29,
    "selling_price": 428
  }, {
    "id": 18,
    "buying_price": 699,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Bread - Olive",
    "quantity": 802,
    "re_order_level": 22,
    "selling_price": 796
  }, {
    "id": 19,
    "buying_price": 310,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Plate Foam Laminated 9in Blk",
    "quantity": 878,
    "re_order_level": 21,
    "selling_price": 222
  }, {
    "id": 20,
    "buying_price": 418,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Cream - 10%",
    "quantity": 471,
    "re_order_level": 25,
    "selling_price": 958
  }, {
    "id": 21,
    "buying_price": 309,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Scallops - U - 10",
    "quantity": 713,
    "re_order_level": 42,
    "selling_price": 852
  }, {
    "id": 22,
    "buying_price": 244,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Dc Hikiage Hira Huba",
    "quantity": 238,
    "re_order_level": 29,
    "selling_price": 847
  }, {
    "id": 23,
    "buying_price": 746,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Corn Kernels - Frozen",
    "quantity": 118,
    "re_order_level": 11,
    "selling_price": 760
  }, {
    "id": 24,
    "buying_price": 510,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Pork - Sausage, Medium",
    "quantity": 815,
    "re_order_level": 54,
    "selling_price": 674
  }, {
    "id": 25,
    "buying_price": 422,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Goat - Whole Cut",
    "quantity": 335,
    "re_order_level": 21,
    "selling_price": 184
  }, {
    "id": 26,
    "buying_price": 131,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Milk - 2% 250 Ml",
    "quantity": 726,
    "re_order_level": 63,
    "selling_price": 221
  }, {
    "id": 27,
    "buying_price": 323,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Flour - Buckwheat, Dark",
    "quantity": 802,
    "re_order_level": 42,
    "selling_price": 814
  }, {
    "id": 28,
    "buying_price": 948,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Straw - Regular",
    "quantity": 620,
    "re_order_level": 55,
    "selling_price": 203
  }, {
    "id": 29,
    "buying_price": 327,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Red Cod Fillets - 225g",
    "quantity": 853,
    "re_order_level": 70,
    "selling_price": 962
  }, {
    "id": 30,
    "buying_price": 695,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Croissant, Raw - Mini",
    "quantity": 236,
    "re_order_level": 67,
    "selling_price": 221
  }, {
    "id": 31,
    "buying_price": 114,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Squid - Breaded",
    "quantity": 429,
    "re_order_level": 78,
    "selling_price": 330
  }, {
    "id": 32,
    "buying_price": 160,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Mushroom - Crimini",
    "quantity": 456,
    "re_order_level": 41,
    "selling_price": 388
  }, {
    "id": 33,
    "buying_price": 321,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Longos - Grilled Salmon With Bbq",
    "quantity": 197,
    "re_order_level": 69,
    "selling_price": 476
  }, {
    "id": 34,
    "buying_price": 735,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Wine - Merlot Vina Carmen",
    "quantity": 225,
    "re_order_level": 62,
    "selling_price": 124
  }, {
    "id": 35,
    "buying_price": 229,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Silicone Parch. 16.3x24.3",
    "quantity": 144,
    "re_order_level": 48,
    "selling_price": 296
  }, {
    "id": 36,
    "buying_price": 890,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Spinach - Baby",
    "quantity": 149,
    "re_order_level": 12,
    "selling_price": 972
  }, {
    "id": 37,
    "buying_price": 556,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Bread - Corn Muffaleta Onion",
    "quantity": 451,
    "re_order_level": 19,
    "selling_price": 234
  }, {
    "id": 38,
    "buying_price": 391,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Wine - Red, Gamay Noir",
    "quantity": 867,
    "re_order_level": 35,
    "selling_price": 754
  }, {
    "id": 39,
    "buying_price": 109,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Wine - Red Oakridge Merlot",
    "quantity": 365,
    "re_order_level": 74,
    "selling_price": 491
  }, {
    "id": 40,
    "buying_price": 575,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Glass - Wine, Plastic, Clear 5 Oz",
    "quantity": 482,
    "re_order_level": 15,
    "selling_price": 898
  }, {
    "id": 41,
    "buying_price": 138,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Ice Cream - Fudge Bars",
    "quantity": 416,
    "re_order_level": 31,
    "selling_price": 126
  }, {
    "id": 42,
    "buying_price": 568,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": true,
    "name": "Pate - Cognac",
    "quantity": 410,
    "re_order_level": 13,
    "selling_price": 104
  }, {
    "id": 43,
    "buying_price": 592,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Pork - Backfat",
    "quantity": 717,
    "re_order_level": 16,
    "selling_price": 333
  }, {
    "id": 44,
    "buying_price": 252,
    "in_stock": true,
    "status": "INSTOCK",
    "is_active": false,
    "name": "Puree - Mango",
    "quantity": 701,
    "re_order_level": 25,
    "selling_price": 124
  }, {
    "id": 45,
    "buying_price": 220,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Sugar - Sweet N Low, Individual",
    "quantity": 109,
    "re_order_level": 45,
    "selling_price": 110
  }, {
    "id": 46,
    "buying_price": 340,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Pepper - Green, Chili",
    "quantity": 913,
    "re_order_level": 30,
    "selling_price": 514
  }, {
    "id": 47,
    "buying_price": 915,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Mcgillicuddy Vanilla Schnap",
    "quantity": 410,
    "re_order_level": 24,
    "selling_price": 702
  }, {
    "id": 48,
    "buying_price": 644,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": true,
    "name": "Bread - Calabrese Baguette",
    "quantity": 988,
    "re_order_level": 70,
    "selling_price": 454
  }, {
    "id": 49,
    "buying_price": 101,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Pasta - Cannelloni, Sheets, Fresh",
    "quantity": 858,
    "re_order_level": 67,
    "selling_price": 528
  }, {
    "id": 50,
    "buying_price": 847,
    "in_stock": false,
    "status": "OUTOFSTOCK",
    "is_active": false,
    "name": "Lumpfish Black",
    "quantity": 790,
    "re_order_level": 51,
    "selling_price": 730
  }]
  
}
