# Chapter 12

Unit Testing 单元测试

## 12.1 What is Automated Testing？ 什么是自动化测试？

Test first(TDD) or code first?

code 有 production code（生产代码） 和 test code（测试代码）

## 12.2 Benefits of Automated Testing 自动化测试的好处

## 12.3 Benefit of Automated Testing 自动化测试的好处 - 3 种测试

- Unit Test 单元测试
  - Tests a unit of an application without its **_external_ dependencies**
- Integration Test 集成测试
  - Tests the application with it **_external_ dependencies**
- End-to-end Test 端到端测试
  - Drives an application through its UI. 依靠用户界面来驱动测试（比如 selenium）

## 12.4 Test Pyramid 测试金字塔

```
       /   \
      /E2E  \
     /       \
    /---------\
   /Integration\
  /-------------\
 /  Unit         \  👈 用的最多
/-----------------\
```

TAKEWAYS

- Favour unit tests to e2e tests. 尽可能使用单元测试
- Cover unit test gaps with integration tests. 用集成测试覆盖单元测试的 gaps
- Use end-to-end tests sparingly. 尽量少的使用端到端的测试

## 12.5 Tooling 工具

Frameworks

- Jasmine
- Mocha（需要加插件，Chai,Sinon）
- Jest（Facebook 用来测试 React 的，基本可以看作 Jasmine 的翻版）

## 12.6 Writing Your First Unit Test 编写你的第一个单元测试

npm i jest --save-dev

文件 test/lib.test.js

## 12.7 Testing Numbers 测试数字

bing: jest documentation

## 12.8 Grouping Tests 测试的分组

文件 test/lib.test.js

## 12.9 Refactoring with Confidence 重构代码提高可信度

## 12.10 Testing Strings 测试字符串

- toMatch()
- toContain()

## 12.11 Testing Arrays 测试数组

https://jestjs.io/docs/expect

-expect.not.arrayContaining(array)

## 12.12 Testing Object 测试对象

- expect(result).toMatchObject({ id: 1 });
- expect(result).toHaveProperty("id", 1);

## 12.13 Testing Exceptions 测试异常

- 使用回调函数

## 12.14 Continuously Running Tests 不间断运行测试

package.json 将 test: "jest --watchAll"

## 12.15 Exercise 练习

## 12.16 Creating Simple Mock Fucntions 创建简单的模拟函数

如何对一个有外部资源依赖的函数进行单元测试

## 12.17 Interation Testing 交互测试

// mail

## Jest Mock Functions Jest 内置模拟函数

```javascript
// 12.18
const mockFunction = jest.fn();
mockFunction.mockReturnValue(1);
mockFunction.mockResolvedValue(1);
mockFunction.mockRejectedValue(new Error("..."));
const result = await mockFunction();
```

## 12.19 What to Unit Test 什么适合单元测试

## 12.20 Exercise 练习

文件 /tests/unit/models/user.test.js 需要重新做一遍！！
