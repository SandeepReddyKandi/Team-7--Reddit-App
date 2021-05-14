const handle_request = async (req, callback) => {
  try {
    Community.updateMany(
      { _id: req.community_id },
      { $pop: { members: req.user_id } },
      (err, docs) => {
        if (!err) {
          callback(null, {
            msg: "Community member removed successfully",
            success: true,
          });
        }
      }
    );
  } catch (error) {
    //res.status(400).json({ msg: error.message });
    return callback(null, {
      msg: error.message,
      success: false,
    });
  }
};
