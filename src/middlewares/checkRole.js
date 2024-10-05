export const checkRole = async (req, res, next) => {
    try {
      const { role } = req.session;
      if (role === "admin" || role === "premium") {
        next();
      } else {
        res.status(401).json({"msg": "Este endpoint es para usuarios admin / premium"});
      }
    } catch (error) {
      next(error);
    }
  };
  