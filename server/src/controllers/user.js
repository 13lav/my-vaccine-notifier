import Notifier from '../models/notifier.js';
import User from '../models/user.js';

export const addToNotifier = (user) => {
    if (user.centers)
        user.centers.forEach((center_id) => {
            var newNotifier = { _id: center_id, users: [user._id] };
            try {
                Notifier.findByIdAndUpdate(center_id, { $push: { users: user._id } }, function (err, doc) {
                    if (!doc) {
                        try {
                            Notifier.create({ ...newNotifier }, function (err, doc) {
                                if (err) {
                                    console.error(err)
                                }
                            });

                        } catch (e) {
                            console.error(e);
                        }
                    }
                });
            } catch (e) {
                console.error(e);
            }
        })
}

export const addUser = (req, res) => {
    try {
        User.create({ ...req.body.data }, function (err, doc) {
            if (err) {
                console.error(err)
                res.status(400).end();
            }
            addToNotifier(doc)
            res.status(201).json({ data: doc });
        });

    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}
