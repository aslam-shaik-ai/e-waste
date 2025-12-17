const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({collectionId, action, user}) => {
  try {
    if(!collectionId||!action||!user)
      return null
    await ActivityLog.create({
      collectionId,
      action,
      performedBy: user.id,
      role: user.role,
    });
  } catch (err) {
    console.log('Log skipped:', err.message);
  }
};

module.exports = logActivity;
