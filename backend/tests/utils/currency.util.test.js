const {
    abbreviateCurrency,
    formatCurrency,
} = require("../../src/utils/currency.util");

describe("Abbreviate numbers into currency Strings", () => {
    test("should format large numbers correctly", () => {
        expect(abbreviateCurrency(45690000000000)).toBe("$45.7T");
        expect(abbreviateCurrency(123400000000)).toBe("$123B");
    });

    test("should format medium numbers correctly", () => {
        expect(abbreviateCurrency(5000000)).toBe("$5.0M");
        expect(abbreviateCurrency(123400000)).toBe("$123M");
        expect(abbreviateCurrency(500000000)).toBe("$500M");
        expect(abbreviateCurrency(89421)).toBe("$89.4K");
        expect(abbreviateCurrency(123400)).toBe("$123K");
    });

    test("should format small numbers correctly", () => {
        expect(abbreviateCurrency(999.1231)).toBe("$999");
        expect(abbreviateCurrency(123.4)).toBe("$123");
        expect(abbreviateCurrency(84.5281512)).toBe("$84.5");
    });
});

describe("Format numbers into currency Strings", () => {
    test("should format with decimals", () => {
        expect(formatCurrency(58758784784)).toBe("$58,758,784,784.00");
        expect(formatCurrency(74251902617.1817)).toBe("$74,251,902,617.18");
    });

    test("should format without decimals", () => {
        expect(formatCurrency(58758784784, true)).toBe("$58,758,784,784");
        expect(formatCurrency(74251902617.1817, true)).toBe("$74,251,902,617");
    });
});
