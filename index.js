class Supermarket {
    constructor() {
        this.items = new Array();
        this.transactions = new Array();
    }

    getTotal() {
        return this.transactions
            .reduce((total, current) =>
                total += current.price, 0.0);
    }

    scan(item) {
        this.calcDealsScan(item);
        this.items.push(item);

    }

    calcScanBundleOneProduct(item) {
        const numberOfItems = this.getNumberOf(item.name);
        if (numberOfItems % item.deal.number == item.deal.number - 1) {
            const price = item.deal.number * item.price - item.deal.price;

            this.transactions.push({
                name: item.name,
                dealType: item.dealType,
                price: -price
            });
        }
    }

    calcScanBuySomeGetFree(item) {
        const numberOfItems = this.getNumberOf(item.name);
        const outstanding = numberOfItems % (item.deal.buy + item.deal.free);
        if (outstanding >= item.deal.buy) {
            this.transactions.push({
                name: item.name,
                dealType: item.dealType,
                price: -item.price
            });
        }
    }

    getNumberOf(name) {
        return this.items
            .reduce((total, cur) => cur.name == name ? total + 1 : total, 0);

    }

    calcDealsScan(item) {
        this.transactions.push({ name: item.name, price: item.price });

        switch (item.dealType) {
            case "BundleOneProduct":
                this.calcScanBundleOneProduct(item); break;
            case "BuySomeGetFree":
                this.calcScanBuySomeGetFree(item); break;
        }
    }

    print() {
        console.log("Receipt")
        for (let i = 0; i < this.transactions.length; i++) {
            let item = this.transactions[i];
            console.log(`${item.name}   ${item.price} [${item.dealType || ""}]`)
        }
        console.log(`Total ${this.getTotal()}`)
    }

    unscan(item) {
        this.removeOne(item.name);
        this.transactions.push({ name: item.name, price: -item.price });
     
    }

    removeOne(name) {
        let index = -1;
        for (let i = this.items.length - 1; i >= 0; i++) {
            if (this.items[i].name == name) {
                index = i;
                break;
            }
        }

        if (index == -1) {
            throw new Error("You cannot unscan item you never scanned");
        }
        this.items.splice(index, 1);
    }
}

module.exports = Supermarket;