describe('smartStringifier', function() {
  const smartStringifier = require('../index.js');
  describe("stringify", function() {
    it("show object inline", function() {
      let map = new Map();
      map.set("some fen", [{"best": "Nf3", "e": {"v": 0.38, "d": 34}}])
      expect(smartStringifier.stringify(map)).toContain('{"best": "Nf3", "e": {"v": 0.38, "d": 34}}');
    });
    it("shows array items on different lines", function() {
      let arr = 
      {s: [
       {a: "b"},
       {b: "c"}]};
      expect(smartStringifier.stringify(arr)).toEqual('{"s": [\n {"a": "b"},\n {"b": "c"}]}');
    })
    it("different outline for array inside array", function() {
      let arr = {s: [
        {s: [
          {n: 1}
        ]}
      ]};
      expect(smartStringifier.stringify(arr)).toEqual('{"s": [\n {"s": [\n  {"n": 1}]}]}');
    });
    it("same line for trival items in array", function() {
      let arr = [1, 2, 3];
      expect(smartStringifier.stringify(arr)).toEqual('[1,2,3]');
    });
    it("same line for open bracket of array", function() {
      let obj = ["a",[
        {m: "b"}]];
      expect(smartStringifier.stringify(obj)).toEqual('["a",[\n  {"m": "b"}]]');
    });
    it("different line for items of array after array", function() {
      let arr = [
        ["s1",[
          {"best": "Bd3"}]],
        ["s2",[
          {"best": "Nf3"}]],
        ["s3",[
          {"best": "Nc3"}]]];
      expect(smartStringifier.stringify(arr)).toEqual('[["s1",[\n   {"best": "Bd3"}]],\n ["s2",[\n   {"best": "Nf3"}]],\n ["s3",[\n   {"best": "Nc3"}]]]');
    })
  });
});
