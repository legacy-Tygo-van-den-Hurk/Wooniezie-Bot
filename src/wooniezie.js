const https = require('https');

const fetchHouses = () => {
    return new Promise((resolve, reject) => {
        const url = ('https://www.wooniezie.nl/portal/object/frontend/getallobjects/format/json');
        const request = https.request(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data = data + chunk.toString();
            });

            response.on('end', () => {
                const body = JSON.parse(data);
                resolve(body.result);
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        request.end();
    })
}

const filterHouse = (house) => {
    if (house.city.name !== 'Eindhoven') return false;
    if (house.rentBuy !== 'Huur') return false;
    if (house.actionLabel.localizedLabel === 'Seniorenwoning') return false;
    if (house.actionLabel.localizedLabel === 'Flexwonen') return false;
    if (house.dwellingType.categorie !== 'woning') return false;
    if (house.model.modelCategorie.code !== 'random') return false;

    return true;
}

const filterHouses = (houses) => {
    return houses.filter(filterHouse);
}

module.exports = { fetchHouses, filterHouses };
