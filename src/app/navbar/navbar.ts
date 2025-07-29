import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
}
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  showCartPopup: boolean = false;
  cart_list: Product[] = [];
  interval: any;

  ngOnInit() {
    this.updateCart(); // initial load

    // Refresh cart every second
    this.interval = setInterval(() => {
      this.updateCart();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
  updateCart() {
    const cart_data = localStorage.getItem('cart_list') ?? '[]';
    this.cart_list = JSON.parse(cart_data).map((item: any) => ({
      ...item,
      quantity: item.quantity ?? 1,
    }));
  }

  openCart() {
    this.showCartPopup = true;
  }

  closeCart() {
    this.showCartPopup = false;
  }

  getTotal(): number {
    return this.cart_list.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );
  }
  getTotalRiel(): number {
    const totalUSD = this.getTotal();
    const exchangeRate = 4000; // Example exchange rate
    return totalUSD * exchangeRate;
  }

  increaseQty(index: number): void {
    this.cart_list[index].quantity++;
    this.saveCart();
  }

  decreaseQty(index: number): void {
    if (this.cart_list[index].quantity > 1) {
      this.cart_list[index].quantity--;
      this.saveCart();
    }
  }

  removeItem(index: number): void {
    this.cart_list.splice(index, 1);
    this.saveCart();
  }

  checkoutCart(): void {
    alert('✅ Checkout complete!');
    this.cart_list = [];
    localStorage.removeItem('cart_list');
    this.closeCart();
  }

  saveCart(): void {
    localStorage.setItem('cart_list', JSON.stringify(this.cart_list));
  }
}
