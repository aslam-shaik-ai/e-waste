const Collection = require('../models/Collection');

const logsAccessControl = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    const { id: collectionId } = req.params;

    // Admin → full access
    if (role === 'admin') return next();

    // Technician → only assigned collection logs
    if (role === 'technician') {
      const collection = await Collection.findOne({
        _id: collectionId,
        assignedTo: id
      });

      if (!collection) {
        return res.status(403).json({
          message: 'Access denied to logs'
        });
      }

      return next();
    }

    return res.status(403).json({ message: 'Access denied' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = logsAccessControl;
