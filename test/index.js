const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const assert = chai.assert;

const DeepCloner = require("../src/index");

describe("deepClone", () => {
  it("是一个函数", () => {
    assert.isFunction(DeepCloner);
  });
  it("能够复制基本类型", () => {
    const n = 123;
    const n2 = DeepCloner(n);
    assert(n === n2);
    const s = "123";
    const s2 = DeepCloner(s);
    assert(s === s2);
    const b = true;
    const b2 = DeepCloner(b);
    assert(b === b2);
    const u = undefined;
    const u2 = DeepCloner(u);
    assert(u === u2);
    const empty = null;
    const empty2 = DeepCloner(empty);
    assert(empty === empty2);
    const symb = Symbol();
    const symb2 = DeepCloner(symb);
    assert(symb === symb2);
  });
  describe("对象", () => {
    it("能够复制普通对象", () => {
      const obj = {
        name: "lsj",
        child: {
          name: "xl"
        }
      };
      const obj2 = DeepCloner(obj);
      assert(obj !== obj2);
      assert(obj.name === obj2.name);
      assert(obj.child !== obj2.child);
      assert(obj.child.name === obj2.child.name);
    });
    it("能够复制数组对象", () => {
      const a = [
        [11, 12],
        [21, 22],
        [31, 32]
      ];
      const a2 = DeepCloner(a);
      assert(a !== a2);
      assert(a[0] !== a2[0]);
      assert(a[1] !== a2[1]);
      assert(a[2] !== a2[2]);
      assert.deepEqual(a, a2);
    });
    it("能够复制函数", () => {
      const f = function (x, y) {
        return x + y;
      };
      f.xxx = {
        yyy: {
          zzz: 1
        }
      };
      const f2 = DeepCloner(f);
      assert(f !== f2);
      assert(f.xxx.yyy.zzz === f2.xxx.yyy.zzz);
      assert(f.xxx.yyy !== f2.xxx.yyy);
      assert(f.xxx !== f2.xxx);
      assert(f(1, 2) === f2(1, 2));
    });
    it("环也能复制", () => {
      const obj = {
        name: "lsj",
      };
      obj.self = obj
      const obj2 = DeepCloner(obj);
      assert(obj !== obj2);
      assert(obj.name === obj2.name);
      assert(obj.self !== obj2.self);
    })
  });
});