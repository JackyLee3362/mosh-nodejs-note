// test("Our first test", () => {});  // 12.6

const { exceptions } = require("winston");
const lib = require("../unitTestDemo/lib");
const db = require("../unitTestDemo/db");
const mail = require("../unitTestDemo/mail");

describe("absolute", () => {
  // 12.8 将test改为it
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  // 12.10
  it("should return the greeting message", () => {
    result = lib.greet("Mosh");
    expect(result).toMatch(/Mosh/);
    expect(result).toContain("Mosh");
  });
});

describe("get Currencies", () => {
  // 12.11
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    // too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    // Proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    // Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});

describe("getProduct", () => {
  it("should return the product with the given id", () => {
    result = lib.getProduct(1);
    // expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1 }); // 只比较列出属性的值
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    // 最好使用参数化测试
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      // 使用回调函数
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Mosh");
    expect(result).toMatchObject({ username: "Mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("exercise1", () => {
  it("should throw an exception if input is not a number", () => {
    // expect(() => lib.fizzBuzz(NaN)).toThrow(); // 没法通过
    args = ["a", null, undefined, "", false, {}];
    args.forEach((arg) => {
      expect(() => {
        lib.fizzBuzz(arg);
      }).toThrow();
    });
  });
  it("should return FizzBuzz if input is 15", () => {
    const result = lib.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });
  it("should return Fizz if input is only divisible by 3", () => {
    const result = lib.fizzBuzz(3);
    expect(result).toBe("Fizz");
  });
  it("should return Buzz if input is only divisible by 5", () => {
    const result = lib.fizzBuzz(5);
    expect(result).toBe("Buzz");
  });
  it("should return Buzz if input is not divisible by 3 or 5", () => {
    const result = lib.fizzBuzz(1);
    expect(result).toBe(1);
  });
});

// 12.16

describe("applyDiscount", () => {
  it("should appply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };
    const order = { coustomerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

// 12.17

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = function (customerId) {
      return { email: "a" };
    };

    // 交互模块
    let mailSent = false;
    mail.send = function (email, message) {
      mailSent = true;
    };

    lib.notifyCustomer({ customerId: 1 });

    expect(mailSent).toBe(true);
  });
});

// 12.18
describe("notifyCustomer", () => {
  it("should send an email to the customer using jest fn", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    // 如果有参数可以这样写
    // expect(mail.send).toHaveBeenCalledWith("a", "...");
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
