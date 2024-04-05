const schedule = require('node-schedule');
const { fetchHouses, filterHouses } = require('./wooniezie');
const { notifyHouse } = require('./notify');
const { hasNotified, markNotified } = require('./storage');

const housesJob = async () => {
    console.log('Syncing houses...');
    const houses = filterHouses(await fetchHouses());

    for (const house of houses) {
        try {
            const isNotified = await hasNotified(house.id);

            if (!isNotified) {
                console.log(`New house found: ${house.street} ${house.houseNumber}`)
                await notifyHouse(house);
                await markNotified(house);
            }
        }
        catch (error) {
            console.error(error)
        }
    }
    console.log('Synced houses');
}

const job = schedule.scheduleJob("* * * * *", housesJob);
