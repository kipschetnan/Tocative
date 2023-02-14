const userSeeds = require('./userSeed.json');
const messageSeeds = require('./messageSeed.json');
const db = require('../config/connection');
const { User, Message } = require('../models');

db.once('open', async () => {
    try {
        await Message.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeeds);

        for (let i=0; i < messageSeeds.length; i++) {
            const { _id, messageAuthor } = await Message.create(messageSeeds[i]);
            const user = await User.findOneAndUpdate(
                { username: messageAuthor },
                {
                    $addToSet: {
                        messages: _id,
                    },
                }
            );
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('db seeded');
    process.exit(0);
});