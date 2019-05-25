const Supermarket = require("./index.js");
describe("Supermarket scan", () => {
    var beans = { name: "beans", price: 0.65 };
    it("adds to items list", () => {
        const s = new Supermarket();
        s.scan(beans);
        expect(s.items[0].name).toBe("beans");
    });

    it('creates a transaction', () => {
        const s = new Supermarket();
        s.scan(beans);
        expect(s.transactions[0].price).toBe(0.65);
    });

    it('add up total', () => {
        const s = new Supermarket();
        s.scan(beans);
        s.scan(beans);
        expect(s.getTotal()).toBe(1.3);
    });


    it.each`
        count   |   result
        ${1}    |   ${2}
        ${2}    |   ${4}
        ${4}    |   ${6}
        ${5}    |   ${6}
        ${7}    |   ${10}
        
    `('BuySomeGetFree returns $result when $count sodas scanned', ({ count, result }) => {
        var s = new Supermarket();
        for (let i = 0; i < count; i++) {
            s.scan({
                name: "soda",
                price: 2,
                dealType: "BuySomeGetFree",
                deal: {
                    buy: 3,
                    free: 2
                }
            });
        }
        expect(s.getTotal()).toBe(result);

    });

    it.each`
    count   |   result 
    ${1}    |   ${1.25}
    ${2}    |   ${2.5}
    ${3}    |   ${3}
    ${5}    |   ${5.5}
    ${6}    |   ${6}
    ${7}    |   ${7.25}
`('BundleOneProduct returns $result when $count avos scanned', ({ count, result }) => {
        const s = new Supermarket();
        for (let i = 0; i < count; i++) {
            s.scan({
                name: "avocado",
                price: 1.25,
                dealType: "BundleOneProduct",
                deal: { number: 3, price: 3.0 }
            });
        }
        expect(s.getTotal()).toBe(result);
    });
});


describe.only("unscan", ()=>{
    it('unscan simple', ()=>{
        const beans = {
            name: "beans",
            price: 0.65
        };
        const s = new Supermarket();
        s.scan(beans);
        s.scan(beans);
        s.unscan(beans);

        expect(s.getTotal()).toBe(0.65);
        expect(s.transactions.length).toBe(3);
    });

    it('unscan simple', ()=>{
        const beans = {
            name: "beans",
            price: 0.65
        };
        const s = new Supermarket();
        s.scan(beans);
        s.scan(beans);
        s.unscan(beans);

        expect(s.getTotal()).toBe(0.65);
        expect(s.transactions.length).toBe(3);
    });

    it("cannot unscan if not scanned", ()=>{
        const s = new Supermarket();
        expect(()=>{s.unscan({name:"beans"})}).toThrow();
    })
});