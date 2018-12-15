import chai from 'chai';

chai.should();

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      chai.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
