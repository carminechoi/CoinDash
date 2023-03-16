const { formatCurrency } = require("../../src/utils/currency.util");

describe("Format numbers into currency Strings", () => {
    test("should format large numbers correctly", () => {
        expect(formatCurrency(45690000000000)).toBe("$45.7T");
        expect(formatCurrency(123400000000)).toBe("$123B");
    });

    test("should format medium numbers correctly", () => {
        expect(formatCurrency(5000000)).toBe("$5.0M");
        expect(formatCurrency(89421)).toBe("$89.4K");
    });

    test("should format small numbers correctly", () => {
        expect(formatCurrency(999.1231)).toBe("$999");
        expect(formatCurrency(84.5281512)).toBe("$84.5");
    });
});
