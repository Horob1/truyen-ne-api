<<<<<<< HEAD
module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
  
=======
export default (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
>>>>>>> 146bce480c8f213f5676774933e96f8bb524a136
