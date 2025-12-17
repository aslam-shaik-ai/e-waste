const ActivityLog = require('../models/ActivityLog');

const getCollectionLogs = async (req, res) => {
  try {
    const { id } = req.params;

    const logs = await ActivityLog.find({ collectionId: id })
      .populate('performedBy', 'name role')
      .sort({ createdAt: 1 });

    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getCollectionLogs };
